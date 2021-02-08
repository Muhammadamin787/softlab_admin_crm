package uz.gvs.admin_crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.RoomDto;
import uz.gvs.admin_crm.payload.TeacherDto;
import uz.gvs.admin_crm.service.TeacherService;

import java.util.UUID;

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


    @PutMapping("/{id}")
    public HttpEntity<?> save(@PathVariable UUID id, @RequestBody TeacherDto teacherDto) {
        ApiResponse apiResponse = teacherService.editTeacher(teacherDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }
}
