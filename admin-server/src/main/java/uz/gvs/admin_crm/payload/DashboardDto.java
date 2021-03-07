package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DashboardDto {
    private String label;
    private Integer data;
    private Integer data2;


    public DashboardDto(String label, Integer data) {
        this.label = label;
        this.data = data;
    }
}
