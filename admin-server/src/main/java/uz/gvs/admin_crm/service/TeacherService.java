package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Group;
import uz.gvs.admin_crm.entity.Teacher;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.entity.enums.Gender;
import uz.gvs.admin_crm.entity.enums.RoleName;
import uz.gvs.admin_crm.entity.enums.UserStatusEnum;
import uz.gvs.admin_crm.payload.*;
import uz.gvs.admin_crm.repository.GroupRepository;
import uz.gvs.admin_crm.repository.RoleRepository;
import uz.gvs.admin_crm.repository.TeacherRepository;
import uz.gvs.admin_crm.repository.UserRepository;

import java.util.*;
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

    @Autowired
    GroupRepository groupRepository;

    public ApiResponse saveTeacher(TeacherDto teacherDto) {
        try {
            if (!(teacherDto.getUserDto().getFullName().replaceAll(" ", "").length() > 0))
                return apiResponseService.notEnoughErrorResponse();
            if (userservice.checkPhoneNumber(teacherDto.getUserDto().getPhoneNumber())) {
                User user = userservice.makeUser(teacherDto.getUserDto(), RoleName.TEACHER);
                if (user != null) {
                    Teacher teacher = new Teacher();
                    teacher.setUser(user);
                    teacherRepository.save(teacher);
                    return apiResponseService.saveResponse();
                }
                return apiResponseService.existResponse();
            }
            return apiResponseService.existResponse();
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getTeacherListForSelect() {
//        List<Object[]> teacherForSelect = teacherRepository.getTeacherForSelect();
//        List<ResSelect> resSelects = new ArrayList<>();
//        if (teacherForSelect.size() > 0)
//            for (Object o : teacherForSelect) {
//                ResSelect resSelect = new ResSelect();
//                Object[] count = (Object[]) o;
//                resSelect.setName(count[0].toString());
//                resSelect.setUuid(UUID.fromString(count[0].toString()));
//                resSelects.add(resSelect);
//            }
        List<Teacher> all = teacherRepository.findAll();
        List<ResSelect> resSelects = new ArrayList<>();
        for (Teacher teacher : all) {
            ResSelect resSelect = new ResSelect();
            resSelect.setName(teacher.getUser().getFullName());
            resSelect.setUuid(teacher.getId());
            resSelects.add(resSelect);
        }
        return apiResponseService.getResponse(resSelects);
    }

    public ApiResponse getTeacherList(int page, int size,String type) {
        try{
            Sort sort;
            Page<Teacher> all = teacherRepository.findAllByUser_status(UserStatusEnum.valueOf(type), PageRequest.of(page, size));
            return apiResponseService.getResponse(
                    new PageableDto(
                            all.getTotalPages(),
                            all.getTotalElements(),
                            all.getNumber(),
                            all.getSize(),
                            all.get().map(this::makeTeacherDto).collect(Collectors.toList())
                    )
            );
        }catch (Exception e){
            return apiResponseService.tryErrorResponse();
        }

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
                ),
                teacher.getBalance(),
                teacher.getIsPercent(),
                teacher.getSalary()

        );
    }

    public ApiResponse editTeacher(UUID id, TeacherDto teacherDto) {
        try {
            Optional<Teacher> optional = teacherRepository.findById(teacherDto.getId());
            if (optional.isEmpty()) {
                return apiResponseService.notFoundResponse();
            }
            Teacher teacher = optional.get();
            User user = userservice.editUser(teacherDto.getUserDto(), teacher.getUser(), RoleName.TEACHER);
            teacher.setUser(user);
            teacherRepository.save(teacher);
            return apiResponseService.updatedResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse deleteTeacher(UUID id) {
        try {
            Optional<Teacher> optionalTeacher = teacherRepository.findById(id);
            if (optionalTeacher.isPresent()) {
                boolean teacher_id = groupRepository.existsByTeacher_Id(id);
                if (!teacher_id) {
                    Teacher teacher = optionalTeacher.get();
                    teacherRepository.deleteById(teacher.getId());
                    userRepository.deleteById(teacher.getUser().getId());
                    return apiResponseService.deleteResponse();
                }
                return apiResponseService.errorResponse();
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }

    }

    public ApiResponse getGroupsTeacher(UUID id) {
        try {
            List<Group> allByTeacher_id = groupRepository.findAllByTeacher_id(id);
            return apiResponseService.getResponse(allByTeacher_id);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getTeacher(UUID id) {
        try {
            Optional<Teacher> optionalTeacher = teacherRepository.findById(id);
            if (optionalTeacher.isPresent()) {
                return apiResponseService.getResponse(makeTeacherDto(optionalTeacher.get()));
            } else {
                return apiResponseService.notFoundResponse();
            }
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse searchTeacher(String name) {
        try {
            List<Object> objects = teacherRepository.searchTeacher(name.toLowerCase());
            List<ResSelect> resSelects = new ArrayList<>();
            for (Object obj : objects) {
                Object[] teacher = (Object[]) obj;
                UUID id = UUID.fromString(teacher[0].toString());
                String name1 = teacher[1].toString();
                ResSelect resSelectDto = new ResSelect(name1, id);
                resSelects.add(resSelectDto);
            }
            return apiResponseService.getResponse(resSelects);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse ToArchiveStatus(UUID teacherId, String status) {
        try {
            Optional<Teacher> teacherOptional = teacherRepository.findById(teacherId);
            if (teacherOptional.isPresent()) {
                Teacher teacher = teacherOptional.get();
                teacher.getUser().setEnabled(!teacher.getUser().isEnabled());
                teacher.getUser().setStatus(UserStatusEnum.valueOf(status));
                teacherRepository.save(teacher);
                return apiResponseService.updatedResponse();
            } else {
                return apiResponseService.existResponse();
            }
        } catch (Exception exception) {
            return apiResponseService.errorResponse();
        }
    }
}


