package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.entity.enums.Gender;
import uz.gvs.admin_crm.entity.enums.RoleName;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.PageableDto;
import uz.gvs.admin_crm.payload.StudentDto;
import uz.gvs.admin_crm.payload.UserDto;
import uz.gvs.admin_crm.repository.RegionRepository;
import uz.gvs.admin_crm.repository.StudentRepository;
import uz.gvs.admin_crm.repository.UserRepository;

import java.text.SimpleDateFormat;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    UserService userService;
    @Autowired
    RegionRepository regionRepository;

    public ApiResponse saveStudent(StudentDto studentDto) {
        try {
            if (userRepository.existsByPhoneNumber(studentDto.getPhoneNumber()))
                return apiResponseService.existResponse();
            Student student = new Student();
            User user = userService.makeUser(new UserDto(
                    studentDto.getFullName(),
                    studentDto.getPhoneNumber(),
                    studentDto.getDescription(),
                    studentDto.getRegionId(),
                    studentDto.getGender(),
                    studentDto.getBirthDate()), RoleName.STUDENT);
            if (user == null)
                return apiResponseService.tryErrorResponse();
            student.setUser(user);
            studentRepository.save(student);
            return apiResponseService.saveResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse editStudent(UUID id, StudentDto studentDto) {
        try {
            Optional<Student> byId = studentRepository.findById(id);
            SimpleDateFormat formatter1 = new SimpleDateFormat("dd/MM/yyyy");
            if (byId.isPresent()) {
                Student student = byId.get();
                User user = student.getUser();
                boolean b = userRepository.existsByPhoneNumberAndIdNot(studentDto.getPhoneNumber(), user.getId());
                if (b) {
                    return apiResponseService.existResponse();
                }
                user.setPhoneNumber(studentDto.getPhoneNumber());
                user.setFullName(studentDto.getFullName());
                user.setDescription(studentDto.getDescription());
                user.setBirthDate(user.getBirthDate() != null ? formatter1.parse(studentDto.getBirthDate()) : null);
                user.setGender(Gender.valueOf(studentDto.getGender()));
                user.setRegion(studentDto.getRegionId() != null && studentDto.getRegionId() > 0 ? regionRepository.findById(studentDto.getRegionId()).get() : null);
                student.setUser(userRepository.save(user));
                student.setBalans(studentDto.getBalans());
                studentRepository.save(student);
                return apiResponseService.saveResponse();
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }


    public ApiResponse getStudents(int page, int size) {
        try {
            Page<Student> all = studentRepository.findAll(PageRequest.of(page, size));
            return apiResponseService.getResponse(
                    new PageableDto(
                            all.getTotalPages(),
                            all.getTotalElements(),
                            all.getNumber(),
                            all.getSize(),
                            all.get().map(this::makeStudentDto).collect(Collectors.toList())
                    ));
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getStudent(UUID id) {
        try {
            Optional<Student> byId = studentRepository.findById(id);
            if (byId.isPresent()) {
                return apiResponseService.getResponse(makeStudentDto(byId.get()));
            } else {
                return apiResponseService.notFoundResponse();
            }
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public StudentDto makeStudentDto(Student student) {
        return new StudentDto(
                student.getId(),
                student.getUser().getId(),
                student.getUser().getFullName(),
                student.getUser().getPhoneNumber(),
                student.getUser().getDescription(),
                student.getUser().getRegion(),
                student.getUser().getRegion() != null ? student.getUser().getRegion().getId() : null,
                student.getUser().getGender().toString(),
                student.getUser().getBirthDate() != null ? student.getUser().getBirthDate().toString() : "",
                student.getUser().getRoles(),
                student.getBalans(),
                student.getStudentGroup()
        );
    }
}
