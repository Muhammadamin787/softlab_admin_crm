package uz.gvs.admin_crm.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.StudentAttendancePayment;

import java.util.UUID;

public interface StudentAttendancePaymentRepository extends JpaRepository<StudentAttendancePayment, UUID> {
}
