package com.douzone.ucare.vo;

public class MedicineVo {
	private int medicineNo;
	private String medicineCode;
	private String medicineNm;
	private String company;
	private String mainIngredient;
	private String additive;
	private String origin;
	
	public int getMedicineNo() {
		return medicineNo;
	}
	public void setMedicineNo(int medicineNo) {
		this.medicineNo = medicineNo;
	}
	public String getMedicineCode() {
		return medicineCode;
	}
	public void setMedicineCode(String medicineCode) {
		this.medicineCode = medicineCode;
	}
	public String getMedicineNm() {
		return medicineNm;
	}
	public void setMedicineNm(String medicineNm) {
		this.medicineNm = medicineNm;
	}
	public String getCompany() {
		return company;
	}
	public void setCompany(String company) {
		this.company = company;
	}
	public String getMainIngredient() {
		return mainIngredient;
	}
	public void setMainIngredient(String mainIngredient) {
		this.mainIngredient = mainIngredient;
	}
	public String getAdditive() {
		return additive;
	}
	public void setAdditive(String additive) {
		this.additive = additive;
	}
	public String getOrigin() {
		return origin;
	}
	public void setOrigin(String origin) {
		this.origin = origin;
	}
	
	@Override
	public String toString() {
		return "MedicineVo [medicineNo=" + medicineNo + ", medicineCode=" + medicineCode + ", medicineNm=" + medicineNm
				+ ", company=" + company + ", mainIngredient=" + mainIngredient + ", additive=" + additive + ", origin="
				+ origin + "]";
	}
	
}
