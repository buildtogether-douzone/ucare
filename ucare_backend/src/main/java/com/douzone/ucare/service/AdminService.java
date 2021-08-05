package com.douzone.ucare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.AdminRepository;
import com.douzone.ucare.vo.SiteVo;

@Service
public class AdminService {
	@Autowired
	private AdminRepository adminRepository;
	public void update(SiteVo vo) {
		adminRepository.update(vo);
	}
	public SiteVo viewPage() {
		SiteVo vo = adminRepository.findAll();
		return vo;
	}
	
}
