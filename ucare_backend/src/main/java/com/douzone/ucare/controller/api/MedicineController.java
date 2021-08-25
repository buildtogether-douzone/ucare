package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.service.FileUploadService;
import com.douzone.ucare.service.MedicineService;
import com.douzone.ucare.vo.MedicineVo;

@RestController
@RequestMapping("/api/medicine")
public class MedicineController {
	
	@Autowired
	private MedicineService medicineService;
	
	@Autowired
	private FileUploadService fileUploadService;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestBody MedicineVo data) {
		return new ResponseEntity<>(medicineService.create(data), HttpStatus.OK);
	}
	
	@PostMapping("/excelCreate")
	public ResponseEntity<?> excelCreate(@RequestBody MedicineVo data) {
		return new ResponseEntity<>(medicineService.excelCreate(data), HttpStatus.OK);
	}
	
	@GetMapping("/retrieveAll")
	public ResponseEntity<?> retrieveAll() {
		return new ResponseEntity<>(medicineService.retrieveAll(), HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> update(@RequestBody MedicineVo data) {
		return new ResponseEntity<>(medicineService.update(data), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{medicineNo}")
	public ResponseEntity<?> delete(@PathVariable("medicineNo") int medicineNo) {
		return new ResponseEntity<>(medicineService.delete(medicineNo), HttpStatus.OK);
	}
}