package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Course;
import uz.gvs.admin_crm.entity.CourseCategory;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.CourseDto;
import uz.gvs.admin_crm.payload.PageableDto;
import uz.gvs.admin_crm.repository.CourseCategoryRepository;
import uz.gvs.admin_crm.repository.CourseRepository;

import java.util.Optional;
import java.util.stream.Collectors;

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
        } catch (Exception e) {
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

    public CourseDto makeCourseDto(Course course) {
        return new CourseDto(
                course.getId(),
                course.getName(),
                course.getDescription(),
                course.isActive(),
                course.getPrice(),
                course.getCourseCategory()
        );
    }

    public ApiResponse getOneCourse(Integer id) {
        try {
            Optional<Course> course = courseRepository.findById(id);
            if (!course.isPresent()) {
                return apiResponseService.notFoundResponse();
            }
            return apiResponseService.getResponse(makeCourseDto(course.get()));
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getCourseList(int page, int size, User user) {
        try {
            Page<Course> all = null;
            all = courseRepository.findAll(PageRequest.of(page, size));
            return apiResponseService.getResponse(
                    new PageableDto(
                            all.getTotalPages(),
                            all.getTotalElements(),
                            all.getNumber(),
                            all.getSize(),
                            all.get().map(this::makeCourseDto).collect(Collectors.toList())
                    ));
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse editCourse(CourseDto courseDto, Integer id) {
        try {
            Optional<Course> optionalCourse = courseRepository.findById(id);
            Optional<CourseCategory> optionalCourseCategory = courseCategoryRepository.findById(courseDto.getCourseCategoryId());
            if (optionalCourse.isPresent() && optionalCourseCategory.isPresent()) {
                Course course = optionalCourse.get();
                CourseCategory courseCategory = optionalCourseCategory.get();
                course.setName(courseDto.getName());
                course.setDescription(courseDto.getDescription());
                course.setActive(courseDto.isActive());
                course.setPrice(courseDto.getPrice());
                course.setCourseCategory(courseCategory);
                courseRepository.save(course);
                return apiResponseService.updatedResponse();
            }
            return apiResponseService.notFoundResponse();
        }catch (Exception e){
            return apiResponseService.tryErrorResponse();
        }
    }
}
