package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.ucare.service.FileUploadService;
import com.douzone.ucare.service.UserService;
import com.douzone.ucare.vo.UserVo;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private FileUploadService fileUploadService;
	
	@PostMapping("/add")
	public ResponseEntity<?> add(@RequestBody UserVo user) {
		return new ResponseEntity<>(userService.addUser(user), HttpStatus.OK);
	}
	
	@PostMapping("/fetchUser")
	public ResponseEntity<?> fetchUser(@RequestBody UserVo user) {
		return new ResponseEntity<>(userService.fetchUser(user), HttpStatus.OK);
	}

	@PutMapping("/update")
	public ResponseEntity<?> update(@RequestPart("user") UserVo user, @RequestPart(value="file", required = false) MultipartFile file) {
		if(file != null) user.setImage(fileUploadService.restore(file));
		return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
	}
	
	
}