package com.douzone.ucare;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@WebAppConfiguration
@AutoConfigureMockMvc
public class UcareApplicationTest {
	
	@Autowired
	protected MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	@Test 
	@WithMockUser(roles="관리자")
	@DisplayName("유저 전체조회 테스트") 
	void retrieveAll() throws Exception { 
		mockMvc.perform(get("/retrieveAll")) 
			   .andExpect(status().isOk()) 
			   .andExpect(content().string(containsString("111")))
			   .andDo(print()); }
	
	@Test
	@DisplayName("로그인 테스트")
	void login() throws Exception{
		
		Map<String, String> input = new HashMap<>();
	    input.put("id", "111");
	    input.put("password", "11111");
		
		mockMvc.perform(post("/login")
			.contentType(MediaType.APPLICATION_JSON) 
	        .content(objectMapper.writeValueAsString(input)))
			.andExpect(status().isOk())
			.andDo(print());
	}
	
}
