package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.ucare.service.BoardService;
import com.douzone.ucare.service.FileUploadService;
import com.douzone.ucare.vo.BoardVo;

@RestController
@RequestMapping("/api/board")
public class BoardController {
	
	@Autowired
	private BoardService boardService;
	
	@Autowired
	private FileUploadService fileUploadService;
	
	@PostMapping("/create")
	public ResponseEntity<?> create(@RequestPart("data") BoardVo data,  @RequestPart(value="URL", required = false) MultipartFile file) {
		if(file != null) data.setURL(fileUploadService.restore(file));
		return new ResponseEntity<>(boardService.create(data), HttpStatus.OK);
	}
	
	@GetMapping("/retrieveAll")
	public ResponseEntity<?> retrieveAll() {
		return new ResponseEntity<>(boardService.retrieveAll(), HttpStatus.OK);
	}
		
	@DeleteMapping("/delete/{boardNo}")
	public ResponseEntity<?> delete(@PathVariable("boardNo") Long boardNo) {
		return new ResponseEntity<>(boardService.delete(boardNo), HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> update(@RequestPart("data") BoardVo data, @RequestPart(value="URL", required = false) MultipartFile file) {
		if(file != null) data.setURL(fileUploadService.restore(file));
		return new ResponseEntity<>(boardService.update(data), HttpStatus.OK);
	}
	
	@PutMapping("/updateHit/{boardNo}")
	public ResponseEntity<?> updateHit(@PathVariable("boardNo") Long boardNo) {
		return new ResponseEntity<>(boardService.updateHit(boardNo), HttpStatus.OK);
	}


}