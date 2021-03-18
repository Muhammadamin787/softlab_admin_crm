package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.payload.excelDtos.PaymentDtos;
import uz.gvs.admin_crm.payload.excelDtos.PaymentExcelDtos;
import uz.gvs.admin_crm.repository.StudentPaymentRepository;
import uz.gvs.admin_crm.repository.StudentRepository;

import java.util.*;

@Service
public class ExcelService {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    MakeExcelService makeExcelService;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    StudentPaymentRepository studentPaymentRepository;


    public HttpEntity<?> downloadStudentPaymentExcel(String startDate, String finishDate) {
        List<Object> objects = studentPaymentRepository.getStudentPaymentForExcel(startDate, finishDate);
        List<PaymentExcelDtos> paymentExcelDtos = new ArrayList<>();


        List<PaymentDtos> paymentDtos = new ArrayList<>();
        for (Object obj : objects) {
            Object[] client = (Object[]) obj;
            String studentName = client[0].toString();
            Double tolov = Double.valueOf(client[1].toString());
            Double keshbek = Double.valueOf(client[2].toString());
            Double all = Double.valueOf(client[3].toString());
            String payDate = client[4].toString();
            String date = client[5].toString();
            String payTypeName = client[6].toString();
            String group = client[7].toString();


            PaymentDtos paymentDto = new PaymentDtos(studentName, tolov, keshbek, all, payDate, payTypeName, group);
            if (paymentExcelDtos.size() > 0) {
                boolean isHave = false;
                for (PaymentExcelDtos paymentExcelDtos1 : paymentExcelDtos) {
                    String[] s = paymentExcelDtos1.getDate().split(" ");
                    if (Objects.equals(s[0], date)) {
                        paymentDtos = new ArrayList<>();
                        List<PaymentDtos> paymentDtos1 = paymentExcelDtos1.getPaymentDtos();
                        paymentDtos.add(paymentDto);
                        paymentDtos.addAll(paymentDtos1);
                        paymentExcelDtos1.setPaymentDtos(paymentDtos);
                        isHave = true;
                        break;
                    }

                }
                if (!isHave) {
                    paymentExcelDtos.add(new PaymentExcelDtos(
                            date, Collections.singletonList(new PaymentDtos(studentName, tolov, keshbek, all, payDate, payTypeName, group))));

                }
            } else {
                paymentExcelDtos.add(
                        new PaymentExcelDtos(date,
                                Collections.singletonList(
                                        new PaymentDtos(studentName, tolov, keshbek, all, payDate, payTypeName, group))));
            }
        }
        byte[] file = makeExcelService.listForToAccountant(paymentExcelDtos);
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=accountant.xlsx")
                .body(file);
    }
}
