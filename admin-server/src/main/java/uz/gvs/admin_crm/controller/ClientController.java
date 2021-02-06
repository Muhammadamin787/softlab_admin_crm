package uz.gvs.admin_crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.ClientDto;
import uz.gvs.admin_crm.repository.ClientRepository;
import uz.gvs.admin_crm.service.ApiResponseService;
import uz.gvs.admin_crm.service.ClientService;

import java.util.UUID;

@RestController
@RequestMapping("/client")
public class ClientController {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    ClientService clientService;
    @Autowired
    ClientRepository clientRepository;

    @PostMapping
    public HttpEntity<?> addClient(@RequestBody ClientDto clientDto) {
        ApiResponse apiResponse = clientService.addClient(clientDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editClient(@RequestBody ClientDto clientDto, @PathVariable UUID id) {
        ApiResponse apiResponse = clientService.editClient(id, clientDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }

    @DeleteMapping("{id}")
    public HttpEntity<?> deleteClient(@PathVariable UUID id) {
        try {
            clientRepository.deleteById(id);
            return  ResponseEntity.status(204).body(apiResponseService.deleteResponse());
        }catch (Exception a){
            return ResponseEntity.status(409).body(apiResponseService.tryErrorResponse());
        }
    }
}
