package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.PatientRepository;
import com.douzone.ucare.vo.DiseaseVo;
import com.douzone.ucare.vo.PatientVo;

@Service
public class PatientService {
	
	@Autowired
	private PatientRepository PatientRepository;

	public int create(PatientVo patient) {
		return PatientRepository.create(patient);
	}

	public List<PatientVo> retrieveAll() {
		return PatientRepository.retrieveAll();
	}
}
