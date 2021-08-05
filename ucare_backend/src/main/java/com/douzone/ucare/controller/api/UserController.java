package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.dto.JsonResult;
import com.douzone.ucare.service.UserService;
import com.douzone.ucare.vo.UserVo;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController("userControllerApi")
@RequestMapping("/ucare_backend/user")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	@PostMapping("/add")
	public JsonResult add(@RequestBody UserVo user) {
		userService.addUser(user);
		return JsonResult.success(user);
	}
}