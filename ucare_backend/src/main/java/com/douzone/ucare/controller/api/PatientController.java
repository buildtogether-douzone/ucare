package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.service.PatientService;
import com.douzone.ucare.vo.PatientVo;

@RestController
@RequestMapping("/api/patient")
public class PatientController {
	
	@Autowired
	private PatientService patientService;
	
	@CrossOrigin(origins = "*")
	@PostMapping("/create")
	public ResponseEntity<?> addPatient(@RequestBody PatientVo patient) {
		return new ResponseEntity<>(patientService.create(patient), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/retrieveAll")
	public ResponseEntity<?> retrieveAll() {
		return new ResponseEntity<>(patientService.retrieveAll(), HttpStatus.OK);
	}
}