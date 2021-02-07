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

    public User makeUser(UserDto userDto) {
        User user = new User();
        user.setFullName(userDto.getFullName());
        user.setPhoneNumber(userDto.getPhoneNumber());
        user.setDescription(userDto.getDescription());
        user.setAge(userDto.getAge() != 0 ? userDto.getAge() :null);
        user.setRegion(userDto.getRegion() != null ? userDto.getRegion() : null);
        user.setGender(Gender.valueOf(userDto.getGender()));
        user.setPassword(userDto.getPassword() != null ? passwordEncoder.encode(userDto.getPassword()) : null);
        user.setBirthDate(userDto.getBirthDate() != null ? userDto.getBirthDate() :null);
        user.setRoles(new HashSet<>(roleRepository.findAllByRoleName(RoleName.TEACHER)));
        return userRepository.save(user);
    }


    public boolean checkPhoneNumber(String phoneNumber) {
        return !userRepository.existsByPhoneNumber(phoneNumber);
    }
}
