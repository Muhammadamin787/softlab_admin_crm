package uz.gvs.admin_crm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.Payment;
import uz.gvs.admin_crm.entity.StudentPayment;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {
//    @Query(nativeQuery = true, value = "select * from payment pt where pt.attendance_id = (select att.id from attendance att where att.attend_date )  >= :date1 and pt.attendance_id = (select att.id from attendance att where att.attend_date )  < :date2 " +
//            "limit :size offset (:size*:page)")
//    List<Payment> getByDate(Date date1, Date date2, int page, int size);

    @Query(nativeQuery = true, value = "select * from payment pt where pt.attendance_id = ANY(select att.id from attendance att where att.attend_date  >= cast(:date1 as date)) and pt.attendance_id = ANY(select att.id from attendance att where att.attend_date  < cast(:date2 as date)) order by pt.created_at desc limit :size offset (:size * :page)")
    List<Payment> getByDate(String date1, String date2, int size, int page);
    @Query(nativeQuery = true, value = "select count(*) from payment pt where pt.attendance_id = ANY(select att.id from attendance att where att.attend_date  >= cast(:date1 as date)) and pt.attendance_id = ANY(select att.id from attendance att where att.attend_date  < cast(:date2 as date))")
    Integer getByDateCount(String date1, String date2);
    @Query(nativeQuery = true, value = "select cast(p.id as varchar) from payment p where attendance_id=:attendanceId")
    String getPaymentIdForDelete(UUID attendanceId);
}
