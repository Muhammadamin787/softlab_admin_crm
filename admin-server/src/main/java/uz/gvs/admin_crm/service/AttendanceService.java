package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Attendance;
import uz.gvs.admin_crm.entity.Group;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.entity.Teacher;
import uz.gvs.admin_crm.entity.enums.AttandanceEnum;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.AttendanceDto;
import uz.gvs.admin_crm.payload.StudentAttendDto;
import uz.gvs.admin_crm.repository.AttendanceRepository;
import uz.gvs.admin_crm.repository.GroupRepository;
import uz.gvs.admin_crm.repository.StudentRepository;
import uz.gvs.admin_crm.repository.TeacherRepository;

import java.sql.Date;
import java.text.SimpleDateFormat;
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

    public ApiResponse saveAttendance(AttendanceDto attendanceDto) {
        try {
            // userni tescher yoki superadmin admin roliga tekshirish
            Optional<Teacher> optionalTeacher = teacherRepository.findById(attendanceDto.getTeacherId());
            Optional<Group> optionalGroup = groupRepository.findById(attendanceDto.getGroupId());
            if (optionalGroup.isPresent() && optionalTeacher.isPresent()
                    && attendanceDto.getStudentList() != null
                    && attendanceDto.getStudentList().size() > 0) {
                List<Attendance> attendances = new ArrayList<>();
                Group group = optionalGroup.get();
                Teacher teacher = optionalTeacher.get();
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
                    }
                }
                List<Attendance> attendances1 = attendanceRepository.saveAll(attendances);
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
