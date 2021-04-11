package uz.gvs.admin_crm.payload.financeDTO;

import lombok.Data;

import java.util.UUID;

@Data

public class ResStudent {
    private UUID studentId;
    private String studentName;
    private double sum;
    private double cashSum;
    private double cashPercent;
    private String payTypeName;
    private String comment;
    private String payDate;
    private double amount;
    private String createdAt;
    private String groupName;


    public ResStudent(UUID studentId, String studentName, double sum,double cashSum, double cashPercent, String payTypeName, String comment, String payDate) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.sum = sum;
        this.cashSum = cashSum;
        this.cashPercent = cashPercent;
        this.payTypeName = payTypeName;
        this.comment = comment;
        this.payDate = payDate;
    }

    public ResStudent(UUID studentId, String studentName, double amount, String createdAt, String groupName) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.amount = amount;
        this.createdAt = createdAt;
        this.groupName = groupName;
    }
}
