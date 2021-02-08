package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Teacher;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.TeacherDto;
import uz.gvs.admin_crm.repository.TeacherRepository;
import uz.gvs.admin_crm.repository.UserRepository;

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
                User user = userservice.makeUser(teacherDto.getUserDto());
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


    public ApiResponse editTeacher(TeacherDto teacherDto) {
        
        
        return null;
    }
}
