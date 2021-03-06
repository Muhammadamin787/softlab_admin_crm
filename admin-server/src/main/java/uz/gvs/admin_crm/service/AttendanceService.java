package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
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

                Teacher teacher = optionalTeacher.get();
                Group group = optionalGroup.get();
                for (StudentAttendDto studentAttendDto : attendanceDto.getStudentList()) {
                    Student get_student = studentRepository.findById(studentAttendDto.getStudentId()).orElseThrow(() -> new ResourceNotFoundException("Get Student"));
                    Optional<Attendance> optionalAttendance = attendanceRepository.findByGroup_IdAndTeacher_IdAndStudent_IdAndAttendDate(group.getId(), teacher.getId(), studentAttendDto.getStudentId(), attendanceDto.getDate());

                    if (optionalAttendance.isPresent()) {
                        Attendance attendance1 = optionalAttendance.get();
                        if (attendance1.getAttandanceEnum().equals(AttandanceEnum.YES)) {
                            if (studentAttendDto.isActive()) {

                            } else {
                                get_student.setBalans(get_student.getBalans() + group.getCourse().getPrice());
                                if (teacher.isPercent()) {
                                    teacher.setBalance(teacher.getBalance() - (group.getCourse().getPrice() / 100 * teacher.getSalary()));
                                } else {
                                    teacher.setBalance(teacher.getBalance() - teacher.getSalary());
                                }
                            }
                        } else {
                            if (studentAttendDto.isActive()) {
                                get_student.setBalans(get_student.getBalans() - group.getCourse().getPrice());
                                if (teacher.isPercent()) {
                                    teacher.setBalance(teacher.getBalance() + (group.getCourse().getPrice() / 100 * teacher.getSalary()));
                                } else {
                                    teacher.setBalance(teacher.getBalance() + teacher.getSalary());
                                }
                            }
                        }
                        teacherRepository.save(teacher);
                        studentRepository.save(get_student);
                        if (studentAttendDto.isActive()){
                            attendance1.setAttandanceEnum(AttandanceEnum.YES);
                        }else {
                            attendance1.setAttandanceEnum(AttandanceEnum.NO);
                        }


                        attendanceRepository.save(attendance1);
                    } else {
                        if (studentAttendDto.isActive()) {
                            Attendance attendance2 = new Attendance();
                            attendance2.setGroup(group);
                            attendance2.setTeacher(teacher);
                            attendance2.setStudent(get_student);
                            attendance2.setAttandanceEnum(studentAttendDto.isActive() ? AttandanceEnum.YES : AttandanceEnum.NO);
                            attendance2.setAttendDate(attendanceDto.getDate());
                            Attendance savedAttendance = attendanceRepository.save(attendance2);

                            paymentRepository.save(new Payment(
                                    savedAttendance,
                                    group.getCourse().getPrice(),
                                    (teacher.isPercent() ? (group.getCourse().getPrice() / 100 * teacher.getSalary()) : teacher.getSalary())
                            ));
                            get_student.setBalans(get_student.getBalans() - group.getCourse().getPrice());
                            if (teacher.isPercent()) {
                                teacher.setBalance(teacher.getBalance() + (group.getCourse().getPrice() / 100 * teacher.getSalary()));
                            } else {
                                teacher.setBalance(teacher.getBalance() + teacher.getSalary());
                            }
                            studentRepository.save(get_student);
                            teacherRepository.save(teacher);
                        } else {
                            Attendance attendance3 = new Attendance();
                            attendance3.setGroup(group);
                            attendance3.setTeacher(teacher);
                            attendance3.setStudent(get_student);
                            attendance3.setAttandanceEnum(studentAttendDto.isActive() ? AttandanceEnum.YES : AttandanceEnum.NO);
                            attendance3.setAttendDate(attendanceDto.getDate());
                            attendanceRepository.save(attendance3);
                        }
                    }
                }

                return apiResponseService.saveResponse();
            } else {
                return apiResponseService.notFoundResponse();
            }
        } catch (
                Exception e) {
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
