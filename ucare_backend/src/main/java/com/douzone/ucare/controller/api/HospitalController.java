package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.ucare.service.FileUploadService;
import com.douzone.ucare.service.HospitalService;
import com.douzone.ucare.vo.HospitalVo;

@RestController
@RequestMapping("/api/hospital")
public class HospitalController {
	
	@Autowired
	private HospitalService hospitalService;
	
	@Autowired
	private FileUploadService fileUploadService;
	
	@GetMapping("/fetchInfo")
	public ResponseEntity<?> fetchInfo() {
		return new ResponseEntity<>(hospitalService.fetchInfo(), HttpStatus.OK);
	}
	
	@PostMapping("/updateInfo")
	public ResponseEntity<?> updateInfo(
			@RequestPart("data") HospitalVo hospital, 
			@RequestPart("file") MultipartFile file) {
		hospital.setImage(fileUploadService.restore(file));
		return new ResponseEntity<>(hospitalService.updateInfo(hospital), HttpStatus.OK);
	}
}
