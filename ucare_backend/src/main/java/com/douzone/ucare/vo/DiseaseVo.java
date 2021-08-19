package com.douzone.ucare.vo;

public class DiseaseVo {
	private int diseaseNo;
	private String diseaseNm;
	private String symptom;
	
	public int getDiseaseNo() {
		return diseaseNo;
	}
	public void setDiseaseNo(int diseaseNo) {
		this.diseaseNo = diseaseNo;
	}
	public String getDiseaseNm() {
		return diseaseNm;
	}
	public void setDiseaseNm(String diseaseNm) {
		this.diseaseNm = diseaseNm;
	}
	public String getSymptom() {
		return symptom;
	}
	public void setSymptom(String symptom) {
		this.symptom = symptom;
	}
	
	@Override
	public String toString() {
		return "DiseaseVo [diseaseNo=" + diseaseNo + ", diseaseNm=" + diseaseNm + ", symptom=" + symptom + "]";
	}
}
