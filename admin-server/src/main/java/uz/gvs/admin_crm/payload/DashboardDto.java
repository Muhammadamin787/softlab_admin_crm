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
    public DashboardDto(String label, Integer data) {
        this.label = label;
        this.data = data;
    }
}
