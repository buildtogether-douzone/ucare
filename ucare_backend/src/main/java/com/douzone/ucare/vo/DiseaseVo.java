package com.douzone.ucare.vo;

public class DiseaseVo {
	private int diseaseNo;
	private String diseaseCode;
	private String diseaseNm;
	private String diseaseEngNm;
	private String symptom;
	
	public int getDiseaseNo() {
		return diseaseNo;
	}
	public void setDiseaseNo(int diseaseNo) {
		this.diseaseNo = diseaseNo;
	}
	public String getDiseaseCode() {
		return diseaseCode;
	}
	public void setDiseaseCode(String diseaseCode) {
		this.diseaseCode = diseaseCode;
	}
	public String getDiseaseNm() {
		return diseaseNm;
	}
	public void setDiseaseNm(String diseaseNm) {
		this.diseaseNm = diseaseNm;
	}
	public String getDiseaseEngNm() {
		return diseaseEngNm;
	}
	public void setDiseaseEngNm(String diseaseEngNm) {
		this.diseaseEngNm = diseaseEngNm;
	}
	public String getSymptom() {
		return symptom;
	}
	public void setSymptom(String symptom) {
		this.symptom = symptom;
	}
	
	@Override
	public String toString() {
		return "DiseaseVo [diseaseNo=" + diseaseNo + ", diseaseCode=" + diseaseCode + ", diseaseNm=" + diseaseNm
				+ ", diseaseEngNm=" + diseaseEngNm + ", symptom=" + symptom + "]";
	}
}
