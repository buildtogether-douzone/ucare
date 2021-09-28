package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.PatientRepository;
import com.douzone.ucare.vo.PatientVo;
import com.douzone.ucare.vo.UserVo;

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
	
	public PatientVo retrieve(Long patientNo) {
		return PatientRepository.retrieve(patientNo);
	}
	
	public int update(PatientVo patient) {
		return PatientRepository.update(patient);
	}
	
	public int updateDiagnosis(PatientVo patient) {
		return PatientRepository.updateDiagnosis(patient);
	}
	
	public int ssnOverlap(PatientVo patient) {
		return PatientRepository.ssnOverlap(patient);
	}
}
