package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.Room;
import uz.gvs.admin_crm.entity.enums.GroupStatus;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ResGroupDto {
    private Integer id;
    private String name;
    private String courseName;
    private UUID teacherId;
    private String teacherName;
    private String startTime;
    private String finishTime;
    private List<String> weekdays;
    private Date startDate;
    private Date finishDate;
    private String startDates;
    private String finishDates;
    private GroupStatus groupStatus;
    private boolean active;
    private Room room;
    private Integer countStudent;
    private Integer roomId;
    private String roomName;

    public ResGroupDto(Integer id, String name, String courseName, UUID teacherId, String teacherName, String startTime, String finishTime, List<String> weekdays, Date startDate, Date finishDate, GroupStatus groupStatus, boolean active, Room room) {
        this.id = id;
        this.name = name;
        this.courseName = courseName;
        this.teacherId = teacherId;
        this.teacherName = teacherName;
        this.startTime = startTime;
        this.finishTime = finishTime;
        this.weekdays = weekdays;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.groupStatus = groupStatus;
        this.active = active;
        this.room = room;
    }

    public ResGroupDto(Integer id, String name, String courseName, String teacherName, String startTime, String finishTime, String startDates, String finishDates, Integer countStudent, Room room) {
        this.id = id;
        this.name = name;
        this.courseName = courseName;
        this.teacherName = teacherName;
        this.startTime = startTime;
        this.finishTime = finishTime;
        this.startDates = startDates;
        this.finishDates = finishDates;
        this.countStudent = countStudent;
        this.room = room;
    }
}
