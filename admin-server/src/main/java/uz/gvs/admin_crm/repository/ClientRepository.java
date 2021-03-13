package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.Client;
import uz.gvs.admin_crm.entity.Course;
import uz.gvs.admin_crm.payload.AppealDto;

import java.util.List;
import java.util.UUID;

public interface ClientRepository extends JpaRepository<Client, UUID> {

    boolean existsByFullNameEqualsIgnoreCaseAndIdNot(String fullName, UUID id);

    boolean existsByPhoneNumber(String phoneNumber);

    boolean existsById(UUID client_id);

    @Query(nativeQuery = true, value = "select cast(cl.id as varchar) as client_id, cl.full_name as fish, cl.phone_number as tel, " +
            "       t.id as status_id, t.name as status_name " +
            "from client cl " +
            "         inner join client_status_connect csc on cl.id = csc.client_id " +
            "         inner join toplam t on cast(csc.status_id as integer) = t.id " +
            "where csc.toplam is true " +
            "order by cl.updated_at desc " +
            "limit :size offset (:size * :page)")
    List<Object> getClientByFilterEnumSet(int page, int size);

    @Query(nativeQuery = true, value = "select cast(cl.id as varchar) as client_id, cl.full_name as fish, cl.phone_number as tel, " +
            "       t.id as status_id, t.name as status_name " +
            "from client cl " +
            "         inner join client_status_connect csc on cl.id = csc.client_id " +
            "         inner join toplam t on cast(csc.status_id as integer) = t.id " +
            "where t.id=:toplam_id and csc.toplam is true " +
            "order by cl.updated_at desc " +
            "limit :size offset (:size * :page)")
    List<Object> getClientByFilterToplamStatus(Integer toplam_id, int page, int size);


//    @Query(nativeQuery = true, value = "select cast(cl.id as varchar) as tr, cl.full_name as fish, cl.phone_number as tel, cs.name from client cl where cl.id=ANY(select csc.client_id from client_status_connect csc where (cast(csc.status_id as integer))=ANY(select cs.id from client_status cs where (cast(cs.client_status_enum as varchar ))=(cast(:enumtype as varchar )))) order by cl.updated_at desc limit :size offset (:size*:page)")

    @Query(nativeQuery = true, value = "select cast(cl.id as varchar) as client_id, cl.full_name as fish, cl.phone_number as tel, " +
            "       cs.id as status_id, cs.name as status_name, cs.client_status_enum as enum_type " +
            "from client cl " +
            "         inner join client_status_connect csc on cl.id = csc.client_id " +
            "         inner join client_status cs on cast(csc.status_id as integer) = cs.id " +
            "where csc.toplam is not true and (cast(cs.client_status_enum as varchar)) = (cast(:enumtype as varchar)) " +
            "order by cl.updated_at desc " +
            "limit :size offset (:size * :page)")
    List<Object> getClientByFilterEnumType(String enumtype, int page, int size);

    @Query(nativeQuery = true, value = "select cast(cl.id as varchar) as client_id, cl.full_name as fish, cl.phone_number as tel, " +
            "       cs.id as status_id, cs.name as status_name, cs.client_status_enum as enum_type " +
            "from client cl " +
            "         inner join client_status_connect csc on cl.id = csc.client_id " +
            "         inner join client_status cs on cast(csc.status_id as integer) = cs.id " +
            " where csc.toplam is not true and cs.id=:status_tr and (cast(cs.client_status_enum as varchar)) = (cast(:enumtype as varchar)) " +
            "order by cl.updated_at desc " +
            "limit :size offset (:size * :page)")
    List<Object> getClientByFilterStatus(String enumtype, Integer status_tr, int page, int size);

    @Query(nativeQuery = true, value = "select count(*) as soni " +
            "from client cl " +
            "         inner join client_status_connect csc on cl.id = csc.client_id " +
            "         inner join client_status cs on cast(csc.status_id as integer) = cs.id " +
            "where (cast(cs.client_status_enum as varchar)) = (cast(:enumtype as varchar)) ")
    Integer getCountByEnumType(String enumtype);

    @Query(nativeQuery = true, value = "select count(*) as soni " +
            "from client cl " +
            "         inner join client_status_connect csc on cl.id = csc.client_id " +
            "         inner join client_status cs on cast(csc.status_id as integer) = cs.id " +
            "where cs.id=:status_tr and(cast(cs.client_status_enum as varchar)) = (cast(:enumtype as varchar)) ")
    Integer getCountByStatusType(String enumtype, Integer status_tr);

    @Query(nativeQuery = true, value = "select count(*) as soni " +
            "from client cl " +
            "         inner join client_status_connect csc on cl.id = csc.client_id " +
            "         inner join toplam t on cast(csc.status_id as integer) = t.id " +
            "where csc.toplam is true")
    Integer getCountByEnumSet();

    @Query(nativeQuery = true, value = "select count(*) as soni " +
            "from client cl " +
            "         inner join client_status_connect csc on cl.id = csc.client_id " +
            "         inner join toplam t on cast(csc.status_id as integer) = t.id " +
            "where csc.toplam is true and t.id=:toplam_id")
    Integer getCountByStatusToplam(Integer toplam_id);


    // GET ONE APPEAL FOR SELECT APPEAL PAGE
    @Query(nativeQuery = true, value = " select cast(cl.id as varchar) as client_id, cl.full_name as fish, cl.phone_number as tel, " +
            "       cs.id as status_id, cs.name as status_name, cs.client_status_enum as enum_type, cast(cl.created_at as datetime) as kelgan_vaqti " +
            "from client cl " +
            "         inner join client_status_connect csc on cl.id = csc.client_id " +
            "         inner join client_status cs on cast(csc.status_id as integer) = cs.id " +
            " where cl.id =:clientId ")
    List<Object> getOneClientByFilterEnumType(UUID clientId);

    @Query(nativeQuery = true, value = "select * from client_appeal where client_id=:client_id")
    List<Object> getClientAppealHistoryList(UUID client_id);


    @Query(nativeQuery = true, value = "select " +
            "    COALESCE((select count(*) from client_appeal ca where ca.status_enum='REQUEST'),0) as sorov_soni, " +
            "    COALESCE((select count(*) from client_appeal ca where ca.status_enum='WAITING' and ca.client_id=(select csc.client_id from client_status_connect csc where ca.client_id=csc.client_id and (csc.toplam=false and cast(csc.status_id as integer)=(select cs.id from client_status cs where  cast(csc.status_id as integer)=cs.id and cs.client_status_enum<>'REQUEST') or csc.toplam=true and cast(csc.status_id as integer)=(select tl.id  from toplam tl where cast(csc.status_id as integer)=tl.id)))),0) as kutish_soni,    COALESCE((select count(*) from client_appeal ca where ca.status_enum='COLLECTION' and ca.client_id=(select csc.client_id from client_status_connect csc where ca.client_id=csc.client_id and csc.toplam=true)),0) as toplam_soni, " +
            "    COALESCE((select count(*) from student),0) as guruh_student, " +
            "    COALESCE((select count(*) from student inner join student_payment sp on student.id = sp.student_id group by student_id limit 1),0) as tolov, " +
            "    COALESCE((select count(*) from client_status cs where cs.id=(select cast(c.status_id as integer) from client_status_connect c where cs.id = cast(c.status_id as integer) and c.toplam=false group by c.status_id limit 1)),0) as faol_lid, " +
            "    COALESCE((select count(*) from student st where st.id = (select ssg.student_id from student_student_group ssg where st.id=ssg.student_id and ssg.student_group_id =(select sg.id from student_group sg where sg.id=ssg.student_group_id and sg.student_group_status='ACTIVE' group by sg.id limit 1) group by ssg.student_id limit 1)),0) as active_student, " +
            "    COALESCE((select count(*) from groups where start_date<=now() and finish_date>=now()),0) as active_group, " +
            "    COALESCE((select count(*) from student where balans<0),0) as debtor_students")
    List<Object> getStatForFunnel();

    @Query(nativeQuery = true, value = "select to_char(cast(st.created_at as date), 'dd-mm-yyyy') as vaqt, count(*) as barcha, sum(case when st.id=(select ssg.student_id from student_student_group ssg where ssg.student_id=st.id limit 1) then 1 else 0 end)  as faol from student st where st.created_at is not null group by vaqt order by vaqt")
    List<Object> getStudentStat();

    @Query(nativeQuery = true, value = "select (select count(*) from users u inner join student s on u.id = s.user_id where EXTRACT(YEAR FROM age(cast(now() as timestamp), cast(u.birth_date as timestamp)))<12) as yosh_12_kichik, (select count(*) from users u inner join student s on u.id = s.user_id where EXTRACT(YEAR FROM age(cast(now() as timestamp), cast(u.birth_date as timestamp)))>=12 and EXTRACT(YEAR FROM age(cast(now() as timestamp), cast(u.birth_date as timestamp)))<17) as yosh_12_17, (select count(*) from users u inner join student s on u.id = s.user_id where EXTRACT(YEAR FROM age(cast(now() as timestamp), cast(u.birth_date as timestamp)))>=17 and EXTRACT(YEAR FROM age(cast(now() as timestamp), cast(u.birth_date as timestamp)))<20) as yosh_17_20, (select count(*) from users u inner join student s on u.id = s.user_id where EXTRACT(YEAR FROM age(cast(now() as timestamp), cast(u.birth_date as timestamp)))>=20) as yosh_20")
    Object[] getStudentSortByAge();

    @Query(nativeQuery = true, value = "select count(*), u.gender from student st inner join users u on st.user_id=u.id where u.gender is not null group by u.gender")
    List<Object[]> getStudentSortByGender();

    @Query(nativeQuery = true, value = "select r.name, sum(case when r.id=(select cl.reklama_id from client cl where cl.reklama_id=r.id limit 1) then (select count(*)  from client cl where cl.reklama_id=r.id) else 0 end) as soni from reklama r  group by r.name")
    List<Object> getReklamaSortByClient();



}
