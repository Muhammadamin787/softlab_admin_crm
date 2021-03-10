package uz.gvs.admin_crm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.entity.Teacher;
import uz.gvs.admin_crm.entity.enums.UserStatusEnum;
import uz.gvs.admin_crm.payload.ResSelect;

import java.util.List;
import java.util.UUID;

public interface TeacherRepository extends JpaRepository<Teacher, UUID> {
    Page<Teacher> findAllByUser_status(UserStatusEnum user_status, Pageable pageable);
//    @Query(nativeQuery = true, value = "select u.full_name, t.id from teacher t inner join users u on t.user_id = u.id")
//    List<Object[]> getTeacherForSelect(       );

}
