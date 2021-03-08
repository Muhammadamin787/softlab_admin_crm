package uz.gvs.admin_crm.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    @Autowired
    DashboardService dashboardService;

    @GetMapping("/stat")
    public HttpEntity<?> getFunnelStat() {
        ApiResponse apiResponse = dashboardService.getStatForFunnel();
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/student")
    public HttpEntity<?> getStudentStat() {
        ApiResponse apiResponse = dashboardService.getStudentStat();
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }
}
