package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.Client;
import uz.gvs.admin_crm.entity.Course;

import java.util.UUID;

public interface ClientRepository extends JpaRepository<Client, UUID> {

}
