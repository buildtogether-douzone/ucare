package com.douzone.ucare.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.MessageVo;

@Repository
public class MessageRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public MessageVo findById(String id) {
		return sqlSession.selectOne("message.findById", id);
	}

	public int findFalseCount() {
		return sqlSession.selectOne("message.falseCount");
	}

}
