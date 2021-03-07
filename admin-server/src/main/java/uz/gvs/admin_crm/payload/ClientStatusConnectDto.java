package uz.gvs.admin_crm.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uz.gvs.admin_crm.entity.Client;
import uz.gvs.admin_crm.entity.ClientStatus;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientStatusConnectDto {
    private Client client;
    private ClientStatus clientStatus;
    private UUID id;
    private boolean toplam;
}
