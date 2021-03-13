package uz.gvs.admin_crm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.Course;
import uz.gvs.admin_crm.entity.Group;
import uz.gvs.admin_crm.entity.Room;
import uz.gvs.admin_crm.entity.Student;
import uz.gvs.admin_crm.entity.enums.GroupStatus;
import uz.gvs.admin_crm.entity.enums.UserStatusEnum;
import uz.gvs.admin_crm.entity.enums.WeekdayName;

import java.util.List;
import java.util.UUID;

public interface GroupRepository extends JpaRepository<Group, Integer> {
    boolean existsByTeacher_Id(UUID teacher_id);

    List<Group> findAllByTeacher_id(UUID teacher_id);

    boolean existsByNameEqualsIgnoreCaseAndCourseId(String name, Integer id);

    boolean existsByNameEqualsIgnoreCaseAndCourseIdAndIdNot(String name, Integer course_id, Integer id);

    @Query(nativeQuery = true, value = "select * from groups where id=ANY(select group_id from student_group where id=ANY(select student_group_id from student_student_group where student_id=:ketmon))")
    List<Group> getStudentGroupList(UUID ketmon);

    @Query(nativeQuery = true, value = "select * from groups gr where gr.active = true and gr.group_status = 'ACTIVE'  and gr.id =(select gw.group_id from group_weekdays gw where gr.id=gw.group_id and gw.weekday_id = (select wd.id from weekday wd where wd.weekday_name =:week))")
    List<Group> findAllGroups(String week);

    @Query(nativeQuery = true, value = "select * from groups gr where gr.active = true and gr.group_status = 'ACTIVE'")
    List<Group> findAllGroups1();


    @Query(nativeQuery = true, value = "select * from groups gr where gr.course_id = (select id from course cr where cr.id=:courseId)")
    List<Group> findGroupByCource(Integer courseId);

    @Query(nativeQuery = true, value = "select gr.id, gr.name as guruh_nomi, gr.start_date as start_muddat, gr.finish_date as finish_muddat, gr.start_time as start_vaqt, gr.finish_time as finish_vaqt,  c.name as kurs,r.id as xona_id, r.name as xona, u.full_name as oqituvchi, (select count(*) from student st inner join student_student_group ssg on st.id = ssg.student_id inner join student_group sg on sg.id = ssg.student_group_id where sg.group_id=gr.id and sg.student_group_status='ACTIVE') as studentCount from groups gr inner join course c on c.id = gr.course_id inner join room r on r.id = gr.room_id inner join teacher t on t.id = gr.teacher_id inner join users u on u.id = t.user_id where gr.id =(select gw.group_id from group_weekdays gw where gr.id=gw.group_id and gw.weekday_id = (select wd.id from weekday wd where wd.weekday_name =:week))")
    List<Object> getGroupsByWeekDay(String week);

    @Query(nativeQuery = true, value = "select count(*) student from groups gr where gr.id = " +
            "(select id from student_student_group ssg where  ssg.student_group_id=:groupId)")
    Integer countStudent(Integer groupId);

    @Query(nativeQuery = true, value = "select gr.id, gr.name from groups gr" +
            " where LOWER(gr.name) like LOWER(concat('%', :objName, '%')) limit 10")
    List<Object> searchGroup(String objName);

    Page<Group> findAllByGroupStatus(GroupStatus status, Pageable pageable);
}
//