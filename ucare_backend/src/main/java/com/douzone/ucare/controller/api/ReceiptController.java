package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.service.ReceiptService;
import com.douzone.ucare.vo.ReceiptVo;

@RestController
@RequestMapping("/api/receipt")
public class ReceiptController {
	
	@Autowired
	private ReceiptService receiptService;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody ReceiptVo receipt) {
		return new ResponseEntity<>(receiptService.create(receipt), HttpStatus.OK);
	}
	
	@GetMapping("/retrieveAll/{patientNo}")
	public ResponseEntity<?> retrieveAll(@PathVariable("patientNo") Long patientNo) {
		return new ResponseEntity<>(receiptService.retrieveAll(patientNo), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{receiptNo}")
	public ResponseEntity<?> delete(@PathVariable("receiptNo") Long receiptNo) {
		return new ResponseEntity<>(receiptService.delete(receiptNo), HttpStatus.OK);
	}
}