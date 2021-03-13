package uz.gvs.admin_crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.AppealDto;
import uz.gvs.admin_crm.service.AppealService;
import uz.gvs.admin_crm.utils.AppConstants;

import java.util.UUID;

@RestController
@RequestMapping("/api/appeal")
public class AppealController {
    @Autowired
    AppealService appealService;

    @PostMapping
    public HttpEntity<?> saveAppeal(@RequestBody AppealDto appealDto) {
        ApiResponse apiResponse = appealService.saveAppeal(appealDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editAppeal(@PathVariable UUID id, @RequestBody AppealDto appealDto) {
        ApiResponse apiResponse = appealService.editAppeal(id, appealDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }

    @GetMapping("/makeStudent/{id}")
    public HttpEntity<?> makeStudent(@PathVariable UUID id) {
        ApiResponse apiResponse = appealService.makeStudent(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PutMapping("/changeType/{id}")
    public HttpEntity<?> changeAppealStatus(@PathVariable UUID id, @RequestBody AppealDto appealDto) {
        ApiResponse apiResponse = appealService.changeStatus(id, appealDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getAppealById(@PathVariable UUID id) {
        ApiResponse apiResponse = appealService.getOneAppeal(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/edit/{id}")
    public HttpEntity<?> getAppealForEditById(@PathVariable UUID id) {
        ApiResponse apiResponse = appealService.getOneAppealForEdit(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteAppeal(@PathVariable UUID id) {
        ApiResponse apiResponse = appealService.deleteAppeal(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/all")
    public HttpEntity<?> getAppealListAll() {
        ApiResponse apiResponse = appealService.getAppealList();
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/s")
    public HttpEntity<?> getAppeals() {
        return null;
    }
}
