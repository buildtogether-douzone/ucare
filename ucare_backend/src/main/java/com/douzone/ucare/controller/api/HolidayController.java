package com.douzone.ucare.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

	@PostMapping("/update")
	public ResponseEntity<?> update(@RequestBody List<HolidayVo> data) {
		return new ResponseEntity<>(holidayService.update(data), HttpStatus.OK);
	}
}