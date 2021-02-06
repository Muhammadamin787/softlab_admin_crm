package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Room;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.RoomDto;
import uz.gvs.admin_crm.repository.RoomRepository;

@Service
public class RoomService {
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    ApiResponseService apiResponseService;

    public ApiResponse save(RoomDto roomDto) {
        if (roomRepository.existsByNameEqualsIgnoreCase(roomDto.getName()))
            return apiResponseService.existResponse();
        Room room = new Room();
        room.setName(roomDto.getName());
        room.setActive(roomDto.isActive());
        return apiResponseService.saveResponse();
    }
}
