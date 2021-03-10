package uz.gvs.admin_crm.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.enums.StudentGroupStatus;
import uz.gvs.admin_crm.entity.template.AbsEntity;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class StudentGroup extends AbsEntity {
    @ManyToOne
    private Group group;
    @Enumerated(EnumType.STRING)
    private StudentGroupStatus studentGroupStatus;
    private boolean isPercent;
    private double individualPrice;
    @Column(columnDefinition = "text")
    private String description;

    public StudentGroup(Group group, StudentGroupStatus studentGroupStatus, double individualPrice, String description) {
        this.group = group;
        this.studentGroupStatus = studentGroupStatus;
        this.individualPrice = individualPrice;
        this.description = description;
    }
}
