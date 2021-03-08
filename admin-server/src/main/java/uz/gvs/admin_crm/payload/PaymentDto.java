package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.Attendance;

import java.util.UUID;

@Data
@NoArgsConstructor
public class PaymentDto {
    private UUID id;
    private Attendance attendance;
    private double amount;
    private double amountTeacher;

    public PaymentDto(UUID id, Attendance attendance, double amount) {
        this.id = id;
        this.attendance = attendance;
        this.amount = amount;
    }

    public PaymentDto(UUID id, Attendance attendance, double amount, double amountTeacher) {
        this.id = id;
        this.attendance = attendance;
        this.amount = amount;
        this.amountTeacher = amountTeacher;
    }
}
