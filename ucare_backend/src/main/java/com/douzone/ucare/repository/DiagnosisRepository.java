package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.DiagnosisVo;

@Repository
public class DiagnosisRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public List<DiagnosisVo> retrieveByPatientNo(Long patientNo) {
		return sqlSession.selectList("diagnosis.retrieveByPatientNo", patientNo);
	}
}