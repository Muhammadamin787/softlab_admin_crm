package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Course;
import uz.gvs.admin_crm.entity.CourseCategory;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.CourseDto;
import uz.gvs.admin_crm.repository.CourseCategoryRepository;
import uz.gvs.admin_crm.repository.CourseRepository;

import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    CourseCategoryRepository courseCategoryRepository;

    public ApiResponse saveCourse(CourseDto courseDto) {
        try {
            Optional<CourseCategory> optional = courseCategoryRepository.findById(courseDto.getCourseCategoryId());
        if (optional.isPresent()) {
            if (!courseRepository.existsByNameEqualsIgnoreCaseAndCourseCategoryId(courseDto.getName(), courseDto.getCourseCategoryId())) {
                if (makeCourse(courseDto) != null) {
                    return apiResponseService.saveResponse();
                }
                return apiResponseService.tryErrorResponse();
            }
            return apiResponseService.existResponse();
        }
        return apiResponseService.existResponse();
    }catch (Exception e){
            return apiResponseService.tryErrorResponse();
        }
    }

    public Course makeCourse(CourseDto courseDto) {
        try {
            Course course = new Course();
            course.setName(courseDto.getName());
            course.setDescription(courseDto.getDescription());
            course.setActive(courseDto.isActive());
            course.setPrice(courseDto.getPrice());
            course.setCourseCategory(courseCategoryRepository.findById(courseDto.getCourseCategoryId()).orElseThrow(() -> new ResourceNotFoundException("get Course Category")));
            return courseRepository.save(course);
        } catch (Exception e) {
            return null;
        }
    }
}
