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
import uz.gvs.admin_crm.entity.enums.StudentGroupStatus;
import uz.gvs.admin_crm.entity.enums.UserStatusEnum;
import uz.gvs.admin_crm.payload.*;
import uz.gvs.admin_crm.payload.financeDTO.ResStudent;
import uz.gvs.admin_crm.repository.*;

import java.text.SimpleDateFormat;
import java.util.*;
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
    @Autowired
    StudentGroupRepository studentGroupRepository;
    @Autowired
    CashbackRepository cashbackRepository;
    @Autowired
    PaymentRepository paymentRepository;
    @Autowired
    CheckRole checkRole;

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
            student.setUser(user);
            student.setParentPhone(studentDto.getParentPhone());
            studentRepository.save(student);
            return apiResponseService.saveResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse editStudent(UUID id, StudentDto studentDto) {
        try {
            Optional<Student> byId = studentRepository.findById(id);
            SimpleDateFormat formatter1 = new SimpleDateFormat("dd-MM-yyyy");
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
                student.setParentPhone(studentDto.getParentPhone());
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
            List<Student> studentList = studentRepository.findAllByStudentGroup_Group_id(id);
            List<StudentDto> studentDtos = new ArrayList<>();
            for (Student student : studentList) {
                UUID groupId = null;
                for (StudentGroup studentGroup : student.getStudentGroup()) {
                    if (studentGroup.getGroup().getId().equals(id)) {
                        groupId = studentGroup.getId();
                        break;
                    }
                }
                studentDtos.add(makeGroupStudentDtoList(student, groupId));
            }
            return apiResponseService.getResponse(studentDtos);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public StudentDto makeGroupStudentDtoList(Student student, UUID id) {
        return new StudentDto(
                student.getId(),
                student.getUser().getFullName(),
                student.getUser().getPhoneNumber(),
                new StudentGroupDto(studentGroupRepository.findById(id).get().getId(),
                        studentGroupRepository.findById(id).get().getGroup().getId(),
                        studentGroupRepository.findById(id).get().getGroup().getName(),
                        studentGroupRepository.findById(id).get().getStudentGroupStatus(),
                        studentGroupRepository.findById(id).get().getIsPercent(),
                        studentGroupRepository.findById(id).get().getIndividualPrice(),
                        studentGroupRepository.findById(id).get().getDescription())
        );
    }

    public ApiResponse getStudents(int page, int size, String type, User user) {
        try {
            Page<Student> all = null;
            if (checkRole.isSuperAdmin(user) || checkRole.isFinancier(user) || checkRole.isReception(user)) {
                all = studentRepository.findAllByUser_status(UserStatusEnum.valueOf(type), PageRequest.of(page, size, Sort.by("createdAt").descending()));
            } else {
                all = studentRepository.findAllByUser_status(UserStatusEnum.valueOf(type), PageRequest.of(page, size, Sort.by("createdAt").descending()));
            }
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
        List<StudentGroupDto> studentGroupDtos = new ArrayList<>();
        for (StudentGroup studentGroup : student.getStudentGroup()) {
            StudentGroupDto studentGroupDto = new StudentGroupDto(studentGroup.getId(),
                    studentGroup.getGroup().getId(),
                    studentGroup.getGroup().getName(),
                    studentGroup.getStudentGroupStatus(),
                    studentGroup.getIsPercent(),
                    studentGroup.getIndividualPrice(),
                    studentGroup.getDescription());
            studentGroupDtos.add(studentGroupDto);
        }
        return new StudentDto(
                student.getId(),
                student.getUser().getId(),
                student.getUser().getFullName(),
                student.getUser().getPhoneNumber(),
                student.getParentPhone(),
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
                SimpleDateFormat formatter1 = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");
                StudentPayment studentPayment = new StudentPayment();
                studentPayment.setStudent(studentPaymentDto.getStudentId() != null ? studentRepository.findById(studentPaymentDto.getStudentId()).orElseThrow(() -> new ResourceNotFoundException("get StudentId")) : null);
                studentPayment.setGroup(studentPaymentDto.getGroupId() != null ? groupRepository.findById(studentPaymentDto.getGroupId()).orElseThrow(() -> new ResourceNotFoundException("get Group")) : null);
                studentPayment.setPayType(studentPaymentDto.getPayTypeId() != null ? payTypeRepository.findById(studentPaymentDto.getPayTypeId()).orElseThrow(() -> new ResourceNotFoundException("get PayType")) : null);
                studentPayment.setSum(studentPaymentDto.getSum());
                studentPayment.setPayDate(studentPaymentDto.getPayDate() != null ? formatter1.parse(studentPaymentDto.getPayDate()) : null);
                studentPayment.setComment(studentPaymentDto.getComment());
                studentPaymentRepository.save(studentPayment);
                Student student = byId.get();
                Cashback byPrice = cashbackRepository.getByPrice(studentPaymentDto.getSum());
                studentPayment.setCashback(byPrice);
                if (byPrice != null) {
                    student.setBalans((byPrice.getPercent() * (studentPaymentDto.getSum() / 100)) + student.getBalans() + studentPaymentDto.getSum());
                    studentPayment.setCashSum(byPrice.getPercent() * (studentPaymentDto.getSum() / 100));
                } else {
                    student.setBalans(student.getBalans() + studentPaymentDto.getSum());
                }
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
                SimpleDateFormat formatter1 = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");
                StudentPayment studentPayment = byId.get();
                studentPayment.setStudent(studentPaymentDto.getStudentId() != null ? studentRepository.findById(studentPaymentDto.getStudentId()).orElseThrow(() -> new ResourceNotFoundException("get StudentId")) : null);
                studentPayment.setGroup(studentPaymentDto.getGroupId() != null ? groupRepository.findById(studentPaymentDto.getGroupId()).orElseThrow(() -> new ResourceNotFoundException("get Group")) : null);
                studentPayment.setPayType(studentPaymentDto.getPayTypeId() != null ? payTypeRepository.findById(studentPaymentDto.getPayTypeId()).orElseThrow(() -> new ResourceNotFoundException("get PayType")) : null);
                //// OLD OMOUNT
                double oldAmount = studentPayment.getSum();
                ////// NEW AMOUT
                double newAmount = studentPaymentDto.getSum();
                studentPayment.setSum(studentPaymentDto.getSum());
                studentPayment.setPayDate(studentPaymentDto.getPayDate() != null ? formatter1.parse(studentPaymentDto.getPayDate()) : null);
                studentPayment.setComment(studentPaymentDto.getComment());
                studentPaymentRepository.save(studentPayment);
                ////Balans uchun
                Optional<Student> byId1 = studentRepository.findById(studentPaymentDto.getStudentId());
                Cashback byPrice = cashbackRepository.getByPrice(studentPaymentDto.getSum());
                studentPayment.setCashback(byPrice);
                if (byId1.isPresent()) {
                    if (newAmount != oldAmount) {
                        Student student = byId1.get();
                        if (byPrice != null) {
                            student.setBalans((student.getBalans() - (oldAmount + studentPayment.getCashSum())) + (newAmount + (byPrice.getPercent() * newAmount / 100)));
                            studentPayment.setCashSum(byPrice.getPercent() * (newAmount / 100));
                        } else {
                            student.setBalans((student.getBalans() - (oldAmount + studentPayment.getCashSum())) + newAmount);
                            studentPayment.setCashSum(0.0);
                        }
                        studentRepository.save(student);
                        return apiResponseService.updatedResponse();
                    }
                }
                return apiResponseService.notFoundResponse();
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
                studentPayment.getCashback(),
                studentPayment.getCashSum(),
                studentPayment.getSum(),
                studentPayment.getPayDate() != null ? studentPayment.getPayDate().toString() : null,
                studentPayment.getComment(),
                studentPayment.getGroup()
        );
    }

    public StudentPaymentDto makeStudentPaymentCashbacks(StudentPayment studentPayment) {
        return new StudentPaymentDto(
                studentPayment.getId(),
                studentPayment.getPayType(),
                studentPayment.getStudent(),
                studentPayment.getCashback(),
                studentPayment.getCashSum(),
                studentPayment.getSum(),
                studentPayment.getPayDate() != null ? studentPayment.getPayDate().toString() : null,
                studentPayment.getComment(),
                studentPayment.getGroup()
        );
    }

    public PaymentDto getAllPrices(Payment payment) {
        return new PaymentDto(
                payment.getId(),
                payment.getAttendance(),
                payment.getAmount()
        );
    }

    ///new Student Gets start
    public ResStudent getAllAmounts(Payment payment) {
        return new ResStudent(
                payment.getAttendance().getStudent().getId(),
                payment.getAttendance().getStudent().getUser().getFullName() + " / " + payment.getAttendance().getStudent().getUser().getPhoneNumber(),
                payment.getAmount(),
                payment.getCreatedAt().toString(),
                payment.getAttendance().getGroup().getName() + " [ " + payment.getAttendance().getGroup().getCourse().getName() + " ]"
        );
    }

    public ResStudent   makeResStudent(StudentPayment studentPayment) {
        return new ResStudent(
                studentPayment.getStudent().getId(),
                studentPayment.getStudent().getUser().getFullName() + " / " + studentPayment.getStudent().getUser().getPhoneNumber(),
                studentPayment.getSum(),
                studentPayment.getCashSum(),
                studentPayment.getCashback() != null ? studentPayment.getCashback().getPercent() :0,
                studentPayment.getPayType().getName(),
                studentPayment.getComment(),
                studentPayment.getPayDate().toString()

        );
    }

    public ResStudent makeResStudentCashbacks(StudentPayment studentPayment) {
        return new ResStudent(
                studentPayment.getStudent().getId(),
                studentPayment.getStudent().getUser().getFullName() + " / " + studentPayment.getStudent().getUser().getPhoneNumber(),
                studentPayment.getSum(),
                studentPayment.getCashSum(),
                studentPayment.getCashback().getPercent(),
                studentPayment.getPayType().getName(),
                studentPayment.getComment(),
                studentPayment.getPayDate().toString()

        );
    }

///// new Student Gets finished


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

    public ApiResponse deleteStudentPayment(UUID id) {
        try {
            Optional<StudentPayment> studentOptional = studentPaymentRepository.findById(id);
            if (studentOptional.isPresent()) {
                StudentPayment studentPayment = studentOptional.get();
                studentPaymentRepository.deleteById(studentPayment.getId());
                Optional<Student> byId = studentRepository.findById(studentPayment.getStudent().getId());
                Student student = byId.get();
                if (studentPayment.getCashSum() != 0) {
                    student.setBalans(student.getBalans() - (studentPayment.getSum() + studentPayment.getCashSum()));
                } else {
                    student.setBalans(student.getBalans() - studentPayment.getSum());
                }
                studentRepository.save(student);
                return apiResponseService.deleteResponse();
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse makeSituation(SituationDto situationDto) {
        try {
            Optional<Student> optional = studentRepository.findById(situationDto.getStudentId());
            if (optional.isPresent() && situationDto.getSituation() != null && situationDto.getSituation().length() > 3) {
                Student student = optional.get();
                for (StudentGroup studentGroup : student.getStudentGroup()) {
                    if (studentGroup.getGroup().getId().equals(situationDto.getGroupId())) {
                        if (situationDto.getSituation().equals("TRANSFER")) {
                            studentGroup.setStudentGroupStatus(StudentGroupStatus.valueOf(situationDto.getSituation()));
                            if (isHaveStudentGroup(student.getStudentGroup(), situationDto.getNewGroupId())) {
                                StudentGroup newStudentGroup = studentGroupRepository.save(new StudentGroup(
                                        groupRepository.findById(situationDto.getNewGroupId()).get(),
                                        StudentGroupStatus.TEST_LESSON,
                                        0,
                                        ""
                                ));
                                Set<StudentGroup> studentGroup1 = student.getStudentGroup();
                                studentGroup1.add(newStudentGroup);

                                student.setStudentGroup(studentGroup1);
                            } else {
                                return apiResponseService.existResponse();
                            }
                        } else {
                            studentGroup.setStudentGroupStatus(StudentGroupStatus.valueOf(situationDto.getSituation()));
                        }
                        studentRepository.save(student);
                        return apiResponseService.updatedResponse();
                    }
                }
                return apiResponseService.notFoundResponse();
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public boolean isHaveStudentGroup(Set<StudentGroup> studentGroupList, int groupId) {
        for (StudentGroup studentGroup : studentGroupList) {
            if (studentGroup.getGroup().getId() == groupId)
                return false;
        }
        return true;
    }

    /// StudentGroups for studentPayment
    public ApiResponse getStudentGroups(UUID id) {
        try {
            List<Group> studentGroupList = groupRepository.getStudentGroupList(id);
            List<ResSelect> resSelects = new ArrayList<>();
            for (Group group : studentGroupList) {
                ResSelect resSelect = new ResSelect();
                String key = ("[" + group.getName() + "] " + group.getCourse().getName() + " " + group.getTeacher().getUser().getFullName() + " " +
                        group.getStartTime() + " - " + group.getFinishTime());
                resSelect.setId(group.getId());
                resSelect.setName(key);
                resSelects.add(resSelect);
            }
            return apiResponseService.getResponse(resSelects);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getDebtorStudents(int page, int size) {
        Page<Student> all = studentRepository.getDebtorStudents(PageRequest.of(page, size));
        return apiResponseService.getResponse(
                new PageableDto(
                        all.getTotalPages(),
                        all.getTotalElements(),
                        all.getNumber(),
                        all.getSize(),
                        all.get().map(this::makeStudentDtoForDeptors).collect(Collectors.toList())
                ));
    }

    public StudentDto makeStudentDtoForDeptors(Student student) {
        if (student.getBalans() < 0) {
            return new StudentDto(
                    student.getId(),
                    student.getUser().getId(),
                    student.getBalans(),
                    student.getUser().getFullName(),
                    student.getUser().getPhoneNumber(),
                    student.getParentPhone(),
                    student.getUser().getRegion(),
                    student.getUser().getRegion() != null ? student.getUser().getRegion().getId() : null,
                    student.getStudentGroup()
            );
        }
        return null;
    }

    public ApiResponse getStudentPaymentByDate(int size, int page, String data1, String data2, String type) {
        try {

            switch (type) {
                case "all":
                    List<StudentPayment> all = studentPaymentRepository.getByDate(data1, data2, size, page);
                    return apiResponseService.getResponse(
                            new PageableDto(
                                    Long.valueOf(studentPaymentRepository.getStudentPaymentByDateCount(data1, data2)),
                                    page,
                                    size,
                                    all.stream().map(this::makeResStudent).collect(Collectors.toList())
                            )
                    );
                case "byCashbacks":
                    List<StudentPayment> byCashback = studentPaymentRepository.getByDateAndCashback(data1, data2, size, page);
                    return apiResponseService.getResponse(
                            new PageableDto(
                                    Long.valueOf(studentPaymentRepository.getByDateAndCashbackCount(data1, data2)),
                                    page,
                                    size,
                                    byCashback.stream().map(this::makeResStudentCashbacks).collect(Collectors.toList())
                            )
                    );
                case "getPrice":
                    List<Payment> getPrice = paymentRepository.getByDate(data1, data2, size, page);
                    return apiResponseService.getResponse(
                            new PageableDto(
                                    Long.valueOf(paymentRepository.getByDateCount(data1, data2)),
                                    page,
                                    size,
                                    getPrice.stream().map(this::getAllAmounts).collect(Collectors.toList())
                            )
                    );
                default:
                    return apiResponseService.errorResponse();
            }
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getPayments(int page, int size, String type) {
        try {
            switch (type) {
                case "all":
                    Page<StudentPayment> optional = studentPaymentRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
                    return apiResponseService.getResponse(
                            new PageableDto(
                                    optional.getTotalPages(),
                                    optional.getTotalElements(),
                                    optional.getNumber(),
                                    optional.getSize(),
                                    optional.get().map(this::makeResStudent).collect(Collectors.toList())
                            )
                    );
                case "byCashbacks":
                    List<StudentPayment> byCashback = studentPaymentRepository.getStudentPaymentByCashback(page, size);
                    return apiResponseService.getResponse(
                            new PageableDto(
                                    Long.valueOf(studentPaymentRepository.getStudentPaymentByCashbackCount()),
                                    page,
                                    size,
                                    byCashback.stream().map(this::makeResStudentCashbacks).collect(Collectors.toList())
                            )
                    );
                case "getPrice":
                    Page<Payment> all = paymentRepository.findAll(PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt")));
                    return apiResponseService.getResponse(
                            new PageableDto(
                                    all.getTotalPages(),
                                    all.getTotalElements(),
                                    all.getNumber(),
                                    all.getSize(),
                                    all.get().map(this::getAllAmounts).collect(Collectors.toList())
                            )
                    );
                default:
                    return apiResponseService.errorResponse();
            }
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse searchStudent(String name, Integer groupId) {
        try {
            List<Object> objects = studentRepository.searchStudent(name.toLowerCase(), groupId);
            List<ResSelect> resSelects = new ArrayList<>();
            for (Object obj : objects) {
                Object[] student = (Object[]) obj;
                UUID id = UUID.fromString(student[0].toString());
                String name1 = student[1].toString();
                ResSelect resSelectDto = new ResSelect(name1, id);
                resSelects.add(resSelectDto);
            }
            return apiResponseService.getResponse(resSelects);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse addIndividualPrice(UUID id, ResSelect resSelect) {
        try {
            Optional<Student> optional = studentRepository.findById(id);
            if (optional.isPresent() && resSelect.getIsPercent() != null && resSelect.getIndividualPrice() != null) {
                Student student = optional.get();
                for (StudentGroup studentGroup : student.getStudentGroup()) {
                    if (studentGroup.getGroup().getId() == resSelect.getId()) {
                        studentGroup.setIndividualPrice(resSelect.getIndividualPrice());
                        studentGroup.setIsPercent(resSelect.getIsPercent());
                        studentGroupRepository.save(studentGroup);
                        return apiResponseService.saveResponse();
                    }
                    return apiResponseService.existResponse();
                }
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse deleteIndividualPrice(UUID studentId, Integer groupId) {
        try {
            Optional<Student> optional = studentRepository.findById(studentId);
            if (optional.isPresent()) {
                Student student = optional.get();
                for (StudentGroup studentGroup : student.getStudentGroup()) {
                    if (studentGroup.getGroup().getId() == groupId) {
                        studentGroup.setIndividualPrice(0.0);
                        studentGroup.setIsPercent(null);
                        studentGroupRepository.save(studentGroup);
                        return apiResponseService.saveResponse();
                    }
                    return apiResponseService.existResponse();
                }
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse ToArchiveStatus(UUID studentId, String status) {
        try {
            Optional<Student> studentOptional = studentRepository.findById(studentId);
            if (studentOptional.isPresent()) {
                Student student = studentOptional.get();
                student.getUser().setEnabled(!student.getUser().isEnabled());
                student.getUser().setStatus(UserStatusEnum.valueOf(status));
                studentRepository.save(student);
                return apiResponseService.updatedResponse();
            } else {
                return apiResponseService.existResponse();
            }
        } catch (Exception exception) {
            return apiResponseService.errorResponse();
        }
    }

    public ApiResponse searchAllStudent(String name) {
        try {
            List<Object> objects = studentRepository.searchAllStudent(name.toLowerCase());
            List<ResSelect> resSelects = new ArrayList<>();
            for (Object obj : objects) {
                Object[] student = (Object[]) obj;
                UUID id = UUID.fromString(student[0].toString());
                String name1 = student[1].toString();
                String phoneNumber = student[2].toString();
                ResSelect resSelectDto = new ResSelect(id, name1, phoneNumber);
                resSelects.add(resSelectDto);
            }
            return apiResponseService.getResponse(resSelects);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }
}
