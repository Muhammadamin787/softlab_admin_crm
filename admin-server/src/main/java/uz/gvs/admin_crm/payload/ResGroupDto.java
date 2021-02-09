package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResGroupDto {
    private Integer id;

    private String name;
    private String courseName;
    private String teacherName;
    private String startTime;
    private String finishTime;
    private List<String> weekdays;
    private Date startDate;
    private Date finishDate;
}
