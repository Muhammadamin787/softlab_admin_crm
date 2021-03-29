package uz.gvs.admin_crm.payload.financeDTO;

import lombok.Data;
import java.util.UUID;
@Data

public class ResTeacher {
    private String teacherName;
    private UUID teacherId;
    private String studentName;
    private UUID studentId;
    private double amount;
    private String amountDate;
    private String createdAt;
    private String payTypeName;
    private String groupName;
    private String description;

    public ResTeacher(String teacherName, UUID teacherId, double amount, String amountDate, String payTypeName,String description) {
        this.teacherName = teacherName;
        this.teacherId = teacherId;
        this.amount = amount;
        this.amountDate = amountDate;
        this.payTypeName = payTypeName;
        this.description = description;

    }

    public ResTeacher(String teacherName, UUID teacherId, String studentName, UUID studentId, double amount, String createdAt, String groupName) {
        this.teacherName = teacherName;
        this.teacherId = teacherId;
        this.studentName = studentName;
        this.studentId = studentId;
        this.amount = amount;
        this.createdAt = createdAt;
        this.groupName = groupName;
    }
}
