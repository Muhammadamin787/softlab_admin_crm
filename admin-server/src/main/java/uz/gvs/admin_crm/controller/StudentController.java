package uz.gvs.admin_crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.RegionDto;
import uz.gvs.admin_crm.payload.StudentDto;
import uz.gvs.admin_crm.repository.RegionRepository;
import uz.gvs.admin_crm.security.CurrentUser;
import uz.gvs.admin_crm.service.ApiResponseService;
import uz.gvs.admin_crm.service.RegionService;
import uz.gvs.admin_crm.service.StudentService;
import uz.gvs.admin_crm.utils.AppConstants;

import java.util.UUID;


@RestController
@RequestMapping("/api/student")
public class
StudentController {

    @Autowired
    StudentService studentService;
    @Autowired
    ApiResponseService apiResponseService;

    @PostMapping
    public HttpEntity<?> saveRegion(@RequestBody StudentDto studentDto) {
        ApiResponse apiResponse = studentService.saveStudent(studentDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }


    @PutMapping("/{id}")
    public HttpEntity<?> editProfession(@PathVariable UUID id, @RequestBody StudentDto studentDto, @CurrentUser User user) {
        ApiResponse apiResponse = studentService.editStudent(id, studentDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }

    //    //  GETOne
    @GetMapping("/{id}")
    public HttpEntity<?> getStudent(@PathVariable UUID id) {
        ApiResponse apiResponse = studentService.getStudent(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    //
//    //  get search
//    @GetMapping("/search")
//    public HttpEntity<?> getSearchRegion(@RequestParam(value = "key", defaultValue = "") String key) {
//        ApiResponse apiResponse = regionService.getSearchRegion(key);
//        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
//    }
//
//
    @GetMapping
    public HttpEntity<?> getStudentList(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                        @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
                                        @CurrentUser User user) {
        ApiResponse apiResponse = studentService.getStudents(page, size);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
//
//
//    //Delete
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<ApiResponse> deleteRegion(@PathVariable Integer id) {
//        try {
//            regionRepository.deleteById(id);
//            return ResponseEntity.status(204).body(apiResponseService.deleteResponse());
//        } catch (Exception e) {
//            return ResponseEntity.status(409).body(apiResponseService.tryErrorResponse());
//        }
//    }
}
