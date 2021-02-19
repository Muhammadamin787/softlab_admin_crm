package uz.gvs.admin_crm.payload;

import lombok.Data;
import uz.gvs.admin_crm.entity.Region;
import uz.gvs.admin_crm.entity.Reklama;

import java.util.UUID;

@Data
public class AppealDto {
    private UUID id;
    private String fullName;
    private String phoneNumber;
    private String gender;
    private String description;
    private Integer regionId;
    private Integer reklamaId;
    private Integer age;
    private String statusEnum;
    private Integer clientStatusId;

    private Reklama reklama;
    private Region region;
}
