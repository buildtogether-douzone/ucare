package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.BoardRepository;
import com.douzone.ucare.vo.BoardVo;

@Service
public class BoardService {
	@Autowired
	private BoardRepository boardRepository;
	
	public int create(BoardVo data) {
		return boardRepository.create(data);
	}
	
	public List<BoardVo> retrieveAll() {
		return boardRepository.retrieveAll();
	}

	public List<BoardVo> retrieveContents(Long boardNo) {
		return boardRepository.retrieveContents(boardNo);
	}

	public int updateHit(Long boardNo) {
		return boardRepository.updateHit(boardNo);
	}
	
	public int delete(Long boardNo) {
	return boardRepository.delete(boardNo);
	}

	public int update(BoardVo data) {
	return boardRepository.update(data);
	}

}
