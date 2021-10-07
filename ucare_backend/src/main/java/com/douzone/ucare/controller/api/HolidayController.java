package com.douzone.ucare.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.service.HolidayService;
import com.douzone.ucare.vo.HolidayVo;

@RestController
@RequestMapping("/api/holiday")
public class HolidayController {
	
	@Autowired
	private HolidayService holidayService;
	
	@GetMapping("/retrieve/{date}")
	public ResponseEntity<?> retrieve(@PathVariable("date") String date) {
		return new ResponseEntity<>(holidayService.retrieve(date), HttpStatus.OK);
	}

	@PostMapping("/update")
	public ResponseEntity<?> update(@RequestBody List<HolidayVo> data) {
		return new ResponseEntity<>(holidayService.update(data), HttpStatus.OK);
	}
}