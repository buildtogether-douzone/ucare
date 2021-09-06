package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	

	
}