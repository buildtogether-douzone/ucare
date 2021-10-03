package com.douzone.ucare.vo;

public class PrescriptionVo {
	private Long prescriptionNo;
	private Long diagnosisNo;
	private Long patientNo;
	private String medicineNm;
	private int dosage;
	private int dosingDay;
	private String usage;
	
	public Long getPrescriptionNo() {
		return prescriptionNo;
	}
	public void setPrescriptionNo(Long prescriptionNo) {
		this.prescriptionNo = prescriptionNo;
	}
	public Long getDiagnosisNo() {
		return diagnosisNo;
	}
	public void setDiagnosisNo(Long diagnosisNo) {
		this.diagnosisNo = diagnosisNo;
	}
	public Long getPatientNo() {
		return patientNo;
	}
	public void setPatientNo(Long patientNo) {
		this.patientNo = patientNo;
	}
	public String getMedicineNm() {
		return medicineNm;
	}
	public void setMedicineNm(String medicineNm) {
		this.medicineNm = medicineNm;
	}
	public int getDosage() {
		return dosage;
	}
	public void setDosage(int dosage) {
		this.dosage = dosage;
	}
	public int getDosingDay() {
		return dosingDay;
	}
	public void setDosingDay(int dosingDay) {
		this.dosingDay = dosingDay;
	}
	public String getUsage() {
		return usage;
	}
	public void setUsage(String usage) {
		this.usage = usage;
	}
	
	@Override
	public String toString() {
		return "PrescriptionVo [prescriptionNo=" + prescriptionNo + ", diagnosisNo=" + diagnosisNo + ", patientNo="
				+ patientNo + ", medicineNm=" + medicineNm + ", dosage=" + dosage + ", dosingDay=" + dosingDay
				+ ", usage=" + usage + "]";
	}
	
}
