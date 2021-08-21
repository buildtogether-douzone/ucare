package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.ReceiptVo;

@Repository
public class ReceiptRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
//	public int create(PatientVo patient) {
//		return sqlSession.insert("patient.create", patient);
//	}

	public List<ReceiptVo> retrieveAll() {
		return sqlSession.selectList("receipt.retrieveAll");
	}

}


