package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.Region;
import uz.gvs.admin_crm.entity.Toplam;

import java.util.UUID;

public interface ToplamRepository extends JpaRepository<Toplam, Integer> {
}
