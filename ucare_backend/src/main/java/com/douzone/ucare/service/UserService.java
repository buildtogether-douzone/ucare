package com.douzone.ucare.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.douzone.ucare.repository.UserRepository;
import com.douzone.ucare.vo.UserVo;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;

	public void join(UserVo vo) {
		userRepository.insert(vo);
	}

	public UserVo getUser(String email, String password) {
		return userRepository.findByEmailAndPassword(email, password);
	}

	public UserVo getUser(Long no) {
		return userRepository.findByNo(no);
	}
	
	public UserVo getUser(String email) {
		return userRepository.findByEmail(email);
	}

	public Boolean addUser(UserVo user) {
		return userRepository.addUser(user);
	}

	public int updateUser(UserVo user) {
		return userRepository.updateUser(user);
	}
	
	public UserVo fetchUser(UserVo user) {
		return userRepository.fetchUser(user);
	}
	
	public UserVo fetchUserBySSN(UserVo user) {
		return userRepository.fetchUserBySSN(user);
	}
	
	public List<UserVo> retrieveAll() {
		return userRepository.retrieveAll();
	}
}
