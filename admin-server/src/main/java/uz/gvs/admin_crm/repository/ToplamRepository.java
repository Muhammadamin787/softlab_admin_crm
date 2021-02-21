package uz.gvs.admin_crm.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.Region;
import uz.gvs.admin_crm.entity.Toplam;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ToplamRepository extends JpaRepository<Toplam, Integer> {
    List<Toplam> findAllByActive(boolean active, Pageable pageable);

    List<Toplam> findAllByActive(boolean active);

}
