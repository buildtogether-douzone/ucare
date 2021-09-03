package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	
	@PostMapping("/create")
	public ResponseEntity<?> addPatient(@RequestBody PatientVo patient) {
		return new ResponseEntity<>(patientService.create(patient), HttpStatus.OK);
	}
	
	@GetMapping("/retrieveAll")
	public ResponseEntity<?> retrieveAll() {
		return new ResponseEntity<>(patientService.retrieveAll(), HttpStatus.OK);
	}
	
	@GetMapping("/retrieve/{patientNo}")
	public ResponseEntity<?> retrieveAll(@PathVariable("patientNo") Long patientNo) {
		return new ResponseEntity<>(patientService.retrieve(patientNo), HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> update(@RequestBody PatientVo patient) {
		return new ResponseEntity<>(patientService.update(patient), HttpStatus.OK);
	}
}