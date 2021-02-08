package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.entity.enums.Gender;
import uz.gvs.admin_crm.entity.enums.RoleName;
import uz.gvs.admin_crm.payload.UserDto;
import uz.gvs.admin_crm.repository.AttachmentRepository;
import uz.gvs.admin_crm.repository.RegionRepository;
import uz.gvs.admin_crm.repository.RoleRepository;
import uz.gvs.admin_crm.repository.UserRepository;

import java.util.HashSet;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AttachmentRepository attachmentRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    RegionRepository regionRepository;

    public User makeUser(UserDto userDto, RoleName roleName) {
        User user = new User();
        user.setFullName(userDto.getFullName());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setDescription(userDto.getDescription());
//        user.setAge(userDto.getAge() > 0 ? userDto.getAge() : null);
        user.setRegion(userDto.getRegionId() != null ? regionRepository.findById(userDto.getRegionId()).orElseThrow(() -> new ResourceNotFoundException("get region")) : null);
        user.setGender(Gender.valueOf(userDto.getGender()));
//        user.setBirthDate(userDto.getBirthDate() != null ? DateuserDto.getBirthDate() : null);
        user.setRoles(new HashSet<>(roleRepository.findAllByRoleName(roleName)));
        return userRepository.save(user);
    }


    public boolean checkPhoneNumber(String phoneNumber) {
        return !userRepository.existsByPhoneNumber(phoneNumber);
    }
}
