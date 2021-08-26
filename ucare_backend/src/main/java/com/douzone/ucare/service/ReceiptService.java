package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.ReceiptRepository;
import com.douzone.ucare.vo.ReceiptVo;

@Service
public class ReceiptService {
	
	@Autowired
	private ReceiptRepository ReceiptRepository;

	public int create(ReceiptVo receipt) {
		return ReceiptRepository.create(receipt);
	}

	public List<ReceiptVo> retrieveAll(Long patientNo) {
		return ReceiptRepository.retrieveAll(patientNo);
	}
	
	public int delete(Long receiptNo) {
		return ReceiptRepository.delete(receiptNo);
	}
}