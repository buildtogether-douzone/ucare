package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.AdminRepository;
import com.douzone.ucare.vo.SiteVo;
import com.douzone.ucare.vo.UserVo;

@Service
public class AdminService {
	@Autowired
	private AdminRepository adminRepository;
	
	public SiteVo viewPage() {
		SiteVo vo = adminRepository.findAll();
		return vo;
	}
	
	public List<UserVo> retrieveAll() {
		return adminRepository.retrieveAll();
	}

	public int update(UserVo data) {
		return adminRepository.update(data);
	}
}
