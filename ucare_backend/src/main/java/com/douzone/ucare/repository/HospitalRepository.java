package com.douzone.ucare.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.HospitalVo;

@Repository
public class HospitalRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public HospitalVo fetchInfo() {
		return sqlSession.selectOne("hospital.findAll");
	}

	public int updateInfo(HospitalVo hospital) {
		return sqlSession.update("hospital.update", hospital);
	}

}
