package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import uz.gvs.admin_crm.entity.Permission;
import uz.gvs.admin_crm.entity.WeekdayName;

import java.util.List;


public interface WeekdayNameRepository extends JpaRepository<WeekdayName, Integer> {
}
