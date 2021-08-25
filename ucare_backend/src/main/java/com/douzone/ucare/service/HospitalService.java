package com.douzone.ucare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.HospitalRepository;
import com.douzone.ucare.vo.HospitalVo;

@Service
public class HospitalService {
	
	@Autowired
	private HospitalRepository hospitalRepository;

	public HospitalVo fetchInfo() {
		return hospitalRepository.fetchInfo();
	}

	public int updateInfo(HospitalVo hospital) {
		return hospitalRepository.updateInfo(hospital);
	}

}
