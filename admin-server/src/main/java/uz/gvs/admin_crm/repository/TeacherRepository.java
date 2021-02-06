package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.entity.Teacher;

import java.util.UUID;

public interface TeacherRepository extends JpaRepository<Teacher, UUID> {
}
