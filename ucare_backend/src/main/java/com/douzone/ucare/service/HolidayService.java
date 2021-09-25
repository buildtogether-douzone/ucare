package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.HolidayRepository;
import com.douzone.ucare.vo.HolidayVo;

@Service
public class HolidayService {
	
	@Autowired
	private HolidayRepository holidayRepository;
	
	public List<HolidayVo> retrieve(String date) {
		return holidayRepository.retrieve(date);
	}
	
	public int update(List<HolidayVo> data) {
		int result = 0;
		
		for(int i = 0; i < data.size(); i++) {
			result = holidayRepository.update(data.get(i));
		}
		
		return result;
	}
}