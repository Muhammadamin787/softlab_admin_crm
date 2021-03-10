package uz.gvs.admin_crm.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.*;
import uz.gvs.admin_crm.entity.enums.StudentGroupStatus;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentGroupDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer groupId;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String groupName;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private StudentGroupStatus studentGroupStatus;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Boolean isPercent;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private double individualPrice;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String description;
}
