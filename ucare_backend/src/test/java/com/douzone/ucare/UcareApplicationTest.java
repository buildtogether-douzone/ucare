package com.douzone.ucare;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@WebAppConfiguration
@AutoConfigureMockMvc
public class UcareApplicationTest {
	
	@Autowired
	protected MockMvc mockMvc;
	
	@Test 
	@WithMockUser(roles="관리자")
	@DisplayName("유저 전체조회 테스트") 
	void retrieveAll() throws Exception { 
		mockMvc.perform(get("/retrieveAll")) 
			   .andExpect(status().isOk()) 
			   .andExpect(content().string(containsString("111")))
			   .andDo(print()); }
}
