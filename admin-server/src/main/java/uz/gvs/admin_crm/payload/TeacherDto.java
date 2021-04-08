package uz.gvs.admin_crm.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class TeacherDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID id;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String teacherName;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String phoneNumber;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String birthDate;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String password;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private String gender;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer regionId;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String regionName;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private String description;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<GroupDto> groupDtos;
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private Double balance;

    public TeacherDto(UUID id, String teacherName, String phoneNumber, String birthDate, String gender, Integer regionId, String regionName, String description, List<GroupDto> groupDtos, Double balance, Boolean percent, Double salary) {
        this.id = id;
        this.teacherName = teacherName;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.gender = gender;
        this.regionId = regionId;
        this.regionName = regionName;
        this.description = description;
        this.groupDtos = groupDtos;
        this.balance = balance;
        this.percent = percent;
        this.salary = salary;
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Boolean percent;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double salary;


    public TeacherDto(UUID id, String teacherName, String phoneNumber) {
        this.id = id;
        this.teacherName = teacherName;
        this.phoneNumber = phoneNumber;
    }




}
