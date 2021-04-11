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
import java.util.Optional;
import java.util.UUID;

public interface TeacherRepository extends JpaRepository<Teacher, UUID> {
    @Query(nativeQuery = true, value = "select cast(tr.id as varchar ), ur.full_name from teacher tr inner join users ur on tr.user_id = ur.id" +
            " where LOWER(ur.full_name) like concat('%', :objName, '%') or ur.phone_number like concat('%', :objName, '%') limit 20")
    List<Object> searchTeacher(String objName);

    Page<Teacher> findAllByUser_status(UserStatusEnum user_status, Pageable pageable);

    @Query(nativeQuery = true, value = "select cast(t.id as varchar), u.full_name, u.phone_number, u.birth_date, u.gender,t.balance, t.is_percent, coalesce(t.salary,0), u.description, " +
            "(case when u.region_id is not null then (select r.name from region r where r.id=u.region_id) else '' end) as hudud_nomi, " +
            " coalesce(u.region_id,0) as hudud_id from teacher t inner join users u on u.id = t.user_id " +
            "where t.id=:teacherId")
    List<Object> findTeacher(UUID teacherId);

    @Query(nativeQuery = true, value = "select cast(t.id as varchar), u.full_name, u.phone_number " +
            "from teacher t inner join users u on u.id = t.user_id " +
            "where u.status=:type " +
            "order by u.updated_at desc " +
            "limit :size offset (:size * :page)")
    List<Object> findTeacherPageable(int page, int size, String type);

    @Query(nativeQuery = true, value = "select count(*) " +
            "from teacher t inner join users u on u.id = t.user_id " +
            "where u.status=:type ")
    Integer findTeacherPageableCount(String type);



    @Query(nativeQuery = true, value = "select cast(tr.id as varchar), ur.full_name, ur.phone_number from teacher tr inner join users ur on tr.user_id = ur.id" +
            " where LOWER(ur.full_name) like concat('%', :objName, '%') or ur.phone_number like concat('%', :objName, '%') limit 20")
    List<Object> searchAllTeacher(String objName);


}
