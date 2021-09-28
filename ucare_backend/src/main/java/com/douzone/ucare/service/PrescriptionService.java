package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.PrescriptionRepository;
import com.douzone.ucare.vo.ReceiptVo;

@Service
public class PrescriptionService {
	
	@Autowired
	private PrescriptionRepository prescriptionRepository;
	
	public List<ReceiptVo> retrieveCureYN(String date) {
		return prescriptionRepository.retrieveCureYN(date);
	}
}