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

    @Query(nativeQuery = true, value = "select * from client")
    List<Client> getClientByFilterStatusToplam(String enumType, Integer id, int page, int size);

    @Query(nativeQuery = true, value = "select * from client")
    List<Client> getClientByFilterStatus(String enumType, Integer id, int page, int size);

//    @Query(nativeQuery = true, value = "select cast(cl.id as varchar) as tr, cl.full_name as fish, cl.phone_number as tel, cs.name from client cl where cl.id=ANY(select csc.client_id from client_status_connect csc where (cast(csc.status_id as integer))=ANY(select cs.id from client_status cs where (cast(cs.client_status_enum as varchar ))=(cast(:enumtype as varchar )))) order by cl.updated_at desc limit :size offset (:size*:page)")

    @Query(nativeQuery = true, value = "select cast(cl.id as varchar) as client_id, cl.full_name as fish, cl.phone_number as tel, " +
            "       cs.id as status_id, cs.name as status_name, cs.client_status_enum as enum_type " +
            "from client cl " +
            "         inner join client_status_connect csc on cl.id = csc.client_id " +
            "         inner join client_status cs on cast(csc.status_id as integer) = cs.id " +
            "where (cast(cs.client_status_enum as varchar)) = (cast(:enumtype as varchar)) " +
            "order by cl.updated_at desc " +
            "limit :size offset (:size * :page)")
    List<Object> getClientByFilterEnumType(String enumtype, int page, int size);

    @Query(nativeQuery = true, value = "select count(*) as soni " +
            "from client cl " +
            "         inner join client_status_connect csc on cl.id = csc.client_id " +
            "         inner join client_status cs on cast(csc.status_id as integer) = cs.id " +
            "where (cast(cs.client_status_enum as varchar)) = (cast(:enumtype as varchar)) ")
    Integer getCountByEnumType(String enumtype);

}
