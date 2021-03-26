package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.*;
import uz.gvs.admin_crm.entity.enums.Gender;
import uz.gvs.admin_crm.entity.enums.RoleName;
import uz.gvs.admin_crm.entity.enums.UserStatusEnum;
import uz.gvs.admin_crm.payload.*;
import uz.gvs.admin_crm.repository.EmployeeRepository;
import uz.gvs.admin_crm.repository.RegionRepository;
import uz.gvs.admin_crm.repository.UserRepository;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    UserService userService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RegionRepository regionRepository;


    public ApiResponse saveEmployee(EmployeeDto employeeDto) {
        try {
            if (!(employeeDto.getFullName().replaceAll(" ", "").length() > 1))
                return apiResponseService.notEnoughErrorResponse();
            if (userService.checkPhoneNumber(employeeDto.getPhoneNumber())) {
                User user = userService.makeUser(new UserDto(
                        employeeDto.getFullName(),
                        employeeDto.getPhoneNumber(),
                        employeeDto.getDescription(),
                        employeeDto.getRegionId(),
                        employeeDto.getGender(),
                        employeeDto.getBirthDate()),
                        RoleName.valueOf(employeeDto.getRoleName()));
                Employee employee = new Employee();
                employee.setUser(user);
                employeeRepository.save(employee);
                return apiResponseService.saveResponse();
            }
            return apiResponseService.existResponse();
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }
//
    public ApiResponse editEmployee(UUID id, EmployeeDto employeeDto) {
        try {
            Optional<Employee> byId = employeeRepository.findById(id);
            SimpleDateFormat formatter1 = new SimpleDateFormat("dd-MM-yyyy");
            if (byId.isPresent()) {
                Employee employee = byId.get();
                User user = employee.getUser();
                boolean b = userRepository.existsByPhoneNumberAndIdNot(employeeDto.getPhoneNumber(), user.getId());
                if (b) {
                    return apiResponseService.existResponse();
                }
                user.setPhoneNumber(employeeDto.getPhoneNumber());
                user.setFullName(employeeDto.getFullName());
                user.setDescription(employeeDto.getDescription());
                user.setBirthDate(user.getBirthDate() != null ? formatter1.parse(employeeDto.getBirthDate()) : null);
                user.setGender(Gender.valueOf(employeeDto.getGender()));
                user.setRegion(employeeDto.getRegionId() != null && employeeDto.getRegionId() > 0 ? regionRepository.findById(employeeDto.getRegionId()).get() : null);
                employee.setUser(userRepository.save(user));
                employeeRepository.save(employee);
                return apiResponseService.saveResponse();
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getEmployeeList(int page, int size) {
        try {
            List<Object> objects = employeeRepository.getAllEmployees(size, page);
            List<EmployeeDto> employeeDtos = new ArrayList<>();
            for (Object obj : objects) {
                Object[] employee = (Object[]) obj;
                UUID id = UUID.fromString(employee[0].toString());
                String fullName = employee[1].toString();
                String phoneNumber = employee[2].toString();
                String roleName = employee[3].toString();
                EmployeeDto employeeDto = new EmployeeDto(id,fullName, phoneNumber, roleName);
                employeeDtos.add(employeeDto);
            }
            return apiResponseService.getResponse(employeeDtos);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public EmployeeDto makeEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getUser().getId(),
                employee.getUser().getFullName(),
                employee.getUser().getPhoneNumber(),
                employee.getUser().getDescription(),
                employee.getUser().getRegion(),
                employee.getUser().getRegion() != null ? employee.getUser().getRegion().getId() : null,
                employee.getUser().getGender().toString(),
                employee.getUser().getBirthDate() != null ? employee.getUser().getBirthDate().toString() : "",
                employee.getUser().getRoles().toString()
        );
    }

    public ApiResponse getEmployee(UUID id) {
        try {
            Optional<Employee> optionalEmployee = employeeRepository.findById(id);
            if (optionalEmployee.isPresent()) {
                return apiResponseService.getResponse(makeEmployeeDto(optionalEmployee.get()));
            } else {
                return apiResponseService.notFoundResponse();
            }
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse deleteEmployee(UUID id) {
        try {
            Optional<Employee> optionalEmployee = employeeRepository.findById(id);
            if (optionalEmployee.isPresent()) {
                Employee employee = optionalEmployee.get();
                employeeRepository.deleteById(employee.getId());
                userRepository.deleteById(employee.getUser().getId());
                return apiResponseService.deleteResponse();
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }
}
