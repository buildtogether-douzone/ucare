package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.StatusRepository;
import com.douzone.ucare.vo.MedicineVo;
import com.douzone.ucare.vo.ReceiptVo;

@Service
public class StatusService {
	
	@Autowired
	private StatusRepository statusRepository;

	public List<ReceiptVo> retrieveStatus(String date) {
		return statusRepository.retrieveStatus(date);
	}

	public int update(ReceiptVo data) {
		return statusRepository.update(data);
	}

	public int delete(Long receiptNo) {
		return statusRepository.delete(receiptNo);
	}
}