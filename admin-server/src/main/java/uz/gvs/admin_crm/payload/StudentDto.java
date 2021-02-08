package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDto {
    private UUID id;
    private UUID userId;
    private String fullName;
    private String phoneNumber;
    private String description;
    private int age;
    private Region region;
    private Integer regionId;
    private String gender;
    private Attachment avatar;
    private String birthDate;
    private Set<Role> roles;
    private Set<Permission> permissions;
    private double balans;
    private Set<StudentGroup> groupList;
    private List<UUID> groupIds;

    public StudentDto(UUID id, UUID userId, String fullName, String phoneNumber, String description, Region region, Integer regionId, String gender, String birthDate, Set<Role> roles, double balans, Set<StudentGroup> groupList) {
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.region = region;
        this.regionId = regionId;
        this.gender = gender;
        this.birthDate = birthDate;
        this.roles = roles;
        this.balans = balans;
        this.groupList = groupList;
    }
}
