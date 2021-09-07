package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.ReceiptVo;
import com.douzone.ucare.vo.TimeVo;


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
	
	public List<TimeVo> retrieveTime(String date) {
		return sqlSession.selectList("time.retrieveTime", date);
	}
	
	public int updateTime(TimeVo data) {
		return sqlSession.update("time.updateTime", data);
	}

	public int updateDelete(TimeVo data) {
		return sqlSession.update("time.updateDelete", data);
	}
}