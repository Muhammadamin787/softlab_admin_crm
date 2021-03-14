package uz.gvs.admin_crm.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.entity.StudentPayment;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface StudentPaymentRepository extends JpaRepository<StudentPayment, UUID> {
    Page<StudentPayment> findAllByStudent_id(UUID student_id, Pageable pageable);

    @Query(nativeQuery = true, value = "select * from student_payment sp where sp.cashback_id is not null order by sp.created_at desc limit :size offset (:size * :page)")
    List<StudentPayment> getStudentPaymentByCashback(int page, int size);

    @Query(nativeQuery = true, value = "select count(*) from student_payment sp where sp.cashback_id is not null")
    Integer getStudentPaymentByCashbackCount();


    @Query(nativeQuery = true, value = "select * from student_payment where pay_date >= :date1 and pay_date < :date2 order by sp.created_at desc limit :size offset (:size * :page)")
    List<StudentPayment> getByDate(Date date1, Date date2, int size, int page);

    @Query(nativeQuery = true, value = "select * from student_payment where pay_date >= :date1 and pay_date < :date2 and cashback_id is not null order by sp.created_at desc limit :size offset (:size * :page)")
    List<StudentPayment> getByDateAndCashback(Date date1, Date date2, int size, int page);

    @Query(nativeQuery = true, value = "select count(*) from student_payment where pay_date >= :date1 and pay_date < :date2 and cashback_id is not null")
    Integer getByDateAndCashbackCount(Date date1, Date date2);

    @Query(nativeQuery = true, value = "select count(*) from student_payment where pay_date >= :date1 and pay_date < :date2")
    Integer getStudentPaymentByDateCount(Date date1, Date date2);

//    @Query(nativeQuery = true, value = "select count(*) from student_payment where pay_date >= :date1 and pay_date < :date2 ")
//    Integer getByDateCount(Date date1, Date date2);
}
