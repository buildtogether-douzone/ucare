package com.douzone.ucare.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.ReservationRepository;
import com.douzone.ucare.vo.ReservationVo;

@Service
public class ReservationService {
	
	@Autowired
	private ReservationRepository reservationRepository;

	public int create(ReservationVo reservation) {
		return reservationRepository.create(reservation);
	}

	public List<ReservationVo> retrieveAll() {
		return reservationRepository.retrieveAll();
	}
	
	public int delete(Long revNo) {
	return reservationRepository.delete(revNo);
	}

}
