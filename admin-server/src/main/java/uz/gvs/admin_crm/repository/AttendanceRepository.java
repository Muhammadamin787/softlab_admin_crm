package uz.gvs.admin_crm.repository;

import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import uz.gvs.admin_crm.entity.Attendance;
import uz.gvs.admin_crm.entity.Client;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AttendanceRepository extends JpaRepository<Attendance, UUID> {
    List<Attendance> findAllByGroup_id(Integer group_id);

    Optional<Attendance> findByGroup_IdAndTeacher_IdAndStudent_IdAndAttendDate(Integer group_id, UUID teacher_id, UUID student_id, Date attendDate);
}
