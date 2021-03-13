package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.Dashboard2Dto;
import uz.gvs.admin_crm.payload.DashboardDto;
import uz.gvs.admin_crm.repository.ClientRepository;

import java.util.ArrayList;
import java.util.List;

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
//                Integer payCount = Integer.valueOf(client[4].toString());
                Object[] object2 = clientRepository.getTolovCountForFunnel();
                dashboardDtos.add(new DashboardDto("To'langan", object2.length));
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

    public List<DashboardDto> getStudentSortByCount() {
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
            return dashboardDtos;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public List<DashboardDto> getStudentStatByAge() {
        try {
            List<DashboardDto> dashboardDtos = new ArrayList<>();
            Object[] objects = clientRepository.getStudentSortByAge();
            Object[] client = (Object[]) objects[0];
            Integer count = Integer.valueOf(client[0].toString());
            dashboardDtos.add(new DashboardDto("12 yoshdan kichiklar", count));
            Integer count2 = Integer.valueOf(client[1].toString());
            dashboardDtos.add(new DashboardDto("12-17 yosh", count2));
            Integer count3 = Integer.valueOf(client[2].toString());
            dashboardDtos.add(new DashboardDto("17-20 yosh", count3));
            Integer count4 = Integer.valueOf(client[3].toString());
            dashboardDtos.add(new DashboardDto("20 yoshdan kattalar", count4));
            return dashboardDtos;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public List<DashboardDto> getStudentStatByGender() {
        try {
            List<DashboardDto> dashboardDtos = new ArrayList<>();
            List<Object[]> objects = clientRepository.getStudentSortByGender();
            for (Object[] client : objects) {
                Integer count = Integer.valueOf(client[0].toString());
                dashboardDtos.add(new DashboardDto(client[1].toString(), count));
            }

            return dashboardDtos;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public List<DashboardDto> getReklamaSortByClient() {
        try {
            List<Object> objects = clientRepository.getReklamaSortByClient();
            List<DashboardDto> dashboardDtos = new ArrayList<>();
            for (Object obj : objects) {
                Object[] client = (Object[]) obj;
                String nomi = client[0].toString();
                Integer count = Integer.valueOf(client[1].toString());
                dashboardDtos.add(new DashboardDto(nomi, count));
            }
            return dashboardDtos;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    public ApiResponse getStudentStat() {
        try {
            List<DashboardDto> studentStatByAge = getStudentStatByAge();
            List<DashboardDto> studentStatByGender = getStudentStatByGender();
            List<DashboardDto> studentSortByCount = getStudentSortByCount();
            List<DashboardDto> reklamaSortByClient = getReklamaSortByClient();
            return apiResponseService.getResponse(new Dashboard2Dto(studentStatByAge, studentStatByGender, studentSortByCount, reklamaSortByClient));
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }


}

