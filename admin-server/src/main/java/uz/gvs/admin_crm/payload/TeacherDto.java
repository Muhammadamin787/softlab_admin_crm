package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
public class TeacherDto {
    private UUID id;
    private UserDto userDto;

    public TeacherDto(UserDto userDto) {
        this.userDto = userDto;
    }

}
