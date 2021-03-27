package uz.gvs.admin_crm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TeacherSalaryRepository extends JpaRepository<TeacherSalary, UUID> {
    Page<TeacherSalary> findAllByTeacher(Teacher teacher, Pageable pageable);

    @Query(nativeQuery = true, value = "select * from student_payment sp where pay_date >= cast(:date1 as date) and pay_date < cast(:date2 as date) order by sp.created_at desc limit :size offset (:size * :page)")
    List<TeacherSalary> getByDate(String date1, String date2, int size, int page);

    @Query(nativeQuery = true, value = "select * from student_payment where pay_date >= cast(:date1 as date) and pay_date < cast(:date2 as date)")
    Integer getByDateCount(String date1, String date2);
}
