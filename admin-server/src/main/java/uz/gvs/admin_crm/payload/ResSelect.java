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
    private Double individualPrice;
    private Boolean isPercent;
    private String phoneNumber;

    public ResSelect(UUID uuid, String name, String phoneNumber) {
        this.uuid = uuid;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    public ResSelect(UUID uuid, Integer id, Double individualPrice, boolean isPercent) {
        this.uuid = uuid;
        this.id = id;
        this.individualPrice = individualPrice;
        this.isPercent = isPercent;
    }

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
