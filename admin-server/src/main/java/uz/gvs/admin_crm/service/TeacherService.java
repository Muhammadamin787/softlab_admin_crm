package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Teacher;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.entity.enums.Gender;
import uz.gvs.admin_crm.entity.enums.RoleName;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.PageableDto;
import uz.gvs.admin_crm.payload.TeacherDto;
import uz.gvs.admin_crm.payload.UserDto;
import uz.gvs.admin_crm.repository.RoleRepository;
import uz.gvs.admin_crm.repository.TeacherRepository;
import uz.gvs.admin_crm.repository.UserRepository;

import java.util.HashSet;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TeacherService {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    UserService userservice;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepository;
    @Autowired
    TeacherRepository teacherRepository;

    public ApiResponse saveTeacher(TeacherDto teacherDto) {
        try {
            if (!(teacherDto.getUserDto().getFullName().replaceAll(" ", "").length() > 1))
                return apiResponseService.notEnoughErrorResponse();
            if (userservice.checkPhoneNumber(teacherDto.getUserDto().getPhoneNumber())) {
                if (userRepository.existsByFullNameIgnoreCase(teacherDto.getUserDto().getFullName()))
                    return apiResponseService.existResponse();
                User user = userservice.makeUser(teacherDto.getUserDto(), RoleName.TEACHER);
                Teacher teacher = new Teacher();
                teacher.setUser(user);
                teacherRepository.save(teacher);
                return apiResponseService.saveResponse();
            }
            return apiResponseService.existResponse();
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }


    public ApiResponse getTeacherList(int page, int size) {
        Sort sort;
        Page<Teacher> all = teacherRepository.findAll(PageRequest.of(page, size));
        return apiResponseService.getResponse(
                new PageableDto(
                        all.getTotalPages(),
                        all.getTotalElements(),
                        all.getNumber(),
                        all.getSize(),
                        all.get().map(this::makeTeacherDto).collect(Collectors.toList())
                )
        );
    }

    public TeacherDto makeTeacherDto(Teacher teacher) {
        return new TeacherDto(
                teacher.getId(),
                new UserDto(
                        teacher.getUser().getId(),
                        teacher.getUser().getFullName(),
                        teacher.getUser().getPhoneNumber(),
                        teacher.getUser().getDescription(),
                        teacher.getUser().getRegion(),
                        teacher.getUser().getGender().toString(),
                        teacher.getUser().getBirthDate() != null ? teacher.getUser().getBirthDate().toString() : "",
                        teacher.getUser().getRoles()
                )
        );
    }


    public ApiResponse editTeacher(UUID id, TeacherDto teacherDto) {
       try{
           Optional<Teacher> optional = teacherRepository.findById(teacherDto.getId());
           if (optional.isEmpty()){
               return apiResponseService.notFoundResponse();
           }
           Teacher teacher = optional.get();
           User user = userservice.editUser(teacherDto.getUserDto(),teacher.getUser(),RoleName.TEACHER);
           teacher.setUser(user);
           teacherRepository.save(teacher);
           return apiResponseService.updatedResponse();
       }catch (Exception e){
           return apiResponseService.tryErrorResponse();
       }
    }

    public ApiResponse deleteTeacher(UUID id) {

        return null;
    }
}
/////

