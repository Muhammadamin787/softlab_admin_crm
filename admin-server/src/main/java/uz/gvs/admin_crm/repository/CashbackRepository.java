package uz.gvs.admin_crm.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.Cashback;

public interface CashbackRepository extends JpaRepository<Cashback, Integer> {
    boolean existsByPriceEquals(double price);
}
