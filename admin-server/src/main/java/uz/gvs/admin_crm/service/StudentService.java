package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.*;
import uz.gvs.admin_crm.entity.enums.Gender;
import uz.gvs.admin_crm.entity.enums.RoleName;
import uz.gvs.admin_crm.payload.*;
import uz.gvs.admin_crm.repository.*;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
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
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    StudentPaymentRepository studentPaymentRepository;
    @Autowired
    PayTypeRepository payTypeRepository;

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


    public ApiResponse getGroupStudents(Integer id) {
        try {
            List<Student> allByStudentGroup_group_id = studentRepository.findAllByStudentGroup_Group_id(id);
            return apiResponseService.getResponse(allByStudentGroup_group_id);
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

    public ApiResponse deleteStudent(UUID id) {
        try {
            Optional<Student> byId = studentRepository.findById(id);
            if (byId.isPresent()) {
                Student student = byId.get();
                if (student.getStudentGroup() != null && student.getStudentGroup().size() > 0) {
                    return apiResponseService.errorResponse();
                } else {
                    studentRepository.deleteById(id);
                    userRepository.deleteById(student.getId());
                    return apiResponseService.deleteResponse();
                }
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse saveStudentPayment(UUID id, StudentPaymentDto studentPaymentDto) {
        try {
            Optional<Student> byId = studentRepository.findById(id);
            if (byId.isPresent()) {
                SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                StudentPayment studentPayment = new StudentPayment();
                studentPayment.setStudent(studentPaymentDto.getStudentId() != null ? studentRepository.findById(studentPaymentDto.getStudentId()).orElseThrow(() -> new ResourceNotFoundException("get StudentId")) : null);
                studentPayment.setGroup(studentPaymentDto.getGroupId() != null ? groupRepository.findById(studentPaymentDto.getGroupId()).orElseThrow(() -> new ResourceNotFoundException("get Group")) : null);
                studentPayment.setPayType(studentPaymentDto.getPayTypeId() != null ? payTypeRepository.findById(studentPaymentDto.getPayTypeId()).orElseThrow(() -> new ResourceNotFoundException("get PayType")) : null);
                studentPayment.setSum(studentPaymentDto.getSum());
                studentPayment.setPayDate(studentPaymentDto.getPayDate() != null ? formatter1.parse(studentPaymentDto.getPayDate()) : null);
                studentPayment.setComment(studentPaymentDto.getComment());
                studentPaymentRepository.save(studentPayment);

                Student student = byId.get();
                student.setBalans(student.getBalans() + studentPaymentDto.getSum());
                studentRepository.save(student);
                return apiResponseService.saveResponse();
            }
            return apiResponseService.notFoundResponse();

        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }

    }

    public ApiResponse editStudentPayment(UUID id, StudentPaymentDto studentPaymentDto) {
        try {
            Optional<StudentPayment> byId = studentPaymentRepository.findById(id);
            if (byId.isPresent()) {
                SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                StudentPayment studentPayment = byId.get();
                studentPayment.setStudent(studentPaymentDto.getStudentId() != null ? studentRepository.findById(studentPaymentDto.getStudentId()).orElseThrow(() -> new ResourceNotFoundException("get StudentId")) : null);
                studentPayment.setGroup(studentPaymentDto.getGroupId() != null ? groupRepository.findById(studentPaymentDto.getGroupId()).orElseThrow(() -> new ResourceNotFoundException("get Group")) : null);
                studentPayment.setPayType(studentPaymentDto.getPayTypeId() != null ? payTypeRepository.findById(studentPaymentDto.getPayTypeId()).orElseThrow(() -> new ResourceNotFoundException("get PayType")) : null);
                studentPayment.setSum(studentPaymentDto.getSum());
                studentPayment.setPayDate(studentPaymentDto.getPayDate() != null ? formatter1.parse(studentPaymentDto.getPayDate()) : null);
                studentPayment.setComment(studentPaymentDto.getComment());
                studentPaymentRepository.save(studentPayment);
                ////Balans uchun
                Optional<Student> byId1 = studentRepository.findById(studentPaymentDto.getStudentId());
                if (byId1.isPresent()) {
                    Student student = byId1.get();
                    student.setBalans(student.getBalans() + studentPaymentDto.getSum());
                    studentRepository.save(student);
                }
                return apiResponseService.updatedResponse();
            }
            return apiResponseService.notFoundResponse();

        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public StudentPaymentDto makeStudentPaymentDto(StudentPayment studentPayment) {
        return new StudentPaymentDto(
                studentPayment.getId(),
                studentPayment.getPayType(),
                studentPayment.getStudent(),
                studentPayment.getSum(),
                studentPayment.getPayDate() != null ? studentPayment.getPayDate().toString() : null,
                studentPayment.getComment()
        );
    }

    public ApiResponse getStudentPaymentList(int page, int size) {

        try {
            Sort sort;
            Page<StudentPayment> all = studentPaymentRepository.findAll(PageRequest.of(page, size));
            return apiResponseService.getResponse(
                    new PageableDto(
                            all.getTotalPages(),
                            all.getTotalElements(),
                            all.getNumber(),
                            all.getSize(),
                            all.get().map(this::makeStudentPaymentDto).collect(Collectors.toList())
                    )
            );
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getStudentPaymentListStudent(UUID id, int page, int size) {
        try {
            Sort sort;
            Page<StudentPayment> all = studentPaymentRepository.findAllByStudent_id(id, PageRequest.of(page, size));
            return apiResponseService.getResponse(
                    new PageableDto(
                            all.getTotalPages(),
                            all.getTotalElements(),
                            all.getNumber(),
                            all.getSize(),
                            all.get().map(this::makeStudentPaymentDto).collect(Collectors.toList())
                    )
            );
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getStudentPayment(UUID id) {
        try {
            Optional<StudentPayment> optional = studentPaymentRepository.findById(id);
            if (optional.isPresent()) {
                return apiResponseService.getResponse(makeStudentPaymentDto(optional.get()));
            } else {
                return apiResponseService.notFoundResponse();
            }
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }
///

    /// StudentGroups for studentPayment
    public ApiResponse getStudentGroups(UUID id) {
        try {
            List<Group> studentGroupList = groupRepository.getStudentGroupList(id);
            List<ResSelect> resSelects = new ArrayList<>();
            for (Group group : studentGroupList) {
                ResSelect resSelect = new ResSelect();
                String key = ("["+group.getName()+"] "+group.getCourse().getName()+" "+group.getTeacher().getUser().getFullName()+" "+
                        group.getStartTime()+" - "+group.getFinishTime());
                resSelect.setId(group.getId());
                resSelect.setName(key);
                resSelects.add(resSelect);
            }
            return apiResponseService.getResponse(resSelects);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

}
