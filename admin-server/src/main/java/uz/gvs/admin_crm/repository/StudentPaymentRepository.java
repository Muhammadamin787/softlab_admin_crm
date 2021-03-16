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

    @Query(nativeQuery = true, value = "select * from student_payment sp where sp.pay_date >= :date1 and sp.pay_date < :date2 order by sp.created_at desc limit :size offset (:size * :page)")
    List<StudentPayment> getByDate(Date date1, Date date2, int size, int page);

    @Query(nativeQuery = true, value = "select * from student_payment sp where sp.pay_date >= :date1 and sp.pay_date < :date2 and sp.cashback_id is not null order by sp.created_at desc limit :size offset (:size * :page)")
    List<StudentPayment> getByDateAndCashback(Date date1, Date date2, int size, int page);

    @Query(nativeQuery = true, value = "select count(*) from student_payment where pay_date >= :date1 and pay_date < :date2 and cashback_id is not null")
    Integer getByDateAndCashbackCount(Date date1, Date date2);

    @Query(nativeQuery = true, value = "select count(*) from student_payment where pay_date >= :date1 and pay_date < :date2")
    Integer getStudentPaymentByDateCount(Date date1, Date date2);

//    @Query(nativeQuery = true, value = "select count(*) from student_payment where pay_date >= :date1 and pay_date < :date2 ")
//    Integer getByDateCount(Date date1, Date date2);

    @Query(nativeQuery = true, value = "select concat(u.full_name,' / ',u.phone_number) as student, sp.sum as tolov, sp.cash_sum as kashbeck, (sp.sum+sp.cash_sum) as barcha, cast(TO_CHAR(cast(sp.pay_date as date), 'yyyy-MM-dd hh:mi') as varchar) as vaqt,cast(TO_CHAR(cast(sp.pay_date as date), 'yyyy-MM-dd') as varchar) as date_vaqt, pt.name as tolov_usuli, concat(g.name,' • ', c.name) as guruh  from student_payment sp inner join student s on s.id = sp.student_id inner join groups g on g.id = sp.group_id inner join course c on c.id=g.course_id inner join users u on u.id = s.user_id inner join pay_type pt on pt.id = sp.pay_type_id where sp.pay_date between cast(:start_vaqt as date) and cast(:finish_vaqt as date) order by sp.pay_date")
    List<Object> getStudentPaymentForExcel(String start_vaqt, String finish_vaqt);
}
