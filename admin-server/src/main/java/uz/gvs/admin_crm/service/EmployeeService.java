package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Employee;
import uz.gvs.admin_crm.entity.Teacher;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.entity.enums.RoleName;
import uz.gvs.admin_crm.payload.*;
import uz.gvs.admin_crm.repository.EmployeeRepository;
import uz.gvs.admin_crm.repository.UserRepository;

import java.util.Optional;
import java.util.UUID;
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


    public ApiResponse saveEmployee(EmployeeDto employeeDto) {
        try {
            if (!(employeeDto.getUserDto().getFullName().replaceAll(" ", "").length() > 1))
                return apiResponseService.notEnoughErrorResponse();
            if (userService.checkPhoneNumber(employeeDto.getUserDto().getPhoneNumber())) {
                User user = userService.makeUser(employeeDto.getUserDto(), employeeDto.getRoleName());
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

    public ApiResponse editEmployee(UUID id, EmployeeDto employeeDto) {
        try {
            Optional<Employee> optional = employeeRepository.findById(employeeDto.getId());
            if (optional.isEmpty()) {
                return apiResponseService.notFoundResponse();
            }
            Employee employee = optional.get();
            User user = userService.editUser(employeeDto.getUserDto(), employee.getUser(), employeeDto.getRoleName());
            employee.setUser(user);
            employeeRepository.save(employee);
            return apiResponseService.updatedResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getEmployeeList(int page, int size) {
        Page<Employee> all = employeeRepository.findAll(PageRequest.of(page, size));
        return apiResponseService.getResponse(
                new PageableDto(
                        all.getTotalPages(),
                        all.getTotalElements(),
                        all.getNumber(),
                        all.getSize(),
                        all.get().map(this::makeEmployeeDto).collect(Collectors.toList())
                )
        );
    }

    public EmployeeDto makeEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                new UserDto(
                        employee.getUser().getId(),
                        employee.getUser().getFullName(),
                        employee.getUser().getPhoneNumber(),
                        employee.getUser().getDescription(),
                        employee.getUser().getRegion(),
                        employee.getUser().getGender().toString(),
                        employee.getUser().getBirthDate() != null ? employee.getUser().getBirthDate().toString() : "",
                        employee.getUser().getRoles()
                )
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
