package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.*;
import uz.gvs.admin_crm.entity.enums.ClientStatusEnum;
import uz.gvs.admin_crm.entity.enums.Gender;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.AppealDto;
import uz.gvs.admin_crm.payload.PageableDto;
import uz.gvs.admin_crm.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AppealService {
    @Autowired
    RegionRepository regionRepository;
    @Autowired
    ReklamaRepository reklamaRepository;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    ClientStatusRepository clientStatusRepository;
    @Autowired
    ClientAppealRepository clientAppealRepository;
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    ToplamRepository toplamRepository;
    @Autowired
    ClientStatusConnectRepository clientStatusConnectRepository;

    public ApiResponse saveAppeal(AppealDto appealDto) {
        try {
            if (appealDto.getPhoneNumber() == null || appealDto.getFullName() == null || appealDto.getPhoneNumber().length() != 9
                    || appealDto.getFullName().length() < 2)
                return apiResponseService.notFoundResponse();
            // clientni saqlash
            Client client = new Client();
            client.setFullName(appealDto.getFullName());
            client.setPhoneNumber(appealDto.getPhoneNumber());
            if (appealDto.getAge() != null)
                client.setAge(appealDto.getAge());
            client.setGender(Gender.valueOf(appealDto.getGender()));
            client.setDescription(appealDto.getDescription());

            if (appealDto.getRegionId() != null && appealDto.getRegionId() > 0) {
                Region region = regionRepository.findById(appealDto.getRegionId()).orElseThrow(() -> new ResourceNotFoundException("get region"));
                client.setRegion(region);
            }
            if (appealDto.getReklamaId() != null && appealDto.getReklamaId() > 0) {
                Reklama reklama = reklamaRepository.findById(appealDto.getReklamaId()).orElseThrow(() -> new ResourceNotFoundException("get Reklama"));
                client.setReklama(reklama);
            }
            ClientStatus clientStatus = clientStatusRepository.findById(appealDto.getClientStatusId()).orElseThrow(() -> new ResourceNotFoundException("get client status"));
            Client savedClient = clientRepository.save(client);

            // clientning murojaat turini qo'shish
            ClientStatusConnect clientStatusConnect = new ClientStatusConnect();
            clientStatusConnect.setClient(savedClient);
            if (appealDto.getStatusEnum().equals("COLLECTION")) {
                toplamRepository.findById(appealDto.getClientStatusId()).orElseThrow(() -> new ResourceNotFoundException("get toplam"));
                clientStatusConnect.setStatusId(appealDto.getClientStatusId().toString());
                clientStatusConnect.setToplam(true);
            } else {
                clientStatusConnect.setToplam(false);
                clientStatusConnect.setStatusId(appealDto.getClientStatusId().toString());
            }
            clientStatusConnect.setClient(savedClient);
            ClientStatusConnect saveClientStatusConnect = clientStatusConnectRepository.save(clientStatusConnect);

            // statistika murojaat voronkasi uchun murojaatni saqlab olish
            ClientAppeal clientAppeal = new ClientAppeal();
            clientAppeal.setClient(savedClient);
            clientAppeal.setStatusEnum(clientStatus.getClientStatusEnum());
            clientAppeal.setStatusId(saveClientStatusConnect.getStatusId());
            clientAppealRepository.save(clientAppeal);

            return apiResponseService.saveResponse();
        } catch (Exception e) {
            return apiResponseService.errorResponse();
        }
    }

    /*
     enumType - murojaatning qaysi bo'limga tegishli ekanligi, So'rov = REQUEST
     typeId  - murojaatning qaysi bo'limning qaysi qismiga tegishli ekanligi, enumType turiga qarab
     UUID yoki Integer bo'lishi mumkin,
    */
    public ApiResponse getClientList(String enumType, Integer typeId, int page, int size) {
        try {
            ClientStatusEnum clientStatusEnum = ClientStatusEnum.valueOf(enumType);
            List<Object> object = new ArrayList<>();
            List<AppealDto> clientList = new ArrayList<>();
            Integer totalItems = 0;

            if (typeId == 0) {
                object = clientRepository.getClientByFilterEnumType(enumType, page, size);
                totalItems = clientRepository.getCountByEnumType(enumType);
                for (Object obj : object) {
                    Object[] client = (Object[]) obj;
                    UUID id = UUID.fromString(client[0].toString());
                    String fullName = client[1].toString();
                    String phoneNumber = client[2].toString();
                    Integer statusId = Integer.valueOf(client[3].toString());
                    String statusName = client[4].toString();
                    String statusEnum = client[5].toString();
                    AppealDto appealDto = new AppealDto(id, fullName, phoneNumber, statusName, statusEnum, statusId);
                    clientList.add(appealDto);
                }
            } else {
                if (clientStatusEnum.equals(ClientStatusEnum.COLLECTION)) {
//                    clientList = clientRepository.getClientByFilterStatusToplam(enumType, typeId, page, size);
                } else {
//                    clientList = clientRepository.getClientByFilterStatus(enumType, typeId, page, size);
                }
            }
            return apiResponseService.getResponse(new PageableDto(Long.valueOf(totalItems.toString()), page, size, clientList));
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }
}
