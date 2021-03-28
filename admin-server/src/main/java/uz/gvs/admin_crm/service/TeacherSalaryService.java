package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.*;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.PageableDto;
import uz.gvs.admin_crm.payload.PaymentDto;
import uz.gvs.admin_crm.payload.TeacherSalaryDto;
import uz.gvs.admin_crm.payload.financeDTO.ResTeacher;
import uz.gvs.admin_crm.repository.PayTypeRepository;
import uz.gvs.admin_crm.repository.PaymentRepository;
import uz.gvs.admin_crm.repository.TeacherRepository;
import uz.gvs.admin_crm.repository.TeacherSalaryRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TeacherSalaryService {
    @Autowired
    TeacherSalaryRepository teacherSalaryRepository;
    @Autowired
    TeacherRepository teacherRepository;
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    PayTypeRepository payTypeRepository;
    @Autowired
    PaymentRepository paymentRepository;

    public ApiResponse minusAmount(TeacherSalaryDto teacherSalaryDto) {
        Optional<Teacher> teacher = teacherRepository.findById(teacherSalaryDto.getTeacherId());
        if (teacher.isPresent()) {
            if (teacherSalaryDto.getPayTypeId() != null && teacherSalaryDto.getAmountDate() != null) {
                if (makeAmount(teacherSalaryDto) != null) {
                    Teacher teacher1 = teacher.get();
                    teacher1.setBalance(teacher1.getBalance() - teacherSalaryDto.getAmount());
                    teacherRepository.save(teacher1);
                    return apiResponseService.saveResponse();
                }
                return apiResponseService.tryErrorResponse();
            }
            return apiResponseService.notEnoughErrorResponse();
        }
        return apiResponseService.notFoundResponse();
    }

    public TeacherSalary makeAmount(TeacherSalaryDto teacherSalaryDto) {
        try {
            TeacherSalary teacherSalary = new TeacherSalary();
            teacherSalary.setTeacher(teacherRepository.findById(teacherSalaryDto.getTeacherId()).orElseThrow(() -> new ResourceNotFoundException("get Teacher")));
            teacherSalary.setPayType(payTypeRepository.findById(teacherSalaryDto.getPayTypeId()).orElseThrow(() -> new ResourceNotFoundException("get PayType")));
            teacherSalary.setAmount(teacherSalaryDto.getAmount());
            SimpleDateFormat formatter1 = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");
            teacherSalary.setAmountDate(teacherSalaryDto.getAmountDate() != null ? formatter1.parse(teacherSalaryDto.getAmountDate()) : null);
            teacherSalary.setDescription(teacherSalaryDto.getDescription());
            return teacherSalaryRepository.save(teacherSalary);
        } catch (Exception e) {
            return null;
        }
    }

    public ApiResponse getSalaries(UUID id, int page, int size) {
        Teacher byId = teacherRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getTeacher"));
        Page<TeacherSalary> all = teacherSalaryRepository.findAllByTeacher(byId, PageRequest.of(page, size));
        return apiResponseService.getResponse(
                new PageableDto(
                        all.getTotalPages(),
                        all.getTotalElements(),
                        all.getNumber(),
                        all.getSize(),
                        all.get().map(this::makeTeacherSalaryDto).collect(Collectors.toList())
                ));
    }

    public TeacherSalaryDto makeTeacherSalaryDto(TeacherSalary teacherSalary) {
        return new TeacherSalaryDto(
                teacherSalary.getId(),
                teacherSalary.getTeacher().getUser().getFullName(),
                teacherSalary.getTeacher().getId(),
                teacherSalary.getAmount(),
                teacherSalary.getAmountDate() != null ? teacherSalary.getAmountDate().toString() : "",
                teacherSalary.getDescription(),
                teacherSalary.getPayType()
        );
    }

    public ApiResponse editSalary(UUID id, TeacherSalaryDto teacherSalaryDto) {
        try {
            Optional<TeacherSalary> optional = teacherSalaryRepository.findById(id);
            if (optional.isPresent()) {
                SimpleDateFormat formatter1 = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");
                if (teacherSalaryDto.getTeacherId() != null && teacherSalaryDto.getPayTypeId() != null && teacherSalaryDto.getAmountDate() != null) {
                    TeacherSalary teacherSalary = optional.get();
                    if (teacherSalaryDto.getTeacherId().equals(teacherSalary.getTeacher().getId())) {
                        double oldAmount = teacherSalary.getAmount();
                        teacherSalary.setAmount(teacherSalaryDto.getAmount());
                        teacherSalary.setPayType(payTypeRepository.findById(teacherSalaryDto.getPayTypeId()).orElseThrow(() -> new ResourceNotFoundException("get Pay Type")));
                        teacherSalary.setAmountDate(teacherSalaryDto.getAmountDate() != null ? formatter1.parse(teacherSalaryDto.getAmountDate()) : null);
                        teacherSalary.setDescription(teacherSalaryDto.getDescription());
                        Optional<Teacher> optionalTeacher = teacherRepository.findById(teacherSalaryDto.getTeacherId());
                        Teacher teacher = optionalTeacher.get();

                        double newAmount = teacherSalaryDto.getAmount();

                        if (optionalTeacher.isPresent()) {
                            if (newAmount != oldAmount) {
                                teacher.setBalance((teacher.getBalance() + (oldAmount - newAmount)));
                            }
                        }
                        teacherRepository.save(teacher);
                        teacherSalaryRepository.save(teacherSalary);
                        return apiResponseService.updatedResponse();
                    }
                    return apiResponseService.errorResponse();
                }
                return apiResponseService.notEnoughErrorResponse();
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getAllSalaries(int page, int size) {
        Page<TeacherSalary> all = teacherSalaryRepository.findAll(PageRequest.of(page, size));
        return apiResponseService.getResponse(
                new PageableDto(
                        all.getTotalPages(),
                        all.getTotalElements(),
                        all.getNumber(),
                        all.getSize(),
                        all.get().map(this::makeSalaryList).collect(Collectors.toList())
                ));
    }

    public TeacherSalaryDto makeSalaryList(TeacherSalary teacherSalary) {
        return new TeacherSalaryDto(
                teacherSalary.getId(),
                teacherSalary.getTeacher().getUser().getFullName(),
                teacherSalary.getTeacher().getId(),
                teacherSalary.getAmount(),
                teacherSalary.getAmountDate().toString(),
                teacherSalary.getDescription(),
                teacherSalary.getPayType()
        );
    }

    public ResTeacher makeSalaryRes(TeacherSalary teacherSalary) {
        return new ResTeacher(
                teacherSalary.getTeacher().getUser().getFullName() + "/" + teacherSalary.getTeacher().getUser().getPhoneNumber(),
                teacherSalary.getTeacher().getId(),
                teacherSalary.getAmount(),
                teacherSalary.getAmountDate().toString(),
                teacherSalary.getPayType()
        );
    }


    public PaymentDto getAllPrices(Payment payment) {
        return new PaymentDto(
                payment.getId(),
                payment.getAttendance(),
                payment.getAmount(),
                payment.getAmountTeacher()
        );
    }

    public ApiResponse getFinance(int page, int size, String type) {
        try {
            switch (type) {
                case "minusSalary":
                    Page<TeacherSalary> optional = teacherSalaryRepository.findAll(PageRequest.of(page, size));
                    return apiResponseService.getResponse(
                            new PageableDto(
                                    optional.getTotalPages(),
                                    optional.getTotalElements(),
                                    optional.getNumber(),
                                    optional.getSize(),
                                    optional.get().map(this::makeSalaryRes).collect(Collectors.toList())
                            )
                    );
                case "plusSalary":
                    Page<Payment> all = paymentRepository.findAll(PageRequest.of(page, size));
                    return apiResponseService.getResponse(
                            new PageableDto(
                                    all.getTotalPages(),
                                    all.getTotalElements(),
                                    all.getNumber(),
                                    all.getSize(),
                                    all.get().map(this::getAllPrices).collect(Collectors.toList())
                            )
                    );
                default:
                    return apiResponseService.errorResponse();
            }
        } catch (Exception exception) {
            return apiResponseService.existResponse();
        }
    }

    public ApiResponse getTeacherPaymentByDate(int page, int size, String data1, String data2, String type) {
        try {
            switch (type) {
                case "minusSalary":
                    List<TeacherSalary> all = teacherSalaryRepository.getByDate(data1, data2, size, page);
                    return apiResponseService.getResponse(
                            new PageableDto(
                                    Long.valueOf(teacherSalaryRepository.getByDateCount(data1, data2)),
                                    page,
                                    size,
                                    all.stream().map(this::makeSalaryList).collect(Collectors.toList())
                            )
                    );
                case "plusSalary":
                    List<Payment> getPrice = paymentRepository.getByDate(data1, data2, size, page);
                    return apiResponseService.getResponse(
                            new PageableDto(
                                    Long.valueOf(paymentRepository.getByDateCount(data1, data2)),
                                    page,
                                    size,
                                    getPrice.stream().map(this::getAllPrices).collect(Collectors.toList())
                            )
                    );
                default:
                    return apiResponseService.errorResponse();
            }
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse deleteTeacherPayment(UUID id) {
        try {
            Optional<TeacherSalary> teacherSalaryOptional = teacherSalaryRepository.findById(id);
            if (teacherSalaryOptional.isPresent()) {
                TeacherSalary teacherSalary = teacherSalaryOptional.get();
                teacherSalaryRepository.deleteById(teacherSalary.getId());
                Optional<Teacher> byId = teacherRepository.findById(teacherSalary.getTeacher().getId());
                Teacher teacher = byId.get();
                teacher.setBalance(teacher.getBalance() + teacherSalary.getAmount());
                teacherRepository.save(teacher);
                return apiResponseService.deleteResponse();
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception exception) {
            return apiResponseService.tryErrorResponse();
        }
    }
}
