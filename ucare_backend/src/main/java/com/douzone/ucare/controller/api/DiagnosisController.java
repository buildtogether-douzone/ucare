package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.service.DiagnosisService;

@RestController
@RequestMapping("/api/diagnosis")
public class DiagnosisController {
	
	@Autowired
	private DiagnosisService diagnosisService;
	
	@GetMapping("/retrieveByPatientNo/{patientNo}")
	public ResponseEntity<?> retrieveByPatientNo(@PathVariable("patientNo") Long patientNo) {
		return new ResponseEntity<>(diagnosisService.retrieveByPatientNo(patientNo), HttpStatus.OK);
	}
}