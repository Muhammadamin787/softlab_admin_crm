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
    @Query(nativeQuery = true, value = "select tr.id, ur.full_name from teacher tr inner join users ur on tr.user_id = ur.id" +
            " where LOWER(ur.full_name) like concat('%', :objName, '%') or ur.phone_number like concat('%', :objName, '%') limit 20")
    List<Object> searchTeacher(String objName);
    Page<Teacher> findAllByUser_status(UserStatusEnum user_status, Pageable pageable);

}
