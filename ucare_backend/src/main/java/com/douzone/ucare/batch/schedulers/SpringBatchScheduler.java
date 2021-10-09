package com.douzone.ucare.batch.schedulers;

import java.time.LocalDateTime;

import org.springframework.batch.core.JobExecutionException;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.douzone.ucare.batch.jobs.PatientBatchConfig;
import com.douzone.ucare.batch.jobs.SpringBatchConfig;

@Component
public class SpringBatchScheduler {
	@Autowired
    public JobLauncher jobLauncher;
	
	@Autowired
	public SpringBatchConfig springBatchConfig; // springBatchJob
	
	@Autowired
	public PatientBatchConfig patientBatchConfig; // patientBatchJob

    // 매월 1일 0시 30분 실행
    @Scheduled(cron="0 30 0 1 * *")
    public void executeJob () {
        try {
            jobLauncher.run(
                    springBatchConfig.springBatchJob(),
                    new JobParametersBuilder()
                            .addString("datetime", LocalDateTime.now().toString())
                    .toJobParameters()  // job parameter 설정
            );
        } catch (JobExecutionException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
    }
    
    // 매일 0시 10분 실행
    @Scheduled(cron="0 10 0 * * *")
    public void executePatientJob () {
        try {
            jobLauncher.run(
                    patientBatchConfig.patientBatchJob(),
                    new JobParametersBuilder()
                            .addString("datetime", LocalDateTime.now().toString())
                    .toJobParameters()  // job parameter 설정
            );
        } catch (JobExecutionException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
    }
}
