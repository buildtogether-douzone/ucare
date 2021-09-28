package com.douzone.ucare.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SocketController {
	
	@Autowired 
	private SimpMessagingTemplate webSocket; 
	
	@MessageMapping("/sendTo") 
	@SendTo("/topics/sendTo") 
	public String sendToMessage() throws Exception { 
		return "5"; 
	}
	
	@MessageMapping("/Doctor") 
	public void sendToDoctor() { 
		webSocket.convertAndSend("/topics/doctor" , Math.random()); 
	}
	
	@MessageMapping("/Nurse") 
	public void sendToNurse() { 
		webSocket.convertAndSend("/topics/nurse" , Math.random()); 
	}
	
	@MessageMapping("/Reservation") 
	public void sendToReservation() { 
		webSocket.convertAndSend("/topics/reservation" , Math.random()); 
	}
	
	@MessageMapping("/Message") 
	public void sendMessage(String receiveUser) {
		webSocket.convertAndSend("/topics/message/" + receiveUser , Math.random());
	}
	
	@MessageMapping("/Template") 
	public void SendTemplateMessage() { 
		webSocket.convertAndSend("/topics/template" , "Template"); 
	} 
	
	@RequestMapping(value="/api") 
	public void SendAPI() { 
		webSocket.convertAndSend("/topics/api" , "API"); 
	}
}
