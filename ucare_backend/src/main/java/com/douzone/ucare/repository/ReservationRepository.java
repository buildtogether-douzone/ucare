package com.douzone.ucare.repository;


import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.ReservationVo;

@Repository
public class ReservationRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public int create(ReservationVo reservation) {
		return sqlSession.insert("reservation.create", reservation);
	}

	
}


