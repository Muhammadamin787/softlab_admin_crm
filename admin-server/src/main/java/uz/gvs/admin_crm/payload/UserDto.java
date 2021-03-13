package uz.gvs.admin_crm.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
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
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String fullName;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String phoneNumber;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String description;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private int age;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Region region;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer regionId;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String gender;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Attachment avatar;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String birthDate;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<Role> roles;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<Permission> permissions;

    public UserDto(String fullName, String phoneNumber, String description, Integer regionId, String gender, String birthDate) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.regionId = regionId;
        this.gender = gender;
        this.birthDate = birthDate;
    }

    public UserDto(UUID id, String fullName, String phoneNumber, String description, Region region, String gender, String birthDate, Set<Role> roles) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.region = region;
        this.gender = gender;
        this.birthDate = birthDate;
        this.roles = roles;
    }

    public UserDto(UUID id, String fullName, String phoneNumber, int age, Region region, String gender, Attachment avatar, String birthDate) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.age = age;
        this.region = region;
        this.gender = gender;
        this.avatar = avatar;
        this.birthDate = birthDate;
    }
}
