package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.DiseaseVo;

@Repository
public class DiseaseRepository {
	@Autowired
	private SqlSession sqlSession;
	
	public int create(DiseaseVo data) {
		return sqlSession.insert("disease.create", data);
	}

	public List<DiseaseVo> retrieveAll() {
		return sqlSession.selectList("disease.retrieveAll");
	}

	public int update(DiseaseVo data) {
		return sqlSession.update("disease.update", data);
	}

	public int delete(int diseaseNo) {
		return sqlSession.delete("disease.delete", diseaseNo);
	}

}
