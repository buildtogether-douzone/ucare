package com.douzone.ucare.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.ReservationRepository;
import com.douzone.ucare.vo.ReservationVo;

@Service
public class ReservationService {
	
	@Autowired
	private ReservationRepository ReservationRepository;

	public int create(ReservationVo reservation) {
		return ReservationRepository.create(reservation);
	}


}
