package uz.gvs.admin_crm.repository;


import antlr.collections.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uz.gvs.admin_crm.entity.StudentPayment;

import java.util.UUID;

public interface StudentPaymentRepository extends JpaRepository<StudentPayment, UUID>{
    Page<StudentPayment> findAllByStudent_id(UUID student_id, Pageable pageable);

}
