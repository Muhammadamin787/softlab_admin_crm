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

import java.text.ParseException;


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
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment;filename=student.xlsx")
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
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment;filename=teacher.xlsx")
                .body(file);
    }

    @GetMapping("/accountant")
    public HttpEntity<?> downloadAccountant(@RequestParam(name = "startDate",defaultValue = "") String startDate,
                                            @RequestParam(name = "finishDate",defaultValue = "") String finishDate) {
        return excelService.downloadStudentPaymentExcel(startDate, finishDate);
    }

}
