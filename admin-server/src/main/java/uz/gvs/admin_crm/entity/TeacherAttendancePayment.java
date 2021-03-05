package uz.gvs.admin_crm.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.template.AbsEntity;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TeacherAttendancePayment extends AbsEntity {

    @ManyToOne(optional = false)
    private Group group;

    @ManyToOne(optional = false)
    private Teacher teacher;

    @OneToMany
    private List<StudentAttendancePayment> studentList;

    private double price;

    private Date date;

}
