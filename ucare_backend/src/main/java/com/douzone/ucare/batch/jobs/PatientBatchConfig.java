package com.douzone.ucare.batch.jobs;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.douzone.ucare.batch.tasklets.PatientBatchTasklet;
import com.douzone.ucare.service.PatientService;

@Configuration
@EnableBatchProcessing
public class PatientBatchConfig {

	@Autowired
	public JobBuilderFactory jobBuilderFactory;

	@Autowired
	public StepBuilderFactory stepBuilderFactory;
	
	@Autowired
	private PatientService patientService;

	// JobBuilderFactory를 통해서 patientBatchJob을 생성
    @Bean
    public Job patientBatchJob() {
        return jobBuilderFactory.get("patientBatchJob")
                .start(patientBatchStep())  // Step 설정
                .build();
    }

    // StepBuilderFactory를 통해서 patientBatchStep을 생성
    @Bean
    public Step patientBatchStep() {
        return stepBuilderFactory.get("patientBatchStep")
                .tasklet(new PatientBatchTasklet(patientService)) // Tasklet 설정
                .build();
    }
    
    @Bean
    public PatientBatchTasklet PatientBatchTasklet(PatientService patientService){
        return new PatientBatchTasklet(patientService);
    }
}