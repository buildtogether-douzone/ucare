package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.ReceiptRepository;
import com.douzone.ucare.vo.ReceiptVo;

@Service
public class ReceiptService {
	
	@Autowired
	private ReceiptRepository receiptRepository;

	public int create(ReceiptVo receipt) {
		List<ReceiptVo> list = receiptRepository.retrieveByDuplication(receipt);
		
		if(list.size() != 0) 
			return 0;
		else 
			return receiptRepository.create(receipt);
	}

	public List<ReceiptVo> retrieveAll(Long patientNo) {
		return receiptRepository.retrieveAll(patientNo);
	}
	
	public int updateState(ReceiptVo receipt) {
		return receiptRepository.updateState(receipt);
	}
	
	public int delete(Long receiptNo) {
		return receiptRepository.delete(receiptNo);
	}
	
	public int createRev(ReceiptVo receipt) {
		return receiptRepository.createRev(receipt);
	}
	
}