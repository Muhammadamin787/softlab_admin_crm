package uz.gvs.admin_crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import uz.gvs.admin_crm.entity.User;
import uz.gvs.admin_crm.payload.*;
import uz.gvs.admin_crm.repository.GroupRepository;
import uz.gvs.admin_crm.security.CurrentUser;
import uz.gvs.admin_crm.service.ApiResponseService;
import uz.gvs.admin_crm.service.GroupService;
import uz.gvs.admin_crm.utils.AppConstants;

import java.util.UUID;

@RestController
@RequestMapping("api/group")
public class GroupController {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    GroupService groupService;
    @Autowired
    GroupRepository groupRepository;

    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN','ADMIN')")
    @PostMapping
    public HttpEntity<?> saveGroup(@RequestBody GroupDto groupDto) {
        ApiResponse apiResponse = groupService.saveGroup(groupDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN','TEACHER')")
    @GetMapping("/{id}")
    HttpEntity<?> getOneGroup(@PathVariable Integer id) {
        ApiResponse apiResponse = groupService.getOneGroup(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping
    public HttpEntity<?> getGroupList(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                      @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
                                      @RequestParam(value = "status", defaultValue = "ACTIVE") String status,
                                      @CurrentUser User user) {
        ApiResponse apiResponse = groupService.getGroupList(page, size, status, user);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/schedule/{week}")
    public HttpEntity<?> getGroups(@PathVariable String week) {
        ApiResponse apiResponse = groupService.getGroupsByWeekDayForSchedule(week);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/schedule")
    public HttpEntity<?> getAllGroups() {
        ApiResponse apiResponse = groupService.getAllGroups();
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/select")
    public HttpEntity<?> getGroupForSelect() {
        ApiResponse apiResponse = groupService.getGroupsForSelect();
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/search")
    public HttpEntity<?> searchGroup(@RequestParam(value = "name") String name) {
        ApiResponse apiResponse = groupService.searchGroup(name);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @PostMapping("/addStudent")
    public HttpEntity<?> addStudentForGroup(@RequestBody AddGroupDto addGroupDto) {
        ApiResponse apiResponse = groupService.addStudentForGroup(addGroupDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
    @PutMapping("/{id}")
    public HttpEntity<?> editGroup(@PathVariable Integer id, @RequestBody GroupDto groupDto) {
        ApiResponse apiResponse = groupService.editGroup(groupDto, id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }


    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteGroup(@PathVariable Integer id) {
        try {
            groupRepository.deleteById(id);
            return ResponseEntity.status(204).body(apiResponseService.deleteResponse());
        } catch (Exception e) {
            return ResponseEntity.status(409).body(apiResponseService.tryErrorResponse());
        }
    }

    // Change Status

    @PreAuthorize("hasAnyAuthority('SUPER_ADMIN')")
    @GetMapping("/changeStatus")
    public HttpEntity<?> changeStatus(@RequestParam(value = "groupId") Integer groupId,
                                      @RequestParam(value = "status") String status) {
        ApiResponse apiResponse = groupService.changeStatus(groupId, status);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }


}
