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
	
	public int create(DiagnosisVo data) {
		return sqlSession.insert("diagnosis.create", data);
	}
	
	public List<DiagnosisVo> retrieveByPatientNo(Long patientNo) {
		return sqlSession.selectList("diagnosis.retrieveByPatientNo", patientNo);
	}
	
	public DiagnosisVo retrieveByReceiptNo(Long receiptNo) {
		return sqlSession.selectOne("diagnosis.retrieveByReceiptNo", receiptNo);
	}
	
	public int updateByDiagnosisNo(DiagnosisVo data) {
		return sqlSession.update("diagnosis.updateByDiagnosisNo", data);
	}
}