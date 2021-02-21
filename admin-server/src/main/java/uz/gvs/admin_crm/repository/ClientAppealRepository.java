package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.ClientAppeal;
import uz.gvs.admin_crm.entity.enums.ClientStatusEnum;

import java.util.Optional;
import java.util.UUID;

public interface ClientAppealRepository extends JpaRepository<ClientAppeal, UUID> {
    Optional<ClientAppeal> findByClient_idAndStatusEnum(UUID client_id, ClientStatusEnum statusEnum);
}
