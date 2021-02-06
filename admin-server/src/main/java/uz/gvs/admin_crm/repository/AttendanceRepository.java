package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.Attendance;
import uz.gvs.admin_crm.entity.Client;

import java.util.UUID;

public interface AttendanceRepository extends JpaRepository<Attendance, UUID> {

}
