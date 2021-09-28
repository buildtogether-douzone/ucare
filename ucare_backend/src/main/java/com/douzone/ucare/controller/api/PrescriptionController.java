package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.service.PrescriptionService;

@RestController
@RequestMapping("/api/prescription")
public class PrescriptionController {
	
	@Autowired
	private PrescriptionService prescriptionService;
	
	@GetMapping("/retrieveCureYN/{date}")
	public ResponseEntity<?> retrieveCureYN(@PathVariable("date") String date) {
		return new ResponseEntity<>(prescriptionService.retrieveCureYN(date), HttpStatus.OK);
	}
	
}