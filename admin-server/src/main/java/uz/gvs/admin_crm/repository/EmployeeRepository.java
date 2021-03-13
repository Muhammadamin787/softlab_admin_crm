package uz.gvs.admin_crm.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.Cashback;
import uz.gvs.admin_crm.entity.Employee;

import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

}