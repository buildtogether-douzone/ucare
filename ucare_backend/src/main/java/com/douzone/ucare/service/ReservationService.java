package com.douzone.ucare.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.ReceiptRepository;
import com.douzone.ucare.repository.ReservationRepository;
import com.douzone.ucare.vo.ReceiptVo;
import com.douzone.ucare.vo.ReservationVo;

@Service
public class ReservationService {
	
	@Autowired
	private ReservationRepository reservationRepository;
	
	@Autowired
	private ReceiptRepository receiptRepository;

	public int create(ReservationVo reservation) {
		List<ReservationVo> reservationList = reservationRepository.retrieveByDuplication(reservation);
		List<ReceiptVo> receiptList = receiptRepository.retrieveByDuplication(reservation.getPatientNo());
		
		if(reservationList.size() != 0 || receiptList.size() != 0) 
			return 0;
		else 
			return reservationRepository.create(reservation);
	}

	public List<ReservationVo> retrieveAll() {
		return reservationRepository.retrieveAll();
	}
	
	public int update(Long revNo) {
		return reservationRepository.update(revNo);
	}
	
	public int delete(Long revNo) {
		return reservationRepository.delete(revNo);
	}

}
