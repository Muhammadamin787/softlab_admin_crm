package uz.gvs.admin_crm.payload;

import uz.gvs.admin_crm.entity.Attachment;
import uz.gvs.admin_crm.entity.Permission;
import uz.gvs.admin_crm.entity.Region;
import uz.gvs.admin_crm.entity.Role;
import uz.gvs.admin_crm.entity.enums.Gender;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

public class UserDto {
    private UUID uuid;
    private String fullName;
    private String phoneNumber;
    private String description;
    private int age;
    private Region region;
    private String gender;
    private String password;
    private Attachment avatar;
    private Date birthDate;
    private Set<Role> roles;
    private Set<Permission> permissions;

}
