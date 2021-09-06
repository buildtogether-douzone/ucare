package com.douzone.ucare.config.jwt;

public interface JwtProperties {
	String SECRET = "ucare"; // 우리 서버만 알고 있는 비밀값
	int EXPIRATION_TIME = (60000) * 600;  //(1분) * 600 = 10시
	String TOKEN_PREFIX = "Bearer ";
	String HEADER_STRING = "Authorization";
}
