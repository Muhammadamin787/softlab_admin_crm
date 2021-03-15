package uz.gvs.admin_crm.payload.excelDtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentExcelDtos {

    private String Date;
    private List<PaymentDtos> paymentDtos;

}
