package uz.gvs.admin_crm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import uz.gvs.admin_crm.config.InitConfig;

@SpringBootApplication
public class AdministratorApplication {

    public static void main(String[] args) {
        if (InitConfig.isStart())
            SpringApplication.run(AdministratorApplication.class, args);
        else System.out.println("Malumotlar o'chmadi");
    }

}
