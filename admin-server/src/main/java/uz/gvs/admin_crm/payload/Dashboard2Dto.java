package uz.gvs.admin_crm.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Dashboard2Dto {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<DashboardDto> ageSortList;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<DashboardDto> genderSortList;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<DashboardDto> countSortList;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<DashboardDto> reklamaSortList;

    public Dashboard2Dto(List<DashboardDto> ageSortList, List<DashboardDto> countSortList) {
        this.ageSortList = ageSortList;
        this.countSortList = countSortList;
    }
}
