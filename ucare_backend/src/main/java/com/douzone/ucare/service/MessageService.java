package com.douzone.ucare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.MessageRepository;
import com.douzone.ucare.vo.MessageVo;

@Service
public class MessageService {
	
	@Autowired
	private MessageRepository messageRepository;

	public MessageVo retrieveMessage(String id) {
		MessageVo vo = messageRepository.findById(id);
		vo.setCountFalse(messageRepository.findFalseCount());
		return vo;
	}

}
