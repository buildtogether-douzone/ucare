package com.douzone.ucare.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.douzone.ucare.vo.UserVo;

public class AuthInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		//1.handler 종류 확인
		if(handler instanceof HandlerMethod == false) {
			// DefaultServletHandler 가 처리하는 경우 (정적 자원 접근)
			return true;
		}
		//2.casting
		HandlerMethod handlerMethod = (HandlerMethod)handler;
		
		//3.Handler Method의 @Auth 받아오기
		Auth auth = handlerMethod.getMethodAnnotation(Auth.class);
		
		//4. Handler Method에 @Auth가 없으면 Type에 붙어 있는지 확인한다.
		if(auth == null) {
			auth = handlerMethod.getMethod().getDeclaringClass().getAnnotation(Auth.class);
		}
		
		//5. Type 이나 Method 둘 다 @Auth가 적용이 안되어 있는 경우
		if(auth == null) {
			return true;
		}
		
		//6.@Auth가 붙어 있기 때문에 인증 (Authenfication) 여부 확인 
		HttpSession session = request.getSession();
		if(session == null) {
			response.sendRedirect(request.getContextPath() + "/user/login");
			return false;
		}
		
		UserVo authUser = (UserVo)session.getAttribute("authUser");
		if(authUser == null) {
			response.sendRedirect(request.getContextPath() + "/user/login");
			return false;
		}
		
		// 7. 권한 체크를 위해서 @Auth의 role 가져오기("ADMIN", "USER")
		String role = auth.role();
		
		if("USER".equals(role)) {
			return true;
		}
		
		return true;
	}

}
