package uz.gvs.admin_crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.CourseCategoryDto;
import uz.gvs.admin_crm.payload.CourseDto;
import uz.gvs.admin_crm.repository.CourseCategoryRepository;
import uz.gvs.admin_crm.repository.CourseRepository;
import uz.gvs.admin_crm.security.CurrentUser;
import uz.gvs.admin_crm.service.ApiResponseService;
import uz.gvs.admin_crm.service.CourseCategoryService;
import uz.gvs.admin_crm.service.CourseService;
import uz.gvs.admin_crm.utils.AppConstants;

@RestController
@RequestMapping("api/course")
public class CourseController {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    CourseService courseService;
    @Autowired
    CourseRepository courseRepository;

    @PostMapping
    public HttpEntity<?> saveCourse(@RequestBody CourseDto courseDto){
        ApiResponse apiResponse =  courseService.saveCourse(courseDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

//    @GetMapping("/{id}")
//    HttpEntity<?> getOneCourseCategory( @PathVariable Integer id){
//        ApiResponse apiResponse = courseCategoryService.getOneCourseCategory(id);
//        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
//    }
//
//    @GetMapping
//    public HttpEntity<?> getCourseCategoryList(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
//                                       @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
//                                       @CurrentUser User user) {
//        ApiResponse apiResponse = courseCategoryService.getCourseCategoryList(page, size, user);
//        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
//    }
//
//    @PutMapping("/{id}")
//    public HttpEntity<?> editCourseCategory(@PathVariable Integer id, @RequestBody CourseCategoryDto courseCategoryDto) {
//        ApiResponse apiResponse = courseCategoryService.editCourseCategory(courseCategoryDto, id);
//        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<ApiResponse> deleteRegion(@PathVariable Integer id) {
//        try {
//            courseCategoryRepository.deleteById(id);
//            return ResponseEntity.status(204).body(apiResponseService.deleteResponse());
//        } catch (Exception e) {
//            return ResponseEntity.status(409).body(apiResponseService.tryErrorResponse());
//        }
//    }
}
