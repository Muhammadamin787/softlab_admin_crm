package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.Group;
import uz.gvs.admin_crm.entity.Room;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    boolean existsByNameEqualsIgnoreCaseAndCourse_id(String name, Integer course_id);

}
