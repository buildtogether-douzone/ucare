package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.douzone.ucare.service.MessageService;
import com.douzone.ucare.vo.MessageVo;

@RestController
@RequestMapping("/api/message")
public class MessageController {
	
	@Autowired
	private MessageService messageService;
	
	@GetMapping("/retrieveAll/{userID}")
	public ResponseEntity<?> retrieveMessage(@PathVariable("userID") String id) {
		return new ResponseEntity<>(messageService.retrieveMessage(id), HttpStatus.OK);
	}
	
	@PutMapping("/revise/{no}")
	public ResponseEntity<?> reviseCount(@PathVariable("no") Long no) {
		return new ResponseEntity<>(messageService.revise(no), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{no}")
	public ResponseEntity<?> deleteMessage(@PathVariable("no") Long no) {
		return new ResponseEntity<>(messageService.delete(no), HttpStatus.OK);
	}
	
	@PostMapping("/sendMessage")
	public ResponseEntity<?> sendMessage(@RequestBody MessageVo vo) {
		return new ResponseEntity<>(messageService.sendMessage(vo), HttpStatus.OK);
	}

}
