package uz.gvs.admin_crm.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import uz.gvs.admin_crm.entity.enums.RoleName;
import uz.gvs.admin_crm.entity.enums.Weekday;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class WeekdayName {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private Weekday weekday;

}
