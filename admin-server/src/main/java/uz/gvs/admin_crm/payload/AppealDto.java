package uz.gvs.admin_crm.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.Region;
import uz.gvs.admin_crm.entity.Reklama;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AppealDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String fullName;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String phoneNumber;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String gender;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String description;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer regionId;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer reklamaId;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer age;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String statusEnum;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer clientStatusId;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Reklama reklama;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Region region;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String statusName;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String reklamaName;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String regionName;


    public AppealDto(UUID id, String fullName, String phoneNumber, String gender, String description, Integer regionId, Integer reklamaId, Integer age, String statusEnum, Integer clientStatusId, String statusName, String reklamaName, String regionName) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.description = description;
        this.regionId = regionId;
        this.reklamaId = reklamaId;
        this.age = age;
        this.statusEnum = statusEnum;
        this.clientStatusId = clientStatusId;
        this.statusName = statusName;
        this.reklamaName = reklamaName;
        this.regionName = regionName;
    }

    public AppealDto(UUID id, String fullName, String phoneNumber, String statusName, String statusEnum, Integer clientStatusId) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.statusName = statusName;
        this.statusEnum = statusEnum;
        this.clientStatusId = clientStatusId;
    }

    public AppealDto(UUID id, String fullName, String phoneNumber) {
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
    }
}
