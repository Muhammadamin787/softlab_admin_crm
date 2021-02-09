package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.Group;

import java.util.UUID;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    boolean existsByTeacher_Id(UUID teacher_id);

    boolean existsByNameEqualsIgnoreCaseAndCourseId(String name, Integer id);
    boolean existsByNameEqualsIgnoreCaseAndCourseIdAndIdNot(String name, Integer course_id, Integer id);
}
