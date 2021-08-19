package com.douzone.ucare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.PatientRepository;
import com.douzone.ucare.vo.PatientVo;

@Service
public class PatientService {
	
	@Autowired
	private PatientRepository PatientRepository;

	public int addPatient(PatientVo patient) {
		return PatientRepository.addPatient(patient);
	}

}
