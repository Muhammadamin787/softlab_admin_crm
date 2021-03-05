package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.TeacherPayment;

import java.util.UUID;

public interface TeacherPaymentRepository extends JpaRepository<TeacherPayment, UUID> {
}
