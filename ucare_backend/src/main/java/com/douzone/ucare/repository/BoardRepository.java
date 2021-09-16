package com.douzone.ucare.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.douzone.ucare.vo.BoardVo;

@Repository
public class BoardRepository {
	@Autowired
	private SqlSession sqlSession;
	
	public List<BoardVo> retrieveAll() {
		return sqlSession.selectList("board.retrieveAll");
	}

	public List<BoardVo> retrieveContents(Long boardNo) {
		return sqlSession.selectList("board.retrieveContents", boardNo);
	}

	public int create(BoardVo data) {
		return sqlSession.insert("board.create", data);
	}
	
	public int updateHit(Long boardNo) {
		return sqlSession.update("board.updateHit", boardNo);
	}
	
	public int delete(BoardVo data) {
		return sqlSession.delete("board.delete", data);
	}

	public int update(BoardVo data) {
		return sqlSession.update("board.update", data);
	}

}
