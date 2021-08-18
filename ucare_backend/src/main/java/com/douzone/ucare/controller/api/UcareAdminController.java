package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.dto.JsonResult;
import com.douzone.ucare.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class UcareAdminController {
	
	@Autowired
	private AdminService adminService;
	
	@CrossOrigin(origins = "*")
	@GetMapping("/loadUsers")
	public JsonResult fetchUser() {
		return JsonResult.success(adminService.fetchUserList());
	}
}