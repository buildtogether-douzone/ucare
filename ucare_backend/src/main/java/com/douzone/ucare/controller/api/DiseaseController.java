package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.service.DiseaseService;
import com.douzone.ucare.service.FileUploadService;
import com.douzone.ucare.vo.DiseaseVo;

@RestController
@RequestMapping("/api/disease")
public class DiseaseController {
	
	@Autowired
	private DiseaseService diseaseService;
	
	@Autowired
	private FileUploadService fileUploadService;
	
	@CrossOrigin(origins = "*")
	@PostMapping("/create")
	public ResponseEntity<?> addPatient(@RequestBody DiseaseVo data) {
		return new ResponseEntity<>(diseaseService.create(data), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/retrieveAll")
	public ResponseEntity<?> retrieveAll() {
		return new ResponseEntity<>(diseaseService.retrieveAll(), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping("/update")
	public ResponseEntity<?> update(@RequestBody DiseaseVo data) {
		return new ResponseEntity<>(diseaseService.update(data), HttpStatus.OK);
	}
	
	@CrossOrigin(origins = "*")
	@DeleteMapping("/delete/{diseaseNo}")
	public ResponseEntity<?> delete(@PathVariable int diseaseNo) {
		return new ResponseEntity<>(diseaseService.delete(diseaseNo), HttpStatus.OK);
	}
}