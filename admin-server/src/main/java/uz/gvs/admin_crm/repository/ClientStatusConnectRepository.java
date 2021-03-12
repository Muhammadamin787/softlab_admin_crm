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

    @Query(nativeQuery = true, value = "select cast(c.id as varchar), c.full_name, c.phone_number, c.gender,(case when birth_date is not null then (cast(c.birth_date as varchar)) else '' end) as tugilgan_kun, c.description, (case when c.region_id is not null then (select r.id from region r where r.id=c.region_id) else 0 end) as hudud_id, (case when c.region_id is not null then (select r.name from region r where r.id=c.region_id) else '' end) as hudud_nomi, (case when c.reklama_id is not null then (select r.id from reklama r where r.id=c.reklama_id) else 0 end) as reklama_raqami, (case when c.reklama_id is not null then (select r.name from reklama r where r.id=c.reklama_id) else '' end) as reklama_nomi, (case when csc.toplam is true then (select t.name from toplam t where t.id=(cast(csc.status_id as integer))) else (select cs.name from client_status cs where cs.id=(cast(csc.status_id as integer))) end) as mijoz_status_nommi, csc.status_id as status_raqami, (case when csc.toplam then 'COLLECTION' else (select cs.client_status_enum from client_status cs where cs.id=(cast(csc.status_id as integer))) end) as status_enum_nomi from client c inner join client_status_connect csc on c.id = csc.client_id where c.id=:mijoz_id")
    List<Object> getClientStatusConnectForEdit(UUID mijoz_id);

    void deleteByClient_id(UUID client_id);

}
