package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.ReceiptVo;
import com.douzone.ucare.vo.ReservationVo;

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
	
	public List<ReceiptVo> retrieveByDuplication(Long patientNo) {
		return sqlSession.selectList("receipt.retrieveByDuplication", patientNo);
	}
	
	public List<ReceiptVo> retrieveByRevDate(ReservationVo data) {
		return sqlSession.selectList("receipt.retrieveByRevDate", data);
	}
	
	public int updateState(ReceiptVo receipt) {
		return sqlSession.update("receipt.updateState", receipt);
	}
	
	public int delete(Long receiptNo) {
		return sqlSession.delete("receipt.delete", receiptNo);
	}
	
	public int createRev(ReceiptVo receipt) {
		return sqlSession.insert("receipt.createRev", receipt);
	}
	
	public ReceiptVo retrieveByReceiptNo(Long receiptNo) {
		return sqlSession.selectOne("receipt.retrieveByReceiptNo", receiptNo);
	}

}


