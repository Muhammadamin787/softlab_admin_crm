package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.entity.Toplam;

import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, UUID> {
}
