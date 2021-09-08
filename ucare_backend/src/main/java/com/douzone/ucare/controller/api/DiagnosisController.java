package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.service.DiagnosisService;
import com.douzone.ucare.vo.DiagnosisVo;

@RestController
@RequestMapping("/api/diagnosis")
public class DiagnosisController {
	
	@Autowired
	private DiagnosisService diagnosisService;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody DiagnosisVo data) {
		return new ResponseEntity<>(diagnosisService.create(data), HttpStatus.OK);
	}
	
	@GetMapping("/retrieveByPatientNo/{patientNo}")
	public ResponseEntity<?> retrieveByPatientNo(@PathVariable("patientNo") Long patientNo) {
		return new ResponseEntity<>(diagnosisService.retrieveByPatientNo(patientNo), HttpStatus.OK);
	}
	
	@GetMapping("/retrieveByReceiptNo/{receiptNo}")
	public ResponseEntity<?> retrieveByReceiptNo(@PathVariable("receiptNo") Long receiptNo) {
		return new ResponseEntity<>(diagnosisService.retrieveByReceiptNo(receiptNo), HttpStatus.OK);
	}
}