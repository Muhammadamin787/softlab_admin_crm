package uz.gvs.admin_crm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.*;

public interface TeacherSalaryRepository extends JpaRepository<TeacherSalary, Integer> {
    Page<TeacherSalary> findAllByTeacher(Teacher teacher, Pageable pageable);
}
