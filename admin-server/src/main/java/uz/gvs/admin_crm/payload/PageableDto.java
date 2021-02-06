package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageableDto {
    private Integer totalPages;
    private Long totalElements;
    private Integer number;
    private Integer size;
    private Object object;
}
