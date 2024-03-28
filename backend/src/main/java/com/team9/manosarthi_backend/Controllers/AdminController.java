package com.team9.manosarthi_backend.Controllers;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.team9.manosarthi_backend.Entities.*;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Filters.DoctorFilter;
import com.team9.manosarthi_backend.Filters.SupervisorFilter;
import com.team9.manosarthi_backend.Services.AdminService;
import com.team9.manosarthi_backend.Services.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Validated
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Autowired
    private UserService userService;


    @RequestMapping("/index")
    public String dashboard()
    {
        System.out.println("step1");
        return "admin_dashboard";
    }


    @PostMapping("/add")
    public String addUser(@RequestBody User user) {
        userService.addUser(user);
        return "user_success";
    }


    //Add doctor
    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    //Doctor
    @Validated
    @PostMapping("/doctor")
    public ResponseEntity<MappingJacksonValue> addDoctor(@Valid @RequestBody Doctor doctor){

       try {

            Doctor doc =  adminService.adddoctor(doctor);

            Set<String> doctorFilterProperties = new HashSet<>();
            doctorFilterProperties.add("firstname");
            doctorFilterProperties.add("lastname");
            doctorFilterProperties.add("email");
            doctorFilterProperties.add("subdistrictcode");

            Set<String> subDistrictFilterProperties = new HashSet<>();
            subDistrictFilterProperties.add("code");
            subDistrictFilterProperties.add("name");
            subDistrictFilterProperties.add("district");

            DoctorFilter<Doctor> doctorFilter = new DoctorFilter<Doctor>(doc);
            // Proceed with valid data
            return ResponseEntity.ok(doctorFilter.getDoctorFilter(doctorFilterProperties,subDistrictFilterProperties));
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while adding the doctor.",ex.getMessage());
        }

    }

    @GetMapping("/doctor")
    public MappingJacksonValue viewAllDoctors(@RequestParam("pagenumber") int pagenumber){
        int pagesize = 5;
        try {
            List<Doctor> doctors = adminService.viewAllDoctor(pagenumber, pagesize);

            if (doctors == null) {
                throw new APIRequestException("No doctors found");
            }
            Set<String> doctorFilterProperties = new HashSet<>();
            doctorFilterProperties.add("firstname");
            doctorFilterProperties.add("lastname");
            doctorFilterProperties.add("email");
            doctorFilterProperties.add("subdistrictcode");

            Set<String> subDistrictFilterProperties = new HashSet<>();
            subDistrictFilterProperties.add("code");
            subDistrictFilterProperties.add("name");
            subDistrictFilterProperties.add("district");

            DoctorFilter<List<Doctor>> doctorFilter = new DoctorFilter<List<Doctor>>(doctors);

            return doctorFilter.getDoctorFilter(doctorFilterProperties, subDistrictFilterProperties);
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while getting doctors",ex.getMessage());
        }
    }



    @GetMapping("/doctor/district")
    public MappingJacksonValue viewDoctorByDistrict(@RequestParam("districtcode") int districtcode,@RequestParam("pagenumber") int pagenumber){
        int pagesize=5;
        try {
            List<Doctor> doctors = adminService.viewDoctorByDistrict(districtcode, pagenumber, pagesize);
            if (doctors == null) {
                throw new APIRequestException("No doctors found");
            }
            Set<String> doctorFilterProperties = new HashSet<>();
            doctorFilterProperties.add("firstname");
            doctorFilterProperties.add("lastname");
            doctorFilterProperties.add("email");
            doctorFilterProperties.add("subdistrictcode");

            Set<String> subDistrictFilterProperties = new HashSet<>();
            subDistrictFilterProperties.add("code");
            subDistrictFilterProperties.add("name");
            subDistrictFilterProperties.add("district");

            DoctorFilter<List<Doctor>> doctorFilter = new DoctorFilter<List<Doctor>>(doctors);
            return doctorFilter.getDoctorFilter(doctorFilterProperties, subDistrictFilterProperties);
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while getting doctors of district",ex.getMessage());
        }
    }

    @GetMapping("/doctor/subdistrict/")
    public MappingJacksonValue viewDoctorBySubDistrict(@RequestParam("subdistrictcode") int subdistrictcode){
        try {
            List<Doctor> doctors = adminService.viewDoctorBySubDistrict(subdistrictcode);
            if (doctors.isEmpty()) {
                throw new APIRequestException("No doctors found");
            }
            Set<String> doctorFilterProperties = new HashSet<>();
            doctorFilterProperties.add("firstname");
            doctorFilterProperties.add("lastname");
            doctorFilterProperties.add("email");
            doctorFilterProperties.add("subdistrictcode");

            Set<String> subDistrictFilterProperties = new HashSet<>();
            subDistrictFilterProperties.add("code");
            subDistrictFilterProperties.add("name");
            subDistrictFilterProperties.add("district");

            DoctorFilter<List<Doctor>> doctorFilter = new DoctorFilter<List<Doctor>>(doctors);
            return doctorFilter.getDoctorFilter(doctorFilterProperties, subDistrictFilterProperties);
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while getting doctors of subdistrict",ex.getMessage());
        }
        }

    @Validated
    @PostMapping("/supervisor")
    public MappingJacksonValue addSupervisor(@Valid @RequestBody Supervisor supervisor){
        try {
            Supervisor sup = adminService.addSupervisor(supervisor);

            Set<String> supervisorFilterProperties = new HashSet<>();
            supervisorFilterProperties.add("firstname");
            supervisorFilterProperties.add("lastname");
            supervisorFilterProperties.add("email");
            supervisorFilterProperties.add("subdistrictcode");


            Set<String> subDistrictFilterProperties = new HashSet<>();
            subDistrictFilterProperties.add("code");
            subDistrictFilterProperties.add("name");
            subDistrictFilterProperties.add("district");

            SupervisorFilter<Supervisor> supervisorFilter = new SupervisorFilter<>(sup);

            return supervisorFilter.getSupervisorrFilter(supervisorFilterProperties, subDistrictFilterProperties);
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while adding the supervisor.",ex.getMessage());
        }
    }

    @Validated
    @PostMapping("/questionarrie")
    public MappingJacksonValue addQuestionarrie(@Valid @RequestBody Questionarrie questionarrie) throws Exception
    {
        try {
            Questionarrie que = adminService.addQuestionarrie(questionarrie);
            SimpleBeanPropertyFilter questionfilter = SimpleBeanPropertyFilter.filterOutAllExcept("question_id", "question", "default_ans", "type");
            FilterProvider filterProvider = new SimpleFilterProvider().addFilter("QuestionJSONFilter", questionfilter);
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(que);
            mappingJacksonValue.setFilters(filterProvider);
            return mappingJacksonValue;
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while adding the questionarrie",ex.getMessage());
        }
    }

    @Validated
    @PostMapping("/med-questionarrie")
    public MappingJacksonValue addMedQuestionarrie(@Valid @RequestBody MedicalQue medquest) throws Exception
    {
        try {
            MedicalQue que = adminService.addMedicalQuestionarrie(medquest);
            SimpleBeanPropertyFilter questionfilter = SimpleBeanPropertyFilter.filterOutAllExcept("question_id", "question");
            FilterProvider filterProvider = new SimpleFilterProvider().addFilter("MedicalQueJSONFilter", questionfilter);
            MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(que);
            mappingJacksonValue.setFilters(filterProvider);
            return mappingJacksonValue;
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while adding the medical questionarrie",ex.getMessage());
        }
    }

}
