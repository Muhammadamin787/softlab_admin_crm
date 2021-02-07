package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.CourseCategory;

import java.util.Optional;

public interface CourseCategoryRepository extends JpaRepository<CourseCategory, Integer> {
    boolean existsByNameEqualsIgnoreCaseAndCourseCategoryId(String name, Integer courseCategory_id);
    boolean existsByNameEqualsIgnoreCaseAndCourseCategory(String name, CourseCategory courseCategory);
    boolean existsByNameEqualsIgnoreCaseAndIdNotAndCourseCategoryId(String name, Integer id, Integer courseCategory_id);
    boolean existsByNameEqualsIgnoreCaseAndCourseCategoryAndIdNot(String name, CourseCategory courseCategory, Integer id);
}
