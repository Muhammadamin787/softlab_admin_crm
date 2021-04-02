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
import uz.gvs.admin_crm.entity.Weekday;
import uz.gvs.admin_crm.entity.enums.Gender;
import uz.gvs.admin_crm.entity.enums.RoleName;
import uz.gvs.admin_crm.entity.enums.UserStatusEnum;
import uz.gvs.admin_crm.payload.*;
import uz.gvs.admin_crm.payload.searchTeacher.ResTeacherSearch;
import uz.gvs.admin_crm.repository.GroupRepository;
import uz.gvs.admin_crm.repository.RoleRepository;
import uz.gvs.admin_crm.repository.TeacherRepository;
import uz.gvs.admin_crm.repository.UserRepository;

import javax.persistence.criteria.CriteriaBuilder;
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

    public ApiResponse getTeacherList(int page, int size, String type) {
        try {
            List<Object> teachers = teacherRepository.findTeacherPageable(page, size, type);
            Integer totalElements = teacherRepository.findTeacherPageableCount(type);
            List<TeacherDto> teacherDtoList = new ArrayList<>();
            for (Object obj : teachers) {
                Object[] teacher = (Object[]) obj;
                UUID teacherId = UUID.fromString(teacher[0].toString());
                String name = teacher[1].toString();
                String phoneNumber = teacher[2].toString();
                TeacherDto teacherDto = new TeacherDto(teacherId, name, phoneNumber);
                teacherDtoList.add(teacherDto);
            }
            return apiResponseService.getResponse(new PageableDto(Long.valueOf(totalElements), page, size, teacherDtoList));
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }

    }

    public TeacherDto makeTeacherDto(Teacher teacher) {
        return new TeacherDto(
                teacher.getId(),
                teacher.getUser().getFullName(),
                teacher.getUser().getPhoneNumber()

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
            List<Object> objects = teacherRepository.findTeacher(id);
            for (Object obj : objects) {
                Object[] teacher = (Object[]) obj;
                UUID teacherId = UUID.fromString(teacher[0].toString());
                String fullName = teacher[1].toString();
                String phoneNumber = teacher[2].toString();
                String birthDate = teacher[3].toString();
                String gender = teacher[4].toString();
                Double balance = Double.parseDouble(teacher[5].toString());
                Boolean isPersent = Boolean.parseBoolean(teacher[6] != null ? teacher[6].toString() : null);
                Double salary = Double.parseDouble(teacher[7].toString());
                String description = teacher[8].toString();
                Integer regionId = Integer.parseInt(teacher[10].toString());
                String regionName = teacher[9].toString();
                List<Group> groups = groupRepository.findAllByTeacherId(teacherId);
                List<GroupDto> groupDtos = new ArrayList<>();
                for (Group group : groups) {
                    groupDtos.add(makeGroupForTeacher(group));
                }
                TeacherDto teacherDto = new TeacherDto(teacherId, fullName, phoneNumber, birthDate, gender, regionId, regionName, description, groupDtos, balance, isPersent, salary);
                return apiResponseService.getResponse(teacherDto);
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public GroupDto makeGroupForTeacher(Group group) {
        try {
            Set<String> stringSet = new HashSet<>();
            for (Weekday weekday : group.getWeekdays()) {
                stringSet.add(weekday.getWeekdayName().name);
            }
            return new GroupDto(
                    group.getId(),
                    group.getName(),
                    group.getStartTime(),
                    group.getFinishTime(),
                    group.getCourse().getName(),
                    stringSet
            );
        } catch (Exception e) {
            return null;
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

    public ApiResponse searchAllTeacher(String name) {
        try {
                List<Object> objects = teacherRepository.searchAllTeacher(name.toLowerCase());
            List<ResTeacherSearch> resTeacherSearchesDto = new ArrayList<>();
            for (Object obj : objects) {
                Object[] teacher = (Object[]) obj;
                UUID id = UUID.fromString(teacher[0].toString());
                String name1 = teacher[1].toString();
                String phoneNumber = teacher[2].toString();
                ResTeacherSearch resTeacherSearch = new ResTeacherSearch(id, name1, phoneNumber);
                resTeacherSearchesDto.add(resTeacherSearch);
            }
            return apiResponseService.getResponse(resTeacherSearchesDto);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }
}


