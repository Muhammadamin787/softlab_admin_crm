package uz.gvs.admin_crm.service;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Client;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.ClientDto;
import uz.gvs.admin_crm.repository.ClientRepository;
import uz.gvs.admin_crm.repository.RegionRepository;

import java.util.Optional;
import java.util.UUID;

@Service
public class ClientService {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    ClientRepository clientRepository;
    @Autowired
    RegionRepository regionRepository;

    public ApiResponse addClient(ClientDto clientDto) {
        try {
            if (!clientRepository.existsById(clientDto.getId())) {
                if (!clientRepository.existsByFullNameEqualsIgnoreCaseAndIdNot(clientDto.getFullName(), clientDto.getId())) {
                    Client client = new Client(
                            clientDto.getFullName(),
                            clientDto.getPhoneNumber(),
                            clientDto.getDescription(),
                            clientDto.getAge(),
                            regionRepository.findById(clientDto.getRegionId()).orElseThrow(() -> new ResourceNotFoundException("Get region")),
                            clientDto.getGender()

                    );
                    clientRepository.save(client);
                    return apiResponseService.saveResponse();
                }
                return apiResponseService.existResponse();
            }
            return apiResponseService.existResponse();
        } catch (Exception a) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse editClient(UUID id, ClientDto clientDto) {
        try {
            Optional<Client> optionalClient = clientRepository.findById(id);
            if (optionalClient.isEmpty()) {
                return apiResponseService.notFoundResponse();
            }
            if (clientRepository.existsByFullNameEqualsIgnoreCaseAndIdNot(clientDto.getFullName(), id)) {
                return apiResponseService.existResponse();
            }
            Client client = optionalClient.get();
            client.setFullName(clientDto.getFullName());
            client.setPhoneNumber(clientDto.getPhoneNumber());
            client.setAge(clientDto.getAge());
            client.setDescription(clientDto.getDescription());
            client.setRegion(regionRepository.findById(clientDto.getRegionId()).orElseThrow(() -> new ResourceNotFoundException("get Region")));
            client.setGender(clientDto.getGender());
            clientRepository.save(client);
            return apiResponseService.updatedResponse();
        }catch (Exception a){
            return apiResponseService.tryErrorResponse();
        }
    }


}
