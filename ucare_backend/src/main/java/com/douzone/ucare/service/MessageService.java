package com.douzone.ucare.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.controller.api.SocketController;
import com.douzone.ucare.repository.MessageRepository;
import com.douzone.ucare.vo.MessageVo;

@Service
public class MessageService {
	
	@Autowired
	private MessageRepository messageRepository;
	
	@Autowired
	private SocketController socketController;

	public HashMap<String,Object> retrieveMessage(String id) {
		List<MessageVo> message = messageRepository.findById(id);
		int count = messageRepository.findFalseCount(id);
		
		HashMap<String,Object> map = new HashMap<String, Object>();
		map.put("message", message);
		map.put("count", count);
		return map;
	}

	public Object revise(Long no, String name) {
		messageRepository.update(no);
		socketController.sendMessage(name);
		return 1;
	}

	public Object delete(Long no) {
		return messageRepository.delete(no);
	}

	public Object sendMessage(MessageVo vo) {
		messageRepository.insert(vo);
		socketController.sendMessage(vo.getToName());
		return null;
	}

	public Object sendMessageRetrieveAll(String id) {
		return messageRepository.findsendMessageById(id);
	}

}
