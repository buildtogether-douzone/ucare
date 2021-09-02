package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.service.StatusService;
import com.douzone.ucare.vo.ReceiptVo;

@RestController
@RequestMapping("/api/status")
public class StatusController {
	
	@Autowired
	private StatusService statusService;
	
	@GetMapping("/retrieve/{date}")
	public ResponseEntity<?> retrieveStatus(@PathVariable("date") String date) {
		return new ResponseEntity<>(statusService.retrieveStatus(date), HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> update(@RequestBody ReceiptVo data) {
		return new ResponseEntity<>(statusService.update(data), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{receiptNo}")
	public ResponseEntity<?> delete(@PathVariable("receiptNo") Long receiptNo) {
		return new ResponseEntity<>(statusService.delete(receiptNo), HttpStatus.OK);
	}
}