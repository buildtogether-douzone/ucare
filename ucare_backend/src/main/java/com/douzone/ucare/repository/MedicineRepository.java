package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.MedicineVo;

@Repository
public class MedicineRepository {
	@Autowired
	private SqlSession sqlSession;
	
	public int create(MedicineVo data) {
		sqlSession.insert("medicine.create", data);
		
		return data.getMedicineNo();
	}
	
	public int excelCreate(MedicineVo data) {
		return sqlSession.update("medicine.createExcel", data);
	}

	public List<MedicineVo> retrieveAll() {
		return sqlSession.selectList("medicine.retrieveAll");
	}

	public int update(MedicineVo data) {
		return sqlSession.update("medicine.update", data);
	}

	public int delete(int medicineNo) {
		return sqlSession.delete("medicine.delete", medicineNo);
	}

}
