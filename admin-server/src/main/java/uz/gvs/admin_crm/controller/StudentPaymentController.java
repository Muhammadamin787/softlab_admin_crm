package uz.gvs.admin_crm.controller;


import org.hibernate.type.StringType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.StudentPaymentDto;
import uz.gvs.admin_crm.service.ApiResponseService;
import uz.gvs.admin_crm.service.StudentService;
import uz.gvs.admin_crm.utils.AppConstants;

import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/studentPayment")
public class StudentPaymentController {
    @Autowired
    StudentService studentService;
    @Autowired
    ApiResponseService apiResponseService;


    @PostMapping("/{id}")
    public HttpEntity<?> saveStudentPayment(@PathVariable UUID id, @RequestBody StudentPaymentDto studentPaymentDto) {
        ApiResponse apiResponse = studentService.saveStudentPayment(id, studentPaymentDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editStudentPayment(@PathVariable UUID id, @RequestBody StudentPaymentDto studentPaymentDto) {
        ApiResponse apiResponse = studentService.editStudentPayment(id, studentPaymentDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }

    @GetMapping("/one/{id}")
    public HttpEntity<?> getStudentPayment(@PathVariable UUID id) {
        ApiResponse apiResponse = studentService.getStudentPayment(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getStudentPayment(@PathVariable UUID id, @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                           @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
        ApiResponse apiResponse = studentService.getStudentPaymentListStudent(id, page, size);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteStudentPayment(@PathVariable UUID id) {
        ApiResponse apiResponse = studentService.deleteStudentPayment(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 204 : 409).body(apiResponse);
    }

    @GetMapping("/studentGroup/{id}")
    public HttpEntity<?> getStudentGroups(@PathVariable UUID id) {
        ApiResponse apiResponse = studentService.getStudentGroups(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/byDate")
    public HttpEntity<?> getStudentPaymentByDate(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                 @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
                                                 @RequestParam(value = "date1", defaultValue = "") String data1,
                                                 @RequestParam(value = "date2", defaultValue = "") String data2,
                                                 @RequestParam(value = "type", defaultValue = "all")String type) {
        ApiResponse apiResponse = studentService.getStudentPaymentByDate(size, page, data1, data2,type);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }



    @GetMapping("/finance")
    public HttpEntity<?> getPayments(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                     @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
                                     @RequestParam(value = "type", defaultValue = "all") String type
    ) {
        ApiResponse apiResponse = studentService.getPayments(page, size, type);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
}


