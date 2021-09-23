package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.ucare.service.BoardService;
import com.douzone.ucare.service.FileUploadService;
import com.douzone.ucare.vo.BoardVo;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/board")
public class BoardController {
	
	@Autowired
	private BoardService boardService;
	
	@Autowired
	private FileUploadService fileUploadService;
	
	@PostMapping("/create")
	@ApiOperation(value="게시판 글 작성", notes="게시판 글 작성시 실행되는 API")
	@ApiImplicitParams({
		@ApiImplicitParam(name="data", value="게시판 글 작성에 대한 정보"),
		@ApiImplicitParam(name="URL", value="글 작성시 올렸던 파일")
	})
	public ResponseEntity<?> create(@RequestPart("data") BoardVo data,  @RequestPart(value="URL", required = false) MultipartFile file) {
		if(file != null) data.setURL(fileUploadService.restore(file));
		return new ResponseEntity<>(boardService.create(data), HttpStatus.OK);
	}
	
	@GetMapping("/retrieveAll")
	@ApiOperation(value="게시판 데이터 불러오기", notes="홈페이지 렌더링시 게시판 정보를 가져오기 위한 API")
	public ResponseEntity<?> retrieveAll() {
		return new ResponseEntity<>(boardService.retrieveAll(), HttpStatus.OK);
	}
	
	@PostMapping("/delete")
	@ApiOperation(value="게시판 데이터 지우기", notes="게시판 삭제 버튼 클릭시 실행 되는 API")
	public ResponseEntity<?> delete(@RequestBody BoardVo data) {
		if(data.getURL() != null) fileUploadService.remove(data.getURL());	
		return new ResponseEntity<>(boardService.delete(data), HttpStatus.OK);
	}
	
	@PutMapping("/update")
	@ApiOperation(value="게시판 글 수정", notes="게시판 글 수정시 실행되는 API")
	@ApiImplicitParams({
		@ApiImplicitParam(name="data", value="작성된 글에 대한 정보"),
		@ApiImplicitParam(name="URL", value="글 작성시 올렸던 파일")
	})
	public ResponseEntity<?> update(@RequestPart("data") BoardVo data, @RequestPart(value="URL", required = false) MultipartFile file) {
		if((data.getURL() != null) && (file != null)) fileUploadService.remove(data.getURL());
		if(file != null) data.setURL(fileUploadService.restore(file));
		
		return new ResponseEntity<>(boardService.update(data), HttpStatus.OK);
	}
	
	@PutMapping("/updateHit/{boardNo}")
	@ApiOperation(value="게시물 조회수 업데이트", notes="게시판 글 볼 때 마다 조회수 업데이트")
	@ApiImplicitParam(name="boardNo", value="게시물 번호")
	public ResponseEntity<?> updateHit(@PathVariable("boardNo") Long boardNo) {
		return new ResponseEntity<>(boardService.updateHit(boardNo), HttpStatus.OK);
	}

}