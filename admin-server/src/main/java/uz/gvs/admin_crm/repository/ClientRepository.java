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
            "    (select count(*) from client_appeal ca where ca.status_enum='REQUEST') as sorov_soni, " +
            "    (select count(*) from client_appeal ca where ca.status_enum='WAITING' and ca.client_id=(select csc.client_id from client_status_connect csc where ca.client_id=csc.client_id and (csc.toplam=false and cast(csc.status_id as integer)=(select cs.id from client_status cs where  cast(csc.status_id as integer)=cs.id and cs.client_status_enum<>'REQUEST') or csc.toplam=true and cast(csc.status_id as integer)=(select tl.id  from toplam tl where cast(csc.status_id as integer)=tl.id)))) as kutish_soni,    (select count(*) from client_appeal ca where ca.status_enum='COLLECTION' and ca.client_id=(select csc.client_id from client_status_connect csc where ca.client_id=csc.client_id and csc.toplam=true)) as toplam_soni, " +
            "    (select count(*) from student) as guruh_student, " +
            "    (select count(*) from student inner join student_payment sp on student.id = sp.student_id group by student_id limit 1) as tolov, " +
            "    (select count(*) from client_status cs where cs.id=(select cast(c.status_id as integer) from client_status_connect c where cs.id = cast(c.status_id as integer) and c.toplam=false group by c.status_id limit 1)) as faol_lid, " +
            "    (select count(*) from student st where st.id = (select ssg.student_id from student_student_group ssg where st.id=ssg.student_id and ssg.student_group_id =(select sg.id from student_group sg where sg.id=ssg.student_group_id and sg.student_group_status='ACTIVE' group by sg.id limit 1) group by ssg.student_id limit 1)) as active_student, " +
            "    (select count(*) from groups where start_date<=now() and finish_date>=now()) as active_group, " +
            "    (select count(*) from student where balans<0) as debtor_students")
    List<Object> getStatForFunnel();

    @Query(nativeQuery = true, value = "select to_char(cast(st.created_at as date), 'dd-mm-yyyy') as vaqt, count(*) as barcha, sum(case when st.id=(select ssg.student_id from student_student_group ssg where ssg.student_id=st.id limit 1) then 1 else 0 end)  as faol from student st where st.created_at is not null group by vaqt order by vaqt")
    List<Object> getStudentStat();


}
