package com.douzone.ucare.repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.UserVo;

@Repository
public class UserRepository {
	@Autowired
	private SqlSession sqlSession;
	
	public Boolean insert(UserVo vo) {
		int count = sqlSession.insert("user.insert", vo);
		return count == 1;
	}

	public UserVo findByEmailAndPassword(String email, String password) { 
		Map<String, String> map = new HashMap<>();
		map.put("e", email);
		map.put("p", password);
		return sqlSession.selectOne("user.findByEmailAndPassword", map);
	}

	public UserVo findByNo(Long userNo) {
		return sqlSession.selectOne("user.findByNo", userNo);
	}
	
	public UserVo findByEmail(String email) {
		return sqlSession.selectOne("user.findByEmail", email);
	}	

	public Boolean addUser(UserVo user) {
		int count = sqlSession.insert("user.insert", user);
		return count == 1;
	}

	public int updateUser(UserVo user) {
		return sqlSession.update("user.updateUser", user);
	}

	public UserVo fetchUser(UserVo user) {
		return sqlSession.selectOne("user.findByID", user);
	}

	public UserVo findUser(String username) {
		return sqlSession.selectOne("user.findUser", username);
	}
	public List<UserVo> retrieveAll() {
		return sqlSession.selectList("user.retrieveAll");
	}


}
