package uz.gvs.admin_crm.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.Weekday;

import java.util.Set;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ToplamDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String name;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer courseId;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID teacherId;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String teacherName;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Set<String> weekdays;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Set<Weekday> weekdayList;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String time;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private boolean active;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String courseName;

    public ToplamDto(Integer id, String name, Integer courseId, UUID teacherId, String teacherName, Set<Weekday> weekdayList, String time, boolean active, String courseName) {
        this.id = id;
        this.name = name;
        this.courseId = courseId;
        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.weekdayList = weekdayList;
        this.time = time;
        this.active = active;
        this.courseName = courseName;
    }
}
