package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.DiagnosisRepository;
import com.douzone.ucare.vo.DiagnosisVo;

@Service
public class DiagnosisService {
	
	@Autowired
	private DiagnosisRepository DiagnosisRepository;
	
	public List<DiagnosisVo> retrieveByPatientNo(Long patientNo) {
		return DiagnosisRepository.retrieveByPatientNo(patientNo);
	}
}
