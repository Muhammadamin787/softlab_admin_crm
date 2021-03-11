package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.Client;
import uz.gvs.admin_crm.entity.ClientStatusConnect;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClientStatusConnectRepository extends JpaRepository<ClientStatusConnect, UUID> {
    Optional<ClientStatusConnect> findByClient_id(UUID client_id);

    @Query(nativeQuery = true, value = "select cast(c.id as varchar), c.full_name, c.phone_number, c.gender, c.age, c.description, r.id as hudud_id, r.name as hudud_nomi, r2.id as reklama_raqami,r2.name as reklama_nomi, (case when csc.toplam is true then (select t.name from toplam t where t.id=(cast(csc.status_id as integer))) else (select cs.name from client_status cs where cs.id=(cast(csc.status_id as integer))) end) as mijoz_status_nommi, csc.status_id as status_raqami, (case when csc.toplam then 'COLLECTION' else (select cs.client_status_enum from client_status cs where cs.id=(cast(csc.status_id as integer))) end) as status_enum_nomi from client c inner join client_status_connect csc on c.id = csc.client_id inner join region r on r.id = c.region_id inner join reklama r2 on r2.id = c.reklama_id where c.id=:mijoz_id")
    List<Object> getClientStatusConnectForEdit(UUID mijoz_id);

}
