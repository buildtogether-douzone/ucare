package com.douzone.ucare.repository;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.HolidayVo;


@Repository
public class HolidayRepository {
	
	@Autowired
	private SqlSession sqlSession;

	public int update(HolidayVo data) {
		return sqlSession.update("holiday.update", data);
	}
}