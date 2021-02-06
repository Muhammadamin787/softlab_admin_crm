package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.enums.Gender;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto{
    private UUID id;
    private String fullName;
    private String phoneNumber;
    private String description;
    private int age;
    private Integer regionId;
    private String gender;

    public ClientDto(String fullName, String phoneNumber, String description, int age, Integer regionId, String gender) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.description = description;
        this.age = age;
        this.regionId = regionId;
        this.gender = gender;
    }
}
