package com.douzone.ucare.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.ReceiptVo;

@Repository
public class TimeRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public int update(String date) {
		return sqlSession.update("time.update", date);
	}

	public int updateByCancel(ReceiptVo data) {
		return sqlSession.update("time.updateByCancel", data);
	}
}