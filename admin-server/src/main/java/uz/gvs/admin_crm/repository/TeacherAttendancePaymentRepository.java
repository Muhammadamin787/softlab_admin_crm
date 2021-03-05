package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.TeacherAttendancePayment;

import java.util.UUID;

public interface TeacherAttendancePaymentRepository extends JpaRepository<TeacherAttendancePayment, UUID> {
}
