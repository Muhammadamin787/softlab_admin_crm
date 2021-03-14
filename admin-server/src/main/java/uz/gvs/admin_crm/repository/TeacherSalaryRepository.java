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

    @Query(nativeQuery = true, value = "select * from student_payment where pay_date >= :date1 and pay_date < :date2 order by sp.created_at desc limit :size offset (:size * :page)")
    List<TeacherSalary> getByDate(Date date1, Date date2, int page, int size);

    @Query(nativeQuery = true, value = "select * from student_payment where pay_date >= :date1 and pay_date < :date2")
    Integer getByDateCount(Date date1, Date date2);
}
