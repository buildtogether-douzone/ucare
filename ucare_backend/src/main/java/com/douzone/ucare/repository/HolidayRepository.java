package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.HolidayVo;


@Repository
public class HolidayRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public List<HolidayVo> retrieve(String date) {
		return sqlSession.selectList("holiday.retrieve", date);
	}

	public int update(HolidayVo data) {
		return sqlSession.update("holiday.update", data);
	}
}