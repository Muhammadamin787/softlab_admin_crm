package uz.gvs.admin_crm.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import uz.gvs.admin_crm.entity.template.AbsIdEntity;
import uz.gvs.admin_crm.entity.template.AbsNameEntity;
import uz.gvs.admin_crm.entity.template.AbsNameEntity2;
import uz.gvs.admin_crm.payload.RoomDto;
import uz.gvs.admin_crm.repository.RoomRepository;
import uz.gvs.admin_crm.service.RoomService;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Room extends AbsNameEntity2 {

}
