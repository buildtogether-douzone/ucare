package com.douzone.ucare.batch.jobs;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.douzone.ucare.batch.tasklets.SpringBatchTasklet;
import com.douzone.ucare.service.HolidayService;
import com.douzone.ucare.service.TimeService;

@Configuration
@EnableBatchProcessing
public class SpringBatchConfig {

	@Autowired
	public JobBuilderFactory jobBuilderFactory;

	@Autowired
	public StepBuilderFactory stepBuilderFactory;
	
	@Autowired
	private TimeService timeService;
	
	@Autowired
	private HolidayService holidayService;

	// JobBuilderFactory를 통해서 springBatchJob을 생성
    @Bean
    public Job springBatchJob() {
        return jobBuilderFactory.get("springBatchJob")
                .start(springBatchStep())  // Step 설정
                .build();
    }

    // StepBuilderFactory를 통해서 springBatchStep을 생성
    @Bean
    public Step springBatchStep() {
        return stepBuilderFactory.get("springBatchStep")
                .tasklet(new SpringBatchTasklet(timeService, holidayService)) // Tasklet 설정
                .build();
    }
    
    @Bean
    public SpringBatchTasklet SpringBatchTasklet(TimeService timeService, HolidayService holidayService){
        return new SpringBatchTasklet(timeService, holidayService);
    }
}