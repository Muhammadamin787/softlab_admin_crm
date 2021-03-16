package uz.gvs.admin_crm.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.entity.StudentGroup;
import uz.gvs.admin_crm.entity.Teacher;
import uz.gvs.admin_crm.payload.excelDtos.PaymentDtos;
import uz.gvs.admin_crm.payload.excelDtos.PaymentExcelDtos;
import uz.gvs.admin_crm.repository.StudentPaymentRepository;
import uz.gvs.admin_crm.repository.StudentRepository;

import java.io.ByteArrayOutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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

        SimpleDateFormat formatForDate = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat formatForTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
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
                for (PaymentExcelDtos paymentExcelDto : paymentExcelDtos) {
                    if (paymentExcelDto.getDate().equals(date)) {
                        paymentDtos = new ArrayList<>();
                        List<PaymentDtos> paymentDtos1 = paymentExcelDto.getPaymentDtos();

                        paymentDtos.add(paymentDto);
                        paymentDtos.addAll(paymentDtos1);

                        paymentExcelDto.setPaymentDtos(paymentDtos);
                    } else {
                        paymentExcelDtos.add(
                                new PaymentExcelDtos(date,
                                        Collections.singletonList(
                                                new PaymentDtos(studentName, tolov, keshbek, all, payDate, payTypeName, group))));

                        break;
                    }
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
