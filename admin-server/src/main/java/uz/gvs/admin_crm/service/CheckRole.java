package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Role;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.entity.enums.RoleName;
import uz.gvs.admin_crm.repository.RoleRepository;

@Service
public class CheckRole {
    @Autowired
    RoleRepository roleRepository;

    public boolean isAdmin(User user) {
        for (Role role : user.getRoles()) {
            if (role.getRoleName() == RoleName.ADMIN) {
                return true;
            }
        }
        return false;
    }

    public boolean isSuperAdmin(User user) {
        for (Role role : user.getRoles()) {
            if (role.getRoleName() == RoleName.SUPER_ADMIN) {
                return true;
            }
        }
        return false;
    }

    public boolean isTeacher(User user) {
        for (Role role : user.getRoles()) {
            if (role.getRoleName() == RoleName.TEACHER) {
                return true;
            }
        }
        return false;
    }

    public boolean isFinancier(User user) {
        for (Role role : user.getRoles()) {
            if (role.getRoleName() == RoleName.FINANCIER) {
                return true;
            }
        }
        return false;
    }

    public boolean isReception(User user) {
        for (Role role : user.getRoles()) {
            if (role.getRoleName() == RoleName.RECEPTION) {
                return true;
            }
        }
        return false;
    }
}
