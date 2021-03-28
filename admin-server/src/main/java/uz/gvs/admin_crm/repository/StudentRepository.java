package uz.gvs.admin_crm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.entity.Toplam;
import uz.gvs.admin_crm.entity.enums.UserStatusEnum;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    @Query(nativeQuery = true, value = "select * from student where balans < 0 " )
    Page<Student> getDebtorStudents(Pageable pageable);

    List<Student> findAllByStudentGroup_Group_id(Integer studentGroup_group_id);

    Page<Student> findAllByUser_status(UserStatusEnum user_status, Pageable pageable);

    boolean deleteByBalans(double balans);

    @Query(nativeQuery = true, value="select cast(s.id as varchar) from student s inner join users u on u.id = s.user_id where u.phone_number=:telefon_raqam")
    String getStudentId(String telefon_raqam);

    @Query(nativeQuery = true, value="select cast(u.id as varchar) from users u where u.phone_number=:telefon_raqam")
    String existsPhoneNumber(String telefon_raqam);

    @Query(nativeQuery = true, value = "select cast(st.id as varchar ),concat(ur.full_name, ' / ', ur.phone_number) from student st inner join users ur on st.user_id = ur.id where (case when length(coalesce((select cast(ssg.student_group_id as varchar) from student_student_group ssg where ssg.student_id=st.id),''))>0 then :guruh_id<>any(select sg.group_id from student_group sg where (select  ssg.student_group_id from student_student_group ssg where ssg.student_id=st.id)=sg.id) else true end) and  (LOWER(ur.full_name) like concat('%', :objName, '%') or ur.phone_number like concat('%', :objName, '%'))  limit 10")
    List<Object> searchStudent(String objName, Integer guruh_id);

    @Query(nativeQuery = true, value = "select cast(st.id as varchar), ur.full_name, ur.phone_number from student st inner join users ur on st.user_id = ur.id" +
            " where LOWER(ur.full_name) like concat('%', :objName, '%') or ur.phone_number like concat('%', :objName, '%') limit 20")
    List<Object> searchAllStudent(String objName);
}
