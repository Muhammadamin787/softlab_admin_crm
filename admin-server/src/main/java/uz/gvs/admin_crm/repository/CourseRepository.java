package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.Course;
import uz.gvs.admin_crm.entity.Payment;

public interface CourseRepository extends JpaRepository<Course, Integer> {

}
