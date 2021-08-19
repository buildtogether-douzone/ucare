package com.douzone.ucare.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.PatientVo;

@Repository
public class PatientRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public int addPatient(PatientVo patient) {
		return sqlSession.insert("patient.insert", patient);
	}
}
