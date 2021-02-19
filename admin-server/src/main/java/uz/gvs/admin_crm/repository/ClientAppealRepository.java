package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.ClientAppeal;

import java.util.UUID;

public interface ClientAppealRepository extends JpaRepository<ClientAppeal, UUID> {
}
