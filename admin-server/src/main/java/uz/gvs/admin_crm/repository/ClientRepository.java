package uz.gvs.admin_crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import uz.gvs.admin_crm.entity.Client;
import uz.gvs.admin_crm.entity.Course;

import java.util.List;
import java.util.UUID;

public interface ClientRepository extends JpaRepository<Client, UUID> {

    boolean existsByFullNameEqualsIgnoreCaseAndIdNot(String fullName, UUID id);

    boolean existsByPhoneNumber(String phoneNumber);

    boolean existsById(UUID client_id);

    @Query(nativeQuery = true, value = "select * from client")
    List<Client> getClientByFilterStatusToplam(String enumType, Integer id, int page, int size);

    @Query(nativeQuery = true, value = "select * from client")
    List<Client> getClientByFilterStatus(String enumType, Integer id, int page, int size);

    @Query(nativeQuery = true, value = "select * from client")
    List<Client> getClientByFilterEnumType(String enumType, int page, int size);


}
