package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.ClientAppeal;
import uz.gvs.admin_crm.entity.enums.ClientStatusEnum;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClientAppealRepository extends JpaRepository<ClientAppeal, UUID> {
    Optional<ClientAppeal> findByClient_idAndStatusEnum(UUID client_id, ClientStatusEnum statusEnum);

    List<ClientAppeal> findAllByClient_id(UUID client_id);

    @Query(nativeQuery = true, value = "select cast(cl.id as varchar) as client_id, cast(ca.status_enum as varchar) as status_enum,  " +
            "cs.name as status_nomi, cast(cs.id as varchar) as status_id, cast(ca.updated_at as varchar) as vaqt, cast(ca.id as varchar) as tarix_id" +
            " from client cl" +
            " inner join client_appeal ca on cl.id = ca.client_id" +
            " inner join client_status cs on cast(ca.status_id as integer) = cs.id" +
            " where cl.id=:mijoz and ca.status_enum!='COLLECTION'")
    List<Object> getClientAppealList(UUID mijoz);

    @Query(nativeQuery = true, value = "select cast(cl.id as varchar) as client_id, cast(ca.status_enum as varchar) as status_enum," +
            " t.name as toplam_nomi, cast(t.id as varchar) as toplam_id, " +
            "cast(ca.updated_at as varchar) as vaqt, cast(ca.id as varchar) as tarix_id " +
            "from client cl " +
            "inner join client_appeal ca on cl.id = ca.client_id " +
            "inner join toplam t on cast(ca.status_id as integer)=t.id " +
            "where cl.id=:mijoz and ca.status_enum='COLLECTION'")
    List<Object> getClientAppealListByToplam(UUID mijoz);


    @Query(nativeQuery = true, value = "select cs.id as holat_id, cs.name holat_nomi, c.full_name mijoz_ismi, c.phone_number mijoz_tel, cast(c.id as varchar) mijoz_id, cs.client_status_enum mijoz_holati from client c inner join client_status_connect csc on c.id = csc.client_id inner join client_status cs on cast(csc.status_id as integer) = cs.id where csc.toplam=false and client_status_enum is not null and client_status_enum=:client_holati_enum group by cs.name, c.id, c.full_name, cs.id order by cs.id")
    List<Object> getClientAppealsListByAppealType(String client_holati_enum);

    @Query(nativeQuery = true, value = "select cs2.id tartib_raqami, cs2.name as status_nomi from client_status cs2 where cs2.client_status_enum=:client_holati_enum and not(cs2.id = any(select cs.id as holat_id from client c inner join client_status_connect csc on c.id = csc.client_id inner join client_status cs on cast(csc.status_id as integer) = cs.id where client_status_enum is not null and client_status_enum=:client_holati_enum group by cs.name, c.id, c.full_name, cs.id order by cs.id))")
    List<Object> getClientAppealsListByOtherAppealType(String client_holati_enum);

    @Query(nativeQuery = true, value = "select  t.id, concat(t.name,' • ', (select cr.name from course cr where t.course_id=cr.id),' • ', (select u.full_name from teacher tch inner join users u on u.id = tch.user_id where t.teacher_id=tch.id),' • ', t.time) as t_nomi, c.full_name as mijoz_ismi, c.phone_number as tel, cast(c.id as varchar) as mijoz_id from client c inner join client_status_connect csc on c.id = csc.client_id inner join toplam t on t.id=cast(csc.status_id as integer) where csc.toplam=true")
    List<Object> getClientAppealsListByAppealToplam();

    @Query(nativeQuery = true, value = "select t2.id,  concat(t2.name,' • ', (select cr.name from course cr where t2.course_id=cr.id),' • ', (select u.full_name from teacher tch inner join users u on u.id = tch.user_id where t2.teacher_id=tch.id),' • ', t2.time) as t_nomi from toplam t2 where not(t2.id = any(select  t.id from client c inner join client_status_connect csc on c.id = csc.client_id inner join toplam t on t.id=cast(csc.status_id as integer) where csc.toplam=true))")
    List<Object> getClientAppealsListByAppealOtherToplam();
}
