package com.douzone.ucare.vo;

public class DiagnosisVo {
	private int diagnosisNo;
	private String diagnosisMemo;
	private String cureYN;
	private String diagnosisDate;
	private int userNo;
	private int receiptNo;
	private int patientNo;
	private String diseaseNm;
	private String medicineNm;
	
	public int getDiagnosisNo() {
		return diagnosisNo;
	}
	public void setDiagnosisNo(int diagnosisNo) {
		this.diagnosisNo = diagnosisNo;
	}
	public String getDiagnosisMemo() {
		return diagnosisMemo;
	}
	public void setDiagnosisMemo(String diagnosisMemo) {
		this.diagnosisMemo = diagnosisMemo;
	}
	public String getCureYN() {
		return cureYN;
	}
	public void setCureYN(String cureYN) {
		this.cureYN = cureYN;
	}
	public String getDiagnosisDate() {
		return diagnosisDate;
	}
	public void setDiagnosisDate(String diagnosisDate) {
		this.diagnosisDate = diagnosisDate;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public int getReceiptNo() {
		return receiptNo;
	}
	public void setReceiptNo(int receiptNo) {
		this.receiptNo = receiptNo;
	}
	public int getPatientNo() {
		return patientNo;
	}
	public void setPatientNo(int patientNo) {
		this.patientNo = patientNo;
	}
	public String getDiseaseNm() {
		return diseaseNm;
	}
	public void setDiseaseNm(String diseaseNm) {
		this.diseaseNm = diseaseNm;
	}
	public String getMedicineNm() {
		return medicineNm;
	}
	public void setMedicineNm(String medicineNm) {
		this.medicineNm = medicineNm;
	}
	
	@Override
	public String toString() {
		return "DiagnosisVo [diagnosisNo=" + diagnosisNo + ", diagnosisMemo=" + diagnosisMemo + ", cureYN=" + cureYN
				+ ", diagnosisDate=" + diagnosisDate + ", userNo=" + userNo + ", receiptNo=" + receiptNo
				+ ", patientNo=" + patientNo + ", diseaseNm=" + diseaseNm + ", medicineNm=" + medicineNm + "]";
	}
	
}