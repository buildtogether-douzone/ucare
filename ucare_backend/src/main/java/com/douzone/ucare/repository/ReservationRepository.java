package com.douzone.ucare.repository;


import java.util.List;

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
	
	public List<ReservationVo> retrieveAll() {
		return sqlSession.selectList("reservation.retrieveAll");
	}
	
	public List<ReservationVo> retrieveByDuplication(ReservationVo reservation) {
		return sqlSession.selectList("reservation.retrieveByDuplication", reservation);
	}
	
	public int update(Long revNo) {
		return sqlSession.update("reservation.update", revNo);
	}
	
	public int delete(Long revNo) {
		return sqlSession.delete("reservation.delete", revNo);
	}
}


