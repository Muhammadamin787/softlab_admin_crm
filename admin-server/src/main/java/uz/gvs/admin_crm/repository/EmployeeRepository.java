package uz.gvs.admin_crm.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.Cashback;
import uz.gvs.admin_crm.entity.Employee;

import java.util.List;
import java.util.UUID;

public interface EmployeeRepository extends JpaRepository<Employee, UUID> {

    @Query(nativeQuery = true, value = "select cast(e.id as varchar) as id, u.full_name, u.phone_number, r2.role_name from employee e inner join users u on e.user_id=u.id inner join user_roles ur on u.id = ur.user_id inner join role r2 on ur.role_id = r2.id limit :size offset (:size * :page)")
    List<Object> getAllEmployees(int size, int page);

}