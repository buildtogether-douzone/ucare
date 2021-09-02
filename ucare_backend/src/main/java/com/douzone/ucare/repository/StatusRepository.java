package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.ReceiptVo;

@Repository
public class StatusRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public List<ReceiptVo> retrieveStatus(String date) {
		return sqlSession.selectList("status.retrieveAll", date);
	}

	public int update(ReceiptVo data) {
		return sqlSession.update("status.update", data);
	}

	public int delete(Long receiptNo) {
		return sqlSession.delete("status.delete", receiptNo);
	}
}