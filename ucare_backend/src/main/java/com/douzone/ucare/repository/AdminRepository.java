package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.SiteVo;
import com.douzone.ucare.vo.UserVo;

@Repository
public class AdminRepository {
	@Autowired
	private SqlSession sqlSession;

	public SiteVo findAll() {
		return sqlSession.selectOne("admin.findAll");
	}

	public List<UserVo> retrieveAll() {
		return sqlSession.selectList("admin.retrieveAll");
	}

	public int update(UserVo data) {
		return sqlSession.update("admin.update", data);
	}
	
}
