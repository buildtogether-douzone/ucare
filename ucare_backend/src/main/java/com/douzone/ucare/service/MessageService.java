package com.douzone.ucare.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.MessageRepository;
import com.douzone.ucare.vo.MessageVo;

@Service
public class MessageService {
	
	@Autowired
	private MessageRepository messageRepository;

	public HashMap<String,Object> retrieveMessage(String id) {
		List<MessageVo> message = messageRepository.findById(id);
		int count = messageRepository.findFalseCount(id);
		
		HashMap<String,Object> map = new HashMap<String, Object>();
		map.put("message", message);
		map.put("count", count);
		
		return map;
	}

}
