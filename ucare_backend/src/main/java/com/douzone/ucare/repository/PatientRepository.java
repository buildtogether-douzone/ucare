package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.PatientVo;
import com.douzone.ucare.vo.ReceiptVo;

@Repository
public class PatientRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public int create(PatientVo patient) {
		return sqlSession.insert("patient.create", patient);
	}

	public List<PatientVo> retrieveAll() {
		return sqlSession.selectList("patient.retrieveAll");
	}
	
	public List<ReceiptVo> retrieve(Long patientNo) {
		return sqlSession.selectList("patient.retrieve", patientNo);
	}

	public int update(PatientVo patient) {
		return sqlSession.update("patient.update", patient);
	}
}


