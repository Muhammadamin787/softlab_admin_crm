package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.Attachment;
import uz.gvs.admin_crm.entity.Permission;
import uz.gvs.admin_crm.entity.Region;
import uz.gvs.admin_crm.entity.Role;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserDto {
    private UUID uuid;
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

    public UserDto(UUID uuid, String fullName, String phoneNumber, String description, Region region, String gender, String birthDate, Set<Role> roles) {
        this.uuid = uuid;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.region = region;
        this.gender = gender;
        this.birthDate = birthDate;
        this.roles = roles;
    }

    public UserDto(UUID uuid, String fullName, String phoneNumber, int age, Region region, String gender, Attachment avatar, String birthDate) {
        this.uuid = uuid;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.age = age;
        this.region = region;
        this.gender = gender;
        this.avatar = avatar;
        this.birthDate = birthDate;
    }
}
