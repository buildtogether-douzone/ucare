package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.service.PrescriptionService;
import com.douzone.ucare.vo.PrescriptionVo;

@RestController
@RequestMapping("/api/prescription")
public class PrescriptionController {
	
	@Autowired
	private PrescriptionService prescriptionService;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody PrescriptionVo data) {
		return new ResponseEntity<>(prescriptionService.create(data), HttpStatus.OK);
	}
	
	@GetMapping("/retrieveCureYN/{date}")
	public ResponseEntity<?> retrieveCureYN(@PathVariable("date") String date) {
		return new ResponseEntity<>(prescriptionService.retrieveCureYN(date), HttpStatus.OK);
	}
	
	@GetMapping("/retrieveByDiagnosisNo/{diagnosisNo}")
	public ResponseEntity<?> retrieveByDiagnosisNo(@PathVariable("diagnosisNo") Long diagnosisNo) {
		return new ResponseEntity<>(prescriptionService.retrieveByDiagnosisNo(diagnosisNo), HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> update(@RequestBody PrescriptionVo data) {
		return new ResponseEntity<>(prescriptionService.update(data), HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteByPrescriptionNo/{prescriptionNo}")
	public ResponseEntity<?> delete(@PathVariable("prescriptionNo") Long prescriptionNo) {
		return new ResponseEntity<>(prescriptionService.deleteByPrescriptionNo(prescriptionNo), HttpStatus.OK);
	}
	
}