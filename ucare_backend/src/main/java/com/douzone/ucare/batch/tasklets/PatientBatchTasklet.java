package com.douzone.ucare.batch.tasklets;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import com.douzone.ucare.service.PatientService;

@Component
@Configuration
public class PatientBatchTasklet implements Tasklet {
	private PatientService patientService;
	
    public PatientBatchTasklet (PatientService patientService){
        this.patientService = patientService;
    }
    
	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
		patientService.updateByDate();

        return RepeatStatus.FINISHED;
	}

}
