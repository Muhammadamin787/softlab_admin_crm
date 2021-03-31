package uz.gvs.admin_crm.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.gvs.admin_crm.repository.StudentRepository;
import uz.gvs.admin_crm.repository.TeacherRepository;
import uz.gvs.admin_crm.service.ExcelService;
import uz.gvs.admin_crm.service.MakeExcelService;

import javax.swing.text.DateFormatter;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;


@RestController
@RequestMapping("/api/excel/download")
public class ExcelController {
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    MakeExcelService makeExcelService;
    @Autowired
    TeacherRepository teacherRepository;
    @Autowired
    ExcelService excelService;

    @GetMapping("/student")
    public HttpEntity<?> downloadStudent() {
        byte[] file = makeExcelService.contactListToExcelStudentFile(studentRepository.findAll());
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDateTime localDateTime = LocalDateTime.now();
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment;filename=student(" +  dateTimeFormatter.format(localDateTime) +").xlsx")
                .body(file);
    }

    @GetMapping("/teacher")
    public HttpEntity<?> downloadTeacher() {
        byte[] file = new byte[0];
        try {
            file = makeExcelService.contactListToExcelTeacherFile(teacherRepository.findAll());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDateTime now = LocalDateTime.now();
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment;filename=teacher(" + dtf.format(now) +").xlsx")
                .body(file);
    }

    @GetMapping("/qarzdor")
    public HttpEntity<?> downloadAccountant(){
        byte[] file = new byte[0];
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        LocalDateTime now = LocalDateTime.now();
        try{
            file = makeExcelService.listToQarzdorlar(studentRepository.getByBalansDebt());
        }catch (Exception e){
            e.printStackTrace();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment;filename=qarzdorlar" + dtf.format(now) + ".xlsx")
                .body(file);
    }

    @GetMapping("/accountant")
    public HttpEntity<?> downloadAccountant(@RequestParam(name = "startDate",defaultValue = "") String startDate,
                                            @RequestParam(name = "finishDate",defaultValue = "") String finishDate) {
        return excelService.downloadStudentPaymentExcel(startDate, finishDate);
    }

}
