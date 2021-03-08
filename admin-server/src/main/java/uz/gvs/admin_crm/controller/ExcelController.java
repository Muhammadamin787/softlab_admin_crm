package uz.gvs.admin_crm.controller;


import org.apache.commons.compress.utils.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.repository.StudentRepository;
import uz.gvs.admin_crm.repository.TeacherRepository;
import uz.gvs.admin_crm.service.ExcelService;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/excel/download")
public class ExcelController {
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    ExcelService excelService;
    @Autowired
    TeacherRepository teacherRepository;

    @GetMapping("/student")
    public HttpEntity<?> downloadStudent() {
        byte[] file = excelService.contactListToExcelStudentFile(studentRepository.findAll());
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment;filename=student.xlsx")
                .body(file);
    }

    @GetMapping("/teacher")
    public HttpEntity<?> downloadTeacher() {
        byte[] file = new byte[0];
        try {
            file = excelService.contactListToExcelTeacherFile(teacherRepository.findAll());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment;filename=teacher.xlsx")
                .body(file);
    }


}
