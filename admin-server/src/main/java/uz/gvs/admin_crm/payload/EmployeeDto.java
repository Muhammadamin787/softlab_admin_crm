package uz.gvs.admin_crm.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.enums.RoleName;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmployeeDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private UserDto userDto;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private RoleName roleName;

    public EmployeeDto(UUID id, UserDto userDto) {
        this.id = id;
        this.userDto = userDto;
    }
}
