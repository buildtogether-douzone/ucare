package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.dto.JsonResult;
import com.douzone.ucare.service.ReceiptService;
import com.douzone.ucare.vo.PatientVo;

@RestController
@RequestMapping("/api/receipt")
public class ReceiptController {
	
	@Autowired
	private ReceiptService receiptService;
	
//	@CrossOrigin(origins = "*")
//	@PostMapping("/create")
//	public JsonResult addPatient(@RequestBody PatientVo patient) {
//		return JsonResult.success(patientService.create(patient));
//	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/retrieveAll")
	public JsonResult retrieveAll() {
		return JsonResult.success(receiptService.retrieveAll());
	}
}