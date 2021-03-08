package uz.gvs.admin_crm.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DashboardDto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String label;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer data;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer data2;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<DashboardDto> ageSortList;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<DashboardDto> genderSortList;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<DashboardDto> countSortList;

    public DashboardDto(String label, Integer data, Integer data2) {
        this.label = label;
        this.data = data;
        this.data2 = data2;
    }

    public DashboardDto(List<DashboardDto> ageSortList, List<DashboardDto> genderSortList, List<DashboardDto> countSortList) {
        this.ageSortList = ageSortList;
        this.genderSortList = genderSortList;
        this.countSortList = countSortList;
    }

    public DashboardDto(List<DashboardDto> ageSortList, List<DashboardDto> genderSortList) {
        this.ageSortList = ageSortList;
        this.genderSortList = genderSortList;
    }


    public DashboardDto(String label, Integer data) {
        this.label = label;
        this.data = data;
    }
}
