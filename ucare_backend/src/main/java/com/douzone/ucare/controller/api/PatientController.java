package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.dto.JsonResult;
import com.douzone.ucare.service.PatientService;
import com.douzone.ucare.vo.PatientVo;

@RestController
@RequestMapping("/api/patient")
public class PatientController {
	
	@Autowired
	private PatientService patientService;
	
	@CrossOrigin(origins = "*")
	@PostMapping("/add")
	public JsonResult addPatient(@RequestBody PatientVo patient) {
		return JsonResult.success(patientService.addPatient(patient));
	}
	
}