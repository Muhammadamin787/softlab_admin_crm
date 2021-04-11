package uz.gvs.admin_crm.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.Course;
import uz.gvs.admin_crm.entity.CourseCategory;
import uz.gvs.admin_crm.entity.Room;
import uz.gvs.admin_crm.entity.Teacher;
import uz.gvs.admin_crm.entity.enums.GroupStatus;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GroupDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String name;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String description;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private boolean active;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID teacherId;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String startTime;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String finishTime;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer courseId;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String courseName;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer roomId;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String startDate;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String finishDate;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Set<String> weekdays;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Teacher teacher;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Course course;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Room room;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private GroupStatus groupStatus;

    public GroupDto(Integer id, String name, String startTime, String finishTime, String courseName, Set<String> weekdays) {
        this.id = id;
        this.name = name;
        this.startTime = startTime;
        this.finishTime = finishTime;
        this.courseName = courseName;
        this.weekdays = weekdays;
    }
    public GroupDto(String name,  UUID teacherId, String startTime, String finishTime, Integer courseId, Integer roomId, String startDate, String finishDate, Set<String> weekdays) {
        this.name = name;
        this.teacherId = teacherId;
        this.startTime = startTime;
        this.finishTime = finishTime;
        this.courseId = courseId;
        this.roomId = roomId;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.weekdays = weekdays;
    }

    public GroupDto(Integer id, String name, String description, boolean active, String startTime, String finishTime, String startDate, String finishDate, Set<String> weekdays, Teacher teacher, Course course, Room room, GroupStatus groupStatus) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.active = active;
        this.startTime = startTime;
        this.finishTime = finishTime;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.weekdays = weekdays;
        this.teacher = teacher;
        this.course = course;
        this.room = room;
        this.groupStatus = groupStatus;
    }
}
