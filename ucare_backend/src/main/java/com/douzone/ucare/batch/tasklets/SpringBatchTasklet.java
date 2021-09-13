package com.douzone.ucare.batch.tasklets;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import com.douzone.ucare.service.TimeService;
import com.douzone.ucare.vo.TimeVo;

@Component
@Configuration
public class SpringBatchTasklet implements Tasklet {
	private TimeService timeService;

    public SpringBatchTasklet (TimeService timeService){
        this.timeService = timeService;
    }
    
	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
		TimeVo data = new TimeVo();
		
		// 현재 날짜 구하기
		LocalDate now = LocalDate.now();
		// 포맷 정의
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		// 포맷 적용
		String formatedNow = now.format(formatter);
		
		LocalTime startTime = LocalTime.parse("09:00:00");
		
		LocalTime endTime = LocalTime.parse("23:50:00");
		
		data.setDate(formatedNow);
		
		while(!(startTime.equals(endTime.plusMinutes(10)))) {
			DateTimeFormatter timeFormatter = DateTimeFormatter.ISO_TIME;
			String formatedTime = startTime.format(timeFormatter);
			
			
			data.setTime(formatedTime);
			
			timeService.create(data);
			
			startTime = startTime.plusMinutes(10);
		}

        return RepeatStatus.FINISHED;
	}

}
