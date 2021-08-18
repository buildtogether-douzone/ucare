package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.ucare.dto.JsonResult;
import com.douzone.ucare.service.FileUploadService;
import com.douzone.ucare.service.UserService;
import com.douzone.ucare.vo.UserVo;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private FileUploadService fileUploadService;
	
	@CrossOrigin(origins = "*")
	@PostMapping("/login")
	public JsonResult login(@RequestBody UserVo user) {
		return JsonResult.success(userService.login(user));
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("/add")
	public JsonResult add(@RequestBody UserVo user) {
		return JsonResult.success(userService.addUser(user));
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("/fetchUser")
	public JsonResult fetchUser(@RequestBody UserVo user) {
		return JsonResult.success(userService.fetchUser(user));
	}

	@CrossOrigin(origins = "*")
	@PutMapping("/update")
	public JsonResult update(@RequestBody UserVo user, @RequestParam("file") MultipartFile file) {
		user.setImage(fileUploadService.restore(file));
		return JsonResult.success(userService.updateUser(user));
	}
	
}