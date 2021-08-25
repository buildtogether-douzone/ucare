package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.MedicineRepository;
import com.douzone.ucare.vo.MedicineVo;

@Service
public class MedicineService {
	@Autowired
	private MedicineRepository medicineRepository;
	
	public int create(MedicineVo data) {
		return medicineRepository.create(data);
	}
	
	public int excelCreate(MedicineVo data) {
		return medicineRepository.excelCreate(data);
	}

	public List<MedicineVo> retrieveAll() {
		return medicineRepository.retrieveAll();
	}

	public int update(MedicineVo data) {
		return medicineRepository.update(data);
	}

	public int delete(int medicineNo) {
		return medicineRepository.delete(medicineNo);
	}

}
