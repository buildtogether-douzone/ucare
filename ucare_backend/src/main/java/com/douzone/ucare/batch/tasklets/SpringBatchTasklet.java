package com.douzone.ucare.batch.tasklets;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import com.douzone.ucare.service.HolidayService;
import com.douzone.ucare.service.TimeService;
import com.douzone.ucare.vo.HolidayVo;
import com.douzone.ucare.vo.TimeVo;

@Component
@Configuration
public class SpringBatchTasklet implements Tasklet {
	private TimeService timeService;
	private HolidayService holidayService;
	
    public SpringBatchTasklet (TimeService timeService, HolidayService holidayService){
        this.timeService = timeService;
        this.holidayService = holidayService;
    }
    
	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
		TimeVo timeData = new TimeVo();
		
		// 현재 날짜 구하기
		LocalDate now = LocalDate.now();
		// 포맷 정의
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
		// 포맷 적용
		String formatedNow = now.format(formatter);
		
		List<HolidayVo> list = holidayService.retrieve(formatedNow);
		
		for(int i = 0; i < list.size(); i++) {
			LocalTime startTime = LocalTime.parse("09:00:00");
			LocalTime endTime = LocalTime.parse("00:00:00");
			
			timeData.setDate(list.get(i).getDate());

			if(!list.get(i).getHoliday()) {
				while(!(startTime.equals(endTime))) {
					DateTimeFormatter timeFormatter = DateTimeFormatter.ISO_TIME;
					String formatedTime = startTime.format(timeFormatter);
					
					timeData.setTime(formatedTime);
					
					timeService.create(timeData);
					
					startTime = startTime.plusMinutes(10);
				}
			}
		}

        return RepeatStatus.FINISHED;
	}

}
