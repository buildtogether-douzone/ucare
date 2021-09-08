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
	
	public int create(DiagnosisVo data) {
		return DiagnosisRepository.create(data);
	}
	
	public List<DiagnosisVo> retrieveByPatientNo(Long patientNo) {
		return DiagnosisRepository.retrieveByPatientNo(patientNo);
	}
	
	public DiagnosisVo retrieveByReceiptNo(Long receiptNo) {
		return DiagnosisRepository.retrieveByReceiptNo(receiptNo);
	}
}
