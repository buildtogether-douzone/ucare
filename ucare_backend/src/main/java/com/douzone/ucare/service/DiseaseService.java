package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.DiseaseRepository;
import com.douzone.ucare.vo.DiseaseVo;

@Service
public class DiseaseService {
	@Autowired
	private DiseaseRepository diseaseRepository;
	
	public int create(DiseaseVo data) {
		return diseaseRepository.create(data);
	}

	public List<DiseaseVo> retrieveAll() {
		return diseaseRepository.retrieveAll();
	}

	public int update(DiseaseVo data) {
		return diseaseRepository.update(data);
	}

	public int delete(int diseaseNo) {
		return diseaseRepository.delete(diseaseNo);
	}

}
