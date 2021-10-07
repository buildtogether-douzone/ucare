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

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private FileUploadService fileUploadService;
	
	@PostMapping("/add")
	@ApiOperation(value="회원가입", notes="회원가입시 실행되는 API")
	public ResponseEntity<?> add(@RequestBody UserVo user) {
		return new ResponseEntity<>(userService.addUser(user), HttpStatus.OK);
	}
	
	@PostMapping("/fetchUser")
	@ApiOperation(value="사용자 정보", notes="사용자 정보를 가져오는 API")
	public ResponseEntity<?> fetchUser(@RequestBody UserVo user) {
		return new ResponseEntity<>(userService.fetchUser(user), HttpStatus.OK);
	}

	@PutMapping("/update")
	@ApiOperation(value="사용자 정보 수정", notes="사용자 정보 수정시 실행되는 API")
	@ApiImplicitParams({
		@ApiImplicitParam(name="user", value="사용자에 대한 변경사항"),
		@ApiImplicitParam(name="file", value="사용자 사진 파일")
	})
	public ResponseEntity<?> update(
			@RequestPart("user") UserVo user, 
			@RequestPart(value="file", required = false) MultipartFile file) {
		if(user.getCheckFile() == "O") fileUploadService.remove(user.getImage());
		if(file != null) user.setImage(fileUploadService.restore(file));
		
		return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
	}
	
	@GetMapping("/retrieveAll")
	@ApiOperation(value="모든 사용자 정보", notes="모든 사용자 정보를 가져오는 API")
	public ResponseEntity<?> retrieveAll() {
		return new ResponseEntity<>(userService.retrieveAll(), HttpStatus.OK);
	}
	
	
}