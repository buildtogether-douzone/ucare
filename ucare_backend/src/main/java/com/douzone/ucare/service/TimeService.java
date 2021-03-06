package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.TimeRepository;
import com.douzone.ucare.vo.ReceiptVo;
import com.douzone.ucare.vo.TimeVo;

@Service
public class TimeService {
	
	@Autowired
	private TimeRepository timeRepository;
	
	public int create(TimeVo data) {
		return timeRepository.create(data);
	}

	public int update(String date) {
		return timeRepository.update(date);
	}

	public int updateByCancel(ReceiptVo data) {
		return timeRepository.updateByCancel(data);
	}
	
	public List<TimeVo> retrieveTime(String date) {
		return timeRepository.retrieveTime(date);
	}
	
	public int updateTime(TimeVo data) {
		return timeRepository.updateTime(data);
	}

	public int updateDelete(TimeVo data) {
		return timeRepository.updateDelete(data);
	}
}