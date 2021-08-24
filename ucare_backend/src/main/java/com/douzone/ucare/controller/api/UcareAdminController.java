package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.service.AdminService;
import com.douzone.ucare.vo.UserVo;

@RestController
@RequestMapping("/api/admin")
public class UcareAdminController {
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/retrieveAll")
	public ResponseEntity<?> retrieveAll() {
		return new ResponseEntity<>(adminService.retrieveAll(), HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> update(@RequestBody UserVo data) {
		return new ResponseEntity<>(adminService.update(data), HttpStatus.OK);
	}
}