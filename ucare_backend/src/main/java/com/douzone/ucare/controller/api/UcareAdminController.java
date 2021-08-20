package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.dto.JsonResult;
import com.douzone.ucare.service.AdminService;
import com.douzone.ucare.vo.UserVo;

@RestController
@RequestMapping("/api/admin")
public class UcareAdminController {
	
	@Autowired
	private AdminService adminService;
	
	@CrossOrigin(origins = "*")
	@GetMapping("/retrieveAll")
	public JsonResult retrieveAll() {
		return JsonResult.success(adminService.retrieveAll());
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping("/update")
	public JsonResult update(@RequestBody UserVo data) {
		return JsonResult.success(adminService.update(data));
	}
}