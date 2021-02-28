package uz.gvs.admin_crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.TeacherDto;
import uz.gvs.admin_crm.service.SalaryService;

@RestController
@RequestMapping("/api/salary")
public class SalaryController {
    @Autowired
    SalaryService salaryService;

    @PostMapping
    public HttpEntity<?> saveSalary(@RequestBody TeacherDto teacherDto) {
        ApiResponse apiResponse = salaryService.saveSalary(teacherDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }
}
