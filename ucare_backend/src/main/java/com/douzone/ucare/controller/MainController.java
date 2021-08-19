package com.douzone.ucare.controller;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.douzone.ucare.service.AdminService;
import com.douzone.ucare.vo.SiteVo;

@Controller
public class MainController {
	@Autowired
	ServletContext application;
	
	@Autowired
	private AdminService adminService;
	
	@RequestMapping("")
	public String index(Model model) {
		System.out.print("!");
		SiteVo vo = adminService.viewPage();
		model.addAttribute("vo", vo);
		application.setAttribute("title", vo.getTitle());
		return"main/index";
	}
}
