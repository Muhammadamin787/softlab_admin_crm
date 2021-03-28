package uz.gvs.admin_crm.payload.financeDTO;

import lombok.Data;
import uz.gvs.admin_crm.entity.PayType;

import java.util.UUID;
@Data
public class ResTeacher {
    private String teacherName;
    private UUID teacherId;
    private String studentName;
    private UUID studentId;
    private double amount;
    private String amountDate;
    private PayType payType;

    public ResTeacher(String teacherName, UUID teacherId, double amount, String amountDate, PayType payType) {
        this.teacherName = teacherName;
        this.teacherId = teacherId;
        this.amount = amount;
        this.amountDate = amountDate;
        this.payType = payType;
    }
}
