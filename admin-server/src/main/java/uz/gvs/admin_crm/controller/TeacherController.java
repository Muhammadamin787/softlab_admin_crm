package uz.gvs.admin_crm.controller;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.TeacherDto;
import uz.gvs.admin_crm.service.TeacherService;

@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    TeacherService teacherService;

    @PostMapping
    public HttpEntity<?> saveTeacher(@RequestBody TeacherDto teacherDto){
        ApiResponse apiResponse = teacherService.saveTeacher(teacherDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }
}
