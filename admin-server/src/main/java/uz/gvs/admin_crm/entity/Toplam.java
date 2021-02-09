package uz.gvs.admin_crm.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.template.AbsEntity;

import javax.persistence.*;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Toplam extends AbsEntity {
    @ManyToOne
    private Course course;

    @ManyToOne
    private Teacher teacher;

    @OneToMany
    private Set<Weekday> weekdays;

    private String time;
    private boolean active;
}
