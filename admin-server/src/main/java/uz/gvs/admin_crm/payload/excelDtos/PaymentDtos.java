package uz.gvs.admin_crm.payload.excelDtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDtos {

    private String fullName;
    private Double amount;
    private Double cashBack;
    private Double allAmount;
    private String payDate;
    private String payType;
    private String group;

}
