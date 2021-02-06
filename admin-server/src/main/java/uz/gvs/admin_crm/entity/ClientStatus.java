package uz.gvs.admin_crm.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.enums.ClientStatusEnum;
import uz.gvs.admin_crm.entity.template.AbsNameEntity;

import javax.persistence.Entity;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ClientStatus extends AbsNameEntity {
    private ClientStatusEnum clientStatusEnum;
}
