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

import com.douzone.ucare.service.ReservationService;
import com.douzone.ucare.vo.ReservationVo;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
	
	@Autowired
	private ReservationService reservationService;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody ReservationVo reservation) {
		return new ResponseEntity<>(reservationService.create(reservation), HttpStatus.OK);
	}
	
	@GetMapping("/retrieveAll")
	public ResponseEntity<?> retrieveAll() {
		return new ResponseEntity<>(reservationService.retrieveAll(), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{revNo}")
	public ResponseEntity<?> delete(@PathVariable("revNo") Long revNo) {
		return new ResponseEntity<>(reservationService.delete(revNo), HttpStatus.OK);
	}
	

	
}