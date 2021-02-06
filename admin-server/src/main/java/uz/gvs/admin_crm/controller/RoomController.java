package uz.gvs.admin_crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.RoomDto;
import uz.gvs.admin_crm.repository.RoomRepository;
import uz.gvs.admin_crm.service.RoomService;

@RestController
@RequestMapping("/api/room")
public class RoomController {
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    RoomService roomService;

    @PostMapping
    public HttpEntity<?> save(@RequestBody RoomDto roomDto) {
        ApiResponse apiResponse = roomService.save(roomDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

}
