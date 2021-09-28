package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.ReceiptVo;

@Repository
public class PrescriptionRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public List<ReceiptVo> retrieveCureYN(String date) {
		return sqlSession.selectList("prescription.retrieveCureYN", date);
	}
}