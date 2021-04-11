package uz.gvs.admin_crm.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.Attachment;
import uz.gvs.admin_crm.entity.Permission;
import uz.gvs.admin_crm.entity.Region;
import uz.gvs.admin_crm.entity.Role;
import uz.gvs.admin_crm.entity.enums.RoleName;

import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmployeeDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID userId;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String fullName;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String phoneNumber;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String description;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int age;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Region region;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer regionId;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private String gender;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Attachment avatar;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String birthDate;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String password;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<Role> roles;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<Permission> permissions;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String roleName;

    public EmployeeDto(UUID id, String fullName, String phoneNumber, String roleName) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.roleName = roleName;
    }

    public EmployeeDto(UUID id, UUID userId, String fullName, String phoneNumber, String description, Region region, Integer regionId, String gender, String birthDate, String roleName) {
        this.id = id;
        this.userId = userId;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.region = region;
        this.regionId = regionId;
        this.gender = gender;
        this.birthDate = birthDate;
        this.roleName = roleName;
    }
}
