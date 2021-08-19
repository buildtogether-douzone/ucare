package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.dto.JsonResult;
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
	public JsonResult addPatient(@RequestBody DiseaseVo data) {
		return JsonResult.success(diseaseService.create(data));
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/retrieveAll")
	public JsonResult retrieveAll() {
		return JsonResult.success(diseaseService.retrieveAll());
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping("/update")
	public JsonResult update(@RequestBody DiseaseVo data) {
		return JsonResult.success(diseaseService.update(data));
	}
	
	@CrossOrigin(origins = "*")
	@DeleteMapping("/delete/{diseaseNo}")
	public JsonResult delete(@PathVariable int diseaseNo) {
		return JsonResult.success(diseaseService.delete(diseaseNo));
	}
}