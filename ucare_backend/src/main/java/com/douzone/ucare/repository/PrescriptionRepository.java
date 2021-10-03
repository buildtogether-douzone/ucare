package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.PrescriptionVo;
import com.douzone.ucare.vo.ReceiptVo;

@Repository
public class PrescriptionRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public int create(PrescriptionVo data) {
		return sqlSession.insert("prescription.create", data);
	}
	
	public List<ReceiptVo> retrieveCureYN(String date) {
		return sqlSession.selectList("prescription.retrieveCureYN", date);
	}
	
	public List<ReceiptVo> retrieveByDiagnosisNo(Long diagnosisNo) {
		return sqlSession.selectList("prescription.retrieveByDiagnosisNo", diagnosisNo);
	}
	
	public int update(PrescriptionVo data) {
		return sqlSession.update("prescription.update", data);
	}
	
	public int deleteByPrescriptionNo(Long prescriptionNo) {	
		return sqlSession.delete("prescription.deleteByPrescriptionNo", prescriptionNo);
	}
	
}