package uz.gvs.admin_crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.gvs.admin_crm.repository.AttendanceRepository;

@RestController
@RequestMapping("/api/attandance")
public class AttendanceController {
    @Autowired
    AttendanceRepository attendanceRepository;
}
