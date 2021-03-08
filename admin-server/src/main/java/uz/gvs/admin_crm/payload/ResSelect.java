package uz.gvs.admin_crm.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.UUID;

@Data
public class ResSelect {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private UUID uuid;
    private int id;
    private String name;


    public ResSelect() {
    }

    public ResSelect(String name, UUID uuid) {
        this.name = name;
        this.uuid = uuid;
    }

    public ResSelect(int id, String name) {
        this.id = id;
        this.name = name;
    }
}
