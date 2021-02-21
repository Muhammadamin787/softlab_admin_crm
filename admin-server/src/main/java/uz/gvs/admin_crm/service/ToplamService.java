package uz.gvs.admin_crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.gvs.admin_crm.entity.Toplam;
import uz.gvs.admin_crm.entity.Weekday;
import uz.gvs.admin_crm.entity.enums.WeekdayName;
import uz.gvs.admin_crm.payload.ApiResponse;
import uz.gvs.admin_crm.payload.PageableDto;
import uz.gvs.admin_crm.payload.ToplamDto;
import uz.gvs.admin_crm.repository.CourseRepository;
import uz.gvs.admin_crm.repository.TeacherRepository;
import uz.gvs.admin_crm.repository.ToplamRepository;
import uz.gvs.admin_crm.repository.WeekdayRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ToplamService {
    @Autowired
    ToplamRepository toplamRepository;
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    CourseRepository courseRepository;
    @Autowired
    TeacherRepository teacherRepository;
    @Autowired
    WeekdayRepository weekdayRepository;

    public ApiResponse saveToplam(ToplamDto toplamDto) {
        try {
            if (toplamDto.getName().isEmpty() || toplamDto.getCourseId() == null || toplamDto.getTeacherId() == null
                    || toplamDto.getWeekdays().isEmpty() || toplamDto.getTime().isEmpty())
                return apiResponseService.notEnoughErrorResponse();
            Toplam toplam = new Toplam();
            toplam.setActive(toplamDto.isActive());
            toplam.setName(toplamDto.getName());
            toplam.setTime(toplamDto.getTime());
            toplam.setTeacher(teacherRepository.findById(toplamDto.getTeacherId()).orElseThrow(() -> new ResourceNotFoundException("get teacher")));
            toplam.setCourse(courseRepository.findById(toplamDto.getCourseId()).orElseThrow(() -> new ResourceNotFoundException("get course")));
            Set<Weekday> weekdayNameSet = new HashSet<>();
            for (String weekday : toplamDto.getWeekdays()) {
                Optional<Weekday> byWeekday = weekdayRepository.findByWeekdayName(WeekdayName.valueOf(weekday));
                weekdayNameSet.add(byWeekday.get());
            }
            toplam.setWeekdays(weekdayNameSet);
            toplamRepository.save(toplam);
            return apiResponseService.saveResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse editToplam(Integer id, ToplamDto toplamDto) {
        try {
            Optional<Toplam> byId = toplamRepository.findById(id);
            if (!byId.isPresent())
                return apiResponseService.notFoundResponse();

            Toplam toplam = byId.get();
            toplam.setActive(toplamDto.isActive());
            toplam.setName(toplamDto.getName());
            toplam.setName(toplamDto.getTime());
            toplam.setTeacher(teacherRepository.findById(toplamDto.getTeacherId()).orElseThrow(() -> new ResourceNotFoundException("get teacher")));
            toplam.setCourse(courseRepository.findById(toplamDto.getCourseId()).orElseThrow(() -> new ResourceNotFoundException("get course")));
            Set<Weekday> weekdayNameSet = new HashSet<>();
            for (String weekday : toplamDto.getWeekdays()) {
                Optional<Weekday> byWeekday = weekdayRepository.findByWeekdayName(WeekdayName.valueOf(weekday));
                weekdayNameSet.add(byWeekday.get());
            }
            toplam.setWeekdays(weekdayNameSet);
            toplamRepository.save(toplam);
            return apiResponseService.updatedResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getOneToplam(Integer id) {
        try {
            return apiResponseService.getResponse(toplamRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("get toplam")));
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse getToplamList(int page, int size) {
        try {
            Page<Toplam> all = toplamRepository.findAll(PageRequest.of(page, size));
            List<ToplamDto> collect = all.getContent().stream().map(this::makeToplamDto).collect(Collectors.toList());
            return apiResponseService.getResponse(
                    new PageableDto(
                            all.getTotalElements(),
                            all.getNumber(),
                            all.getSize(),
                            collect
                    ));
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ToplamDto makeToplamDto(Toplam toplam) {
        return new ToplamDto(
                toplam.getId(),
                toplam.getName(),
                toplam.getCourse().getId(),
                toplam.getTeacher().getId(),
                toplam.getTeacher().getUser().getFullName(),
                toplam.getWeekdays(),
                toplam.getTime(),
                toplam.isActive(),
                toplam.getCourse().getName()
        );
    }

    public ApiResponse getToplamListForSelect() {
        try {
            List<ToplamDto> collect = toplamRepository.findAllByActive(true).stream().map(this::makeToplamDto).collect(Collectors.toList());
            return apiResponseService.getResponse(collect);
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse deleteToplam(Integer id) {
        try {
            toplamRepository.deleteById(id);
            return apiResponseService.deleteResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }
}
