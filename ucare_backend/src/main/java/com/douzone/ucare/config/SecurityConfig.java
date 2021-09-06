package com.douzone.ucare.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.douzone.ucare.config.jwt.JwtAuthenticationFilter;
import com.douzone.ucare.config.jwt.JwtAuthorizationFilter;
import com.douzone.ucare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity // security 활성화
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CorsConfig corsConfig;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }    

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// Bearer Auth(STATELESS)를 사용하겠다고 시큐리티에 알려줘야함.
		http
			.csrf().disable()
			.addFilter(corsConfig.corsFilter()) // @CrossOrigin(인증X), 시큐리티 필터에 등록 인증(O);
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 사용하지 않겠다.
			.and()
			.formLogin().disable() 
			.httpBasic().disable() //
			
			
			.addFilter(new JwtAuthenticationFilter(authenticationManager())) // AuthenticationManager
			.addFilter(new JwtAuthorizationFilter(authenticationManager(), userRepository))
			
			.authorizeRequests()
			.antMatchers("/api/**")
				.authenticated() // 로그인 한 유저만		

			.antMatchers("/api/admin/**")
				.access("hasRole('ROLE_ADMIN')")

			.anyRequest().permitAll(); // 이 외는 모든 허용
	}
}
