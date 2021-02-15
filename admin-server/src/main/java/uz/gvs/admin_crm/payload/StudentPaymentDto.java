package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.PayType;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.entity.StudentGroup;


import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentPaymentDto {
    private UUID id;
    private PayType payType;
    private Student student;
    private double sum;
    private String payDate;
    private String comment;

    private Integer groupId;
    private UUID studentId;
    private Integer payTypeId;



    public StudentPaymentDto(UUID id, PayType payType, Student student, double sum, String payDate, String comment) {
        this.id = id;
        this.payType = payType;
        this.student = student;
        this.sum = sum;
        this.payDate = payDate;
        this.comment = comment;
    }
}
