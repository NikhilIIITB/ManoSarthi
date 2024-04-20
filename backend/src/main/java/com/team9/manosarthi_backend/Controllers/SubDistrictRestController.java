package com.team9.manosarthi_backend.Controllers;

import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.team9.manosarthi_backend.Entities.District;
import com.team9.manosarthi_backend.Entities.SubDistrict;
import com.team9.manosarthi_backend.Exceptions.APIRequestException;
import com.team9.manosarthi_backend.Repositories.DistrictRepository;
import com.team9.manosarthi_backend.Repositories.SubDistrictRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@PreAuthorize("permitAll()")
@CrossOrigin(origins = "*")
@RequestMapping("/subdistrict")
public class SubDistrictRestController {
    SubDistrictRepository subDistrictRepository;
    DistrictRepository districtRepository;

    @Autowired
    public SubDistrictRestController(SubDistrictRepository subDistrictRepository, DistrictRepository districtRepository) {
        this.subDistrictRepository = subDistrictRepository;
        this.districtRepository = districtRepository;
    }

    @GetMapping("/")        // gives the list of subdistrict in a district
    public Set<SubDistrict> getSubDistrict(@RequestParam("districtcode") int districtcode, @RequestParam("role") String role,@RequestParam("assigned") boolean assigned){

        try {
            Optional<District> district = districtRepository.findById(districtcode);
            if (district.isEmpty()) {
                throw new APIRequestException("District cannot found");
            }
        Set<SubDistrict> subDistricts=null;

        if(Objects.equals(role, "DOCTOR") && assigned)
        {
            subDistricts = subDistrictRepository.getAssignedDoctorSubDistinct(districtcode);
        }
        else if ( Objects.equals(role, "DOCTOR") && !assigned )
        {
            subDistricts = subDistrictRepository.getNotAssignedDoctorSubDistinct(districtcode);
        }

        else if(Objects.equals(role, "SUPERVISOR") && assigned)
        {
            subDistricts = subDistrictRepository.getAssignedSupervisorSubDistinct(districtcode);
        }
        else if(Objects.equals(role, "SUPERVISOR") && !assigned)
        {
            subDistricts = subDistrictRepository.getNotAssignedSupervisorSubDistinct(districtcode);
        }
            if (subDistricts == null) {
                throw new APIRequestException("SubDistrict cannot found");
            }

            return subDistricts;
        }
        catch (Exception ex)
        {
            throw new APIRequestException("Error while getting subdistrict",ex.getMessage());
        }
    }
}