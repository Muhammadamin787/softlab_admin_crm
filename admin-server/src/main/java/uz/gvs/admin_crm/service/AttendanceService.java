package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.*;
import uz.gvs.admin_crm.entity.enums.AttandanceEnum;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.AttendanceDto;
import uz.gvs.admin_crm.payload.StudentAttendDto;
import uz.gvs.admin_crm.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    AttendanceRepository attendanceRepository;
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    TeacherRepository teacherRepository;
    @Autowired
    GroupRepository groupRepository;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    PaymentRepository paymentRepository;

    public ApiResponse saveAttendance(AttendanceDto attendanceDto) {
        try {

            // userni teacher yoki superadmin admin roliga tekshirish
            Optional<Teacher> optionalTeacher = teacherRepository.findById(attendanceDto.getTeacherId());
            Optional<Group> optionalGroup = groupRepository.findById(attendanceDto.getGroupId());
            if (optionalGroup.isPresent() && optionalTeacher.isPresent()
                    && attendanceDto.getStudentList() != null
                    && attendanceDto.getStudentList().size() > 0) {
                List<Attendance> attendances = new ArrayList<>();
                Group group = optionalGroup.get();
                double dailyPrice = 0;
                Teacher teacher = optionalTeacher.get();
                List<Student> studentList = new ArrayList<>();

                for (StudentAttendDto sadto : attendanceDto.getStudentList()) {
                    Optional<Student> byId = studentRepository.findById(sadto.getStudentId());
                    if (byId.isPresent()) {
                        Attendance attendance = new Attendance();
                        Student student = byId.get();
                        attendance.setAttendDate(attendanceDto.getDate());
                        // guruhdagai statusini tekshirish kerak muzlagan yoki faol bo'lsa
                        attendance.setTeacher(teacher);
                        attendance.setGroup(group);
                        attendance.setAttandanceEnum(sadto.isActive() ? AttandanceEnum.YES : AttandanceEnum.NO);
                        attendance.setStudent(student);
                        attendances.add(attendance);
                        if (sadto.isActive()) {
                            dailyPrice += group.getCourse().getPrice();
                            student.setBalans(student.getBalans() - group.getCourse().getPrice());
                            studentList.add(student);
                        }
                    }
                }


                double teachPrice = 0;
                if (teacher.isPercent()) {
                    double teacherPrice = dailyPrice / 100 * teacher.getSalary();
                    teacher.setBalance(teacher.getBalance() + teacherPrice);
                    teachPrice = dailyPrice / 100 * teacher.getSalary();
                } else {
                    teacher.setBalance(teacher.getBalance() + teacher.getSalary());
                    teachPrice = teacher.getSalary();
                }

                teacherRepository.save(teacher);
                studentRepository.saveAll(studentList);
                List<Attendance> attendances1 = attendanceRepository.saveAll(attendances);

                List<Payment> paymentList = new ArrayList<>();
                for (Attendance attendance : attendances1) {
                    Payment payment = new Payment();
                    payment.setAttendance(attendance);
                    payment.setAmount(attendance.getAttandanceEnum().equals(AttandanceEnum.YES) ? group.getCourse().getPrice() : 0);

                    paymentList.add(payment);
                }

                paymentRepository.saveAll(paymentList);
                //studetent balansidan pul yechib olish
                return apiResponseService.saveResponse();
            } else {
                return apiResponseService.notFoundResponse();
            }
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getAttendanceList(int groupId) {
        try {
            List<Attendance> group_id = attendanceRepository.findAllByGroup_id(groupId);
            return apiResponseService.getResponse(group_id);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }

    }
}
