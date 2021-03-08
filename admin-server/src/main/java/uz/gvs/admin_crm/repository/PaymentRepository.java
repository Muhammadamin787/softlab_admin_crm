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

    @Query(nativeQuery = true, value = "select * from payment pt where pt.attendance_id = ANY(select att.id from attendance att where att.attend_date  >= :date1) and pt.attendance_id = ANY(select att.id from attendance att where att.attend_date  < :date2)")
    Page<Payment> getByDate(Date date1, Date date2, Pageable pageable);
}
