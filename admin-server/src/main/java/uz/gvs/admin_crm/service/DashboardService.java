package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.enums.ClientStatusEnum;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.AppealDto;
import uz.gvs.admin_crm.payload.DashboardDto;
import uz.gvs.admin_crm.repository.ClientRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class DashboardService {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    ClientRepository clientRepository;

    public ApiResponse getStatForFunnel() {
        try {
            List<Object> objects = clientRepository.getStatForFunnel();
            List<DashboardDto> dashboardDtos = new ArrayList<>();
            for (Object obj : objects) {
                Object[] client = (Object[]) obj;
                //dashboard funnel
                Integer requestCount = Integer.valueOf(client[0].toString());
                dashboardDtos.add(new DashboardDto("So'rov", requestCount));
                Integer waitingCount = Integer.valueOf(client[1].toString());
                dashboardDtos.add(new DashboardDto("Kutish", waitingCount));
                Integer setCount = Integer.valueOf(client[2].toString());
                dashboardDtos.add(new DashboardDto("To'plam", setCount));
                Integer groupCount = Integer.valueOf(client[3].toString());
                dashboardDtos.add(new DashboardDto("Guruhda", groupCount));
                Integer payCount = Integer.valueOf(client[4].toString());
                dashboardDtos.add(new DashboardDto("To'langan", payCount));
                // dashboard card
                Integer activeLid = Integer.valueOf(client[5].toString());
                dashboardDtos.add(new DashboardDto("Faol lidlar", activeLid));
                Integer activeStudent = Integer.valueOf(client[6].toString());
                dashboardDtos.add(new DashboardDto("Faol talabalar", activeStudent));
                Integer activeGroup = Integer.valueOf(client[7].toString());
                dashboardDtos.add(new DashboardDto("Faol guruhlar", activeGroup));
                Integer debtorStudent = Integer.valueOf(client[8].toString());
                dashboardDtos.add(new DashboardDto("Qarzdorlar", debtorStudent));
            }
            return apiResponseService.getResponse(dashboardDtos);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getStudentStat() {
        try {
            List<Object> objects = clientRepository.getStudentStat();
            List<DashboardDto> dashboardDtos = new ArrayList<>();
            int allCount = 0;
            int faolCount = 0;
            for (Object obj : objects) {
                Object[] client = (Object[]) obj;
                String vaqt = client[0].toString();
                allCount += Integer.parseInt(client[1].toString());
                faolCount += Integer.parseInt(client[2].toString());
                dashboardDtos.add(new DashboardDto(vaqt, allCount, faolCount));
            }
            return apiResponseService.getResponse(dashboardDtos);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }
}

