package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.*;
import uz.gvs.admin_crm.entity.enums.ClientStatusEnum;
import uz.gvs.admin_crm.entity.enums.Gender;
import uz.gvs.admin_crm.payload.*;
import uz.gvs.admin_crm.repository.*;

import java.util.*;
import java.util.stream.Collectors;

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

    public ApiResponse changeStatus(UUID id, AppealDto appealDto) {
        try {
            Optional<Client> byId = clientRepository.findById(id);
            if (byId.isEmpty())
                return apiResponseService.notFoundResponse();
            if (ClientStatusEnum.valueOf(appealDto.getStatusEnum()).equals(ClientStatusEnum.COLLECTION)) {
                Optional<Toplam> byId1 = toplamRepository.findById(appealDto.getClientStatusId());
                if (byId1.isEmpty())
                    return apiResponseService.notFoundResponse();
            } else {
                Optional<ClientStatus> byId1 = clientStatusRepository.findById(appealDto.getClientStatusId());
                if (byId1.isEmpty())
                    return apiResponseService.notFoundResponse();
            }
            Client client = byId.get();
            Optional<ClientStatusConnect> clientId = clientStatusConnectRepository.findByClient_id(client.getId());
            if (clientId.isEmpty())
                return apiResponseService.notFoundResponse();

            ClientStatusConnect clientStatusConnect = clientId.get();
            clientStatusConnect.setStatusId(appealDto.getClientStatusId().toString());
            clientStatusConnect.setToplam(appealDto.getStatusEnum().equals("COLLECTION"));
            clientStatusConnectRepository.save(clientStatusConnect);

            Optional<ClientAppeal> optionalClientAppeal = clientAppealRepository.findByClient_idAndStatusEnum(client.getId(), ClientStatusEnum.valueOf(appealDto.getStatusEnum()));
            if (optionalClientAppeal.isPresent()) {
                ClientAppeal clientAppeal = optionalClientAppeal.get();
                clientAppeal.setStatusId(appealDto.getClientStatusId().toString());
                clientAppealRepository.save(clientAppeal);
            } else {
                ClientAppeal clientAppeal = new ClientAppeal();
                clientAppeal.setClient(client);
                clientAppeal.setStatusEnum(ClientStatusEnum.valueOf(appealDto.getStatusEnum()));
                clientAppeal.setStatusId(appealDto.getClientStatusId().toString());
                clientAppealRepository.save(clientAppeal);
            }
            return apiResponseService.updatedResponse();
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
                if (clientStatusEnum.equals(ClientStatusEnum.COLLECTION)) {
                    object = clientRepository.getClientByFilterEnumSet(page, size);
                    totalItems = clientRepository.getCountByEnumSet();
                } else {
                    object = clientRepository.getClientByFilterEnumType(enumType, page, size);
                    totalItems = clientRepository.getCountByEnumType(enumType);
                }
            } else {
                if (clientStatusEnum.equals(ClientStatusEnum.COLLECTION)) {
                    object = clientRepository.getClientByFilterToplamStatus(typeId, page, size);
                    totalItems = clientRepository.getCountByStatusToplam(typeId);
                } else {
                    object = clientRepository.getClientByFilterStatus(enumType, typeId, page, size);
                    totalItems = clientRepository.getCountByStatusType(enumType, typeId);
                }
            }
            for (Object obj : object) {
                Object[] client = (Object[]) obj;
                UUID id = UUID.fromString(client[0].toString());
                String fullName = client[1].toString();
                String phoneNumber = client[2].toString();
                Integer statusId = Integer.valueOf(client[3].toString());
                String statusName = client[4].toString();
                String statusEnum = "";
                if (clientStatusEnum.equals(ClientStatusEnum.COLLECTION)) {
                    statusEnum = "COLLECTION";
                } else {
                    statusEnum = client[5].toString();
                }
                AppealDto appealDto = new AppealDto(id, fullName, phoneNumber, statusName, statusEnum, statusId);
                clientList.add(appealDto);
            }
            return apiResponseService.getResponse(new PageableDto(Long.valueOf(totalItems.toString()), page, size, clientList));
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }


    public ApiResponse getOneAppeal(UUID id) {
        try {
            Optional<Client> byId = clientRepository.findById(id);
            Optional<ClientStatusConnect> byClient_id = clientStatusConnectRepository.findByClient_id(id);
            if (byId.isPresent() && byClient_id.isPresent()) {
                List<Object> object = clientAppealRepository.getClientAppealList(id);
                List<ClientAppealDto> clientAppealDtos = new ArrayList<>();
                for (Object obj : object) {
                    Object[] client = (Object[]) obj;
                    UUID clientId = UUID.fromString(client[0].toString());
                    String statusEnum = (client[1].toString().equals("WAITING") ? "Kutish" : "So'rov");
                    String statusName = client[2].toString();
                    Integer statusId = Integer.valueOf(client[3].toString());
                    String updateTime = client[4].toString();
                    UUID caId = UUID.fromString(client[5].toString());
                    clientAppealDtos.add(
                            new ClientAppealDto(
                                    caId,
                                    statusEnum,
                                    clientId,
                                    statusId,
                                    updateTime,
                                    statusName));
                }
                object = clientAppealRepository.getClientAppealListByToplam(id);
                for (Object obj : object) {
                    Object[] client = (Object[]) obj;
                    UUID clientId = UUID.fromString(client[0].toString());
                    String statusEnum = "To'plam";
                    String statusName = client[2].toString();
                    Integer statusId = Integer.valueOf(client[3].toString());
                    String updateTime = client[4].toString();
                    UUID caId = UUID.fromString(client[5].toString());
                    clientAppealDtos.add(
                            new ClientAppealDto(
                                    caId,
                                    statusEnum,
                                    clientId,
                                    statusId,
                                    updateTime,
                                    statusName));
                }

                return apiResponseService.getResponse(
                        new ClientDto(
                                byClient_id.get(),
                                clientAppealDtos
                        ));
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse deleteAppeal(UUID id) {
        try {
            return apiResponseService.deleteResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }


    public ApiResponse getAppealListAll(Integer typeId, int page, int size) {
        try {
            Page<ClientStatusConnect> all = clientStatusConnectRepository.findAll(PageRequest.of(page, size));

            return apiResponseService.getResponse(new PageableDto(
                    all.getTotalPages(),
                    all.getTotalElements(),
                    all.getNumber(),
                    all.getSize(),
                    all.get().map(this::makeClient).collect(Collectors.toList())
            ));
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ClientStatusConnectDto makeClient(ClientStatusConnect client) {
        return new ClientStatusConnectDto(
                client.getClient(),
                (client.isToplam() ? null : clientStatusRepository.findById(Integer.valueOf(client.getStatusId())).orElseThrow(() -> new ResourceNotFoundException("get Status"))),
                (client.isToplam() ? toplamRepository.findById(Integer.valueOf(client.getStatusId())).orElseThrow(() -> new ResourceNotFoundException("get Status")) : null),
                client.getId(),
                client.isToplam()
        );
    }

    public ApiResponse getAppealList() {
        try {
            List<LeadDto> leadDtos = new ArrayList<>();
            List<SectionDto> sectionDtos = new ArrayList<>();

            List<Object> objects = clientAppealRepository.getClientAppealsListByAppealType("REQUEST");
            for (Object obj : objects) {
                Object[] client = (Object[]) obj;
                Integer statusId = Integer.valueOf(client[0].toString());
                String statusName = client[1].toString();
                String clientName = client[2].toString();
                String clientPhone = client[3].toString();
                UUID clientId = UUID.fromString(client[4].toString());
                String statusEnum = client[5].toString();
                boolean isHave = false;

                for (SectionDto sectionDto : sectionDtos) {
                    if (sectionDto.getId().equals(statusId)) {
                        List<AppealDto> oldAppealDtos = sectionDto.getAppealDtos();
                        List<AppealDto> appealDtos = new ArrayList<>();
                        appealDtos.add(new AppealDto(clientId, clientName, clientPhone, statusName, statusEnum, statusId));
                        appealDtos.addAll(oldAppealDtos);
                        sectionDto.setAppealDtos(appealDtos);
                        isHave = true;
                        break;
                    }
                }

                if (!isHave) {
                    sectionDtos.add(new SectionDto(statusId, statusName, Collections.singletonList(new AppealDto(clientId, clientName, clientPhone, statusName, statusEnum, statusId))));
                }
            }
            objects = clientAppealRepository.getClientAppealsListByOtherAppealType("REQUEST");
            for (Object obj : objects) {
                Object[] client = (Object[]) obj;
                Integer statusId = Integer.valueOf(client[0].toString());
                String statusName = client[1].toString();
                sectionDtos.add(new SectionDto(statusId, statusName, new ArrayList<>()));
            }
            leadDtos.add(new LeadDto("REQUEST", sectionDtos));

            sectionDtos = new ArrayList<>();
            objects = clientAppealRepository.getClientAppealsListByAppealType("WAITING");
            for (Object obj : objects) {
                Object[] client = (Object[]) obj;
                Integer statusId = Integer.valueOf(client[0].toString());
                String statusName = client[1].toString();
                String clientName = client[2].toString();
                String clientPhone = client[3].toString();
                UUID clientId = UUID.fromString(client[4].toString());
                String statusEnum = client[5].toString();
                boolean isHave = false;

                for (SectionDto sectionDto : sectionDtos) {
                    if (sectionDto.getId().equals(statusId)) {
                        List<AppealDto> oldAppealDtos = sectionDto.getAppealDtos();
                        List<AppealDto> appealDtos = new ArrayList<>();
                        appealDtos.add(new AppealDto(clientId, clientName, clientPhone, statusName, statusEnum, statusId));
                        appealDtos.addAll(oldAppealDtos);
                        sectionDto.setAppealDtos(appealDtos);
                        isHave = true;
                        break;
                    }
                }

                if (!isHave) {
                    sectionDtos.add(new SectionDto(statusId, statusName, Collections.singletonList(new AppealDto(clientId, clientName, clientPhone, statusName, statusEnum, statusId))));
                }
            }
            objects = clientAppealRepository.getClientAppealsListByOtherAppealType("WAITING");
            for (Object obj : objects) {
                Object[] client = (Object[]) obj;
                Integer statusId = Integer.valueOf(client[0].toString());
                String statusName = client[1].toString();
                sectionDtos.add(new SectionDto(statusId, statusName, new ArrayList<>()));
            }
            leadDtos.add(new LeadDto("WAITING", sectionDtos));

            sectionDtos = new ArrayList<>();
            objects = clientAppealRepository.getClientAppealsListByAppealToplam();
            for (Object obj : objects) {
                Object[] client = (Object[]) obj;
                Integer statusId = Integer.valueOf(client[0].toString());
                String statusName = client[1].toString();
                String clientName = client[2].toString();
                String clientPhone = client[3].toString();
                UUID clientId = UUID.fromString(client[4].toString());
                String statusEnum = "COLLECTION";
                boolean isHave = false;

                for (SectionDto sectionDto : sectionDtos) {
                    if (sectionDto.getId().equals(statusId)) {
                        List<AppealDto> oldAppealDtos = sectionDto.getAppealDtos();
                        List<AppealDto> appealDtos = new ArrayList<>();
                        appealDtos.add(new AppealDto(clientId, clientName, clientPhone, statusName, statusEnum, statusId));
                        appealDtos.addAll(oldAppealDtos);
                        sectionDto.setAppealDtos(appealDtos);
                        isHave = true;
                        break;
                    }
                }

                if (!isHave) {
                    sectionDtos.add(new SectionDto(statusId, statusName, Collections.singletonList(new AppealDto(clientId, clientName, clientPhone, statusName, statusEnum, statusId))));
                }
            }
            objects = clientAppealRepository.getClientAppealsListByAppealOtherToplam();
            for (Object obj : objects) {
                Object[] client = (Object[]) obj;
                Integer statusId = Integer.valueOf(client[0].toString());
                String statusName = client[1].toString();
                sectionDtos.add(new SectionDto(statusId, statusName, new ArrayList<>()));
            }
            leadDtos.add(new LeadDto("COLLECTION", sectionDtos));

            return apiResponseService.getResponse(leadDtos);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }


}
