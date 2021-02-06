package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.PayType;
import uz.gvs.admin_crm.entity.Region;

public interface RegionRepository extends JpaRepository<Region, Integer> {
}
