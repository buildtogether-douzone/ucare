package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.MessageVo;

@Repository
public class MessageRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public List<MessageVo> findById(String id) {
		return sqlSession.selectList("message.findById", id);
	}

	public int findFalseCount(String id) {
		return sqlSession.selectOne("message.falseCount", id);
	}

}
