package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.CourseCategory;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class GroupDto {
    private Integer id;
    private String name;
    private String description;
    private boolean active;
    private UUID teacherId;
    private int courseId;

    private TeacherDto teacherDto;
    private List<String> weekdays;
    private CourseDto courseDto;

//    public CourseDto(Integer id, String name, String description, boolean active, double price, CourseCategory courseCategory){
//        this.id = id;
//        this.name = name;
//        this.description = description;
//        this.active = active;
//        this.price = price;
//        this.courseCategory = courseCategory;
//    }
}
