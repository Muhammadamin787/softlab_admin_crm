package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.Region;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegionDto {
    private Integer id;
    private String name;
    private String description;
    private boolean active;
    private Integer regionId;

    public RegionDto(Integer id, String name, String description, boolean active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.active = active;
    }


    private Region region;

//    public RegionDto(String name, String description, boolean active, Region region) {
//        this.name = name;
//        this.description = description;
//        this.active = active;
//        this.region = region;
//    }
}
