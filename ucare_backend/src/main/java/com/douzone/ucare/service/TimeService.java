package com.douzone.ucare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.TimeRepository;
import com.douzone.ucare.vo.ReceiptVo;

@Service
public class TimeService {
	
	@Autowired
	private TimeRepository timeRepository;

	public int update(String date) {
		return timeRepository.update(date);
	}

	public int updateByCancel(ReceiptVo data) {
		return timeRepository.updateByCancel(data);
	}
}