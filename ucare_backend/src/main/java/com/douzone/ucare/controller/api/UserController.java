package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.dto.JsonResult;
import com.douzone.ucare.service.UserService;
import com.douzone.ucare.vo.UserVo;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@CrossOrigin(origins = "*")
	@PostMapping("/add")
	public JsonResult add(@RequestBody UserVo user) {
		return JsonResult.success(userService.addUser(user));
	}
}