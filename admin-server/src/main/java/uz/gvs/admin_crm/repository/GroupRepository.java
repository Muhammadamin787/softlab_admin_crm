package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.Group;
import uz.gvs.admin_crm.entity.Room;

import java.util.UUID;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    boolean existsByTeacher_Id(UUID teacher_id);
}
