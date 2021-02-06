package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.ClientStatus;
import uz.gvs.admin_crm.entity.Group;

public interface ClientStatusRepository extends JpaRepository<ClientStatus, Integer> {

}
