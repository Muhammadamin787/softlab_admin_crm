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

    @Query(nativeQuery = true, value = "select cast(cl.id as varchar), ca.status_enum, cs.name, cast(cs.id as varchar), ca.updated_at, cast(ca.id as varchar) " +
            " from client cl" +
            " inner join client_appeal ca on cl.id = ca.client_id" +
            " inner join client_status cs on cs.id = cast(ca.status_id as integer)" +
            " where cl.id=:mijoz_id and ca.status_enum!='SET' order by ca.updated_at")
    List<Object> getClientAppealList(UUID mijoz_id);

    @Query(nativeQuery = true, value = "select cast(cl.id as varchar), ca.status_enum, cs.name, cast(cs.id as varchar), ca.updated_at, cast(ca.id as varchar) " +
            " from client cl" +
            " inner join client_appeal ca on cl.id = ca.client_id" +
            " inner join client_status cs on cs.id = cast(ca.status_id as integer)" +
            " where cl.id=:mijoz_id and ca.status_enum!='SET' order by ca.updated_at")
    List<Object> getClientAppealListByToplam(UUID mijoz_id);
}
