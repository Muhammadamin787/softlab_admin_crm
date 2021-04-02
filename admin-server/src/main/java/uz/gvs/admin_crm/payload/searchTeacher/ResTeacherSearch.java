package uz.gvs.admin_crm.payload.searchTeacher;

import lombok.Data;

import java.util.UUID;

@Data
public class ResTeacherSearch {
    private UUID teacherId;
    private String teacherName;
    private String phoneNumber;

    public ResTeacherSearch(UUID teacherId, String teacherName, String phoneNumber) {
        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.phoneNumber = phoneNumber;
    }
}
