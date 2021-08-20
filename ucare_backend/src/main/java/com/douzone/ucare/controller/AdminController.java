package com.douzone.ucare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.ucare.security.Auth;
import com.douzone.ucare.service.AdminService;
import com.douzone.ucare.service.FileUploadService;
import com.douzone.ucare.vo.SiteVo;

@Auth(role="ADMIN")
@Controller
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private FileUploadService fileUploadService;
	
	@RequestMapping("")
	public String main(Model model) {
		SiteVo vo = adminService.viewPage();
		model.addAttribute("siteVo", vo);
		return "admin/main";
	}
	
	@RequestMapping("/guestbook")
	public String guestbook() {
		return "admin/guestbook";
	}
	
	@RequestMapping("/board")
	public String board() {
		return "admin/board";
	}
	
	@RequestMapping("user")
	public String user() {
		return "admin/user";
	}

}
