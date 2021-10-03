package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.PrescriptionRepository;
import com.douzone.ucare.vo.PrescriptionVo;
import com.douzone.ucare.vo.ReceiptVo;

@Service
public class PrescriptionService {
	
	@Autowired
	private PrescriptionRepository prescriptionRepository;
	
	public int create(PrescriptionVo data) {
		return prescriptionRepository.create(data);
	}
	
	public List<ReceiptVo> retrieveCureYN(String date) {
		return prescriptionRepository.retrieveCureYN(date);
	}
	
	public List<ReceiptVo> retrieveByDiagnosisNo(Long diagnosisNo) {
		return prescriptionRepository.retrieveByDiagnosisNo(diagnosisNo);
	}
	
	public int update(PrescriptionVo data) {
		return prescriptionRepository.update(data);
	}
	
	public int deleteByPrescriptionNo(Long diseaseNo) {
		return prescriptionRepository.deleteByPrescriptionNo(diseaseNo);
	}
}