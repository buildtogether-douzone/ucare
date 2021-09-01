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
	
	public int create(ReceiptVo receipt) {
		return sqlSession.insert("receipt.create", receipt);
	}

	public List<ReceiptVo> retrieveAll(Long patientNo) {
		return sqlSession.selectList("receipt.retrieveAll", patientNo);
	}
	
	public int delete(Long receiptNo) {
		return sqlSession.delete("receipt.delete", receiptNo);
	}
}


