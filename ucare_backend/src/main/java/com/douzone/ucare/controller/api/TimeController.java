package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.service.TimeService;

@RestController
@RequestMapping("/api/time")
public class TimeController {
	
	@Autowired
	private TimeService timeService;

	@PutMapping("/update/{date}")
	public ResponseEntity<?> update(@PathVariable("date") String date) {
		return new ResponseEntity<>(timeService.update(date), HttpStatus.OK);
	}
}