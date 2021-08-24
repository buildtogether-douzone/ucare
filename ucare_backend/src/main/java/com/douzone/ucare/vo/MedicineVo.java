package com.douzone.ucare.vo;

public class MedicineVo {
	private int medicineNo;
	private String medicineNm;
	private String symptom;
	private String generic;
	private int price;
	private String maker;
	
	public int getMedicineNo() {
		return medicineNo;
	}
	public void setMedicineNo(int medicineNo) {
		this.medicineNo = medicineNo;
	}
	public String getMedicineNm() {
		return medicineNm;
	}
	public void setMedicineNm(String medicineNm) {
		this.medicineNm = medicineNm;
	}
	public String getSymptom() {
		return symptom;
	}
	public void setSymptom(String symptom) {
		this.symptom = symptom;
	}
	public String getGeneric() {
		return generic;
	}
	public void setGeneric(String generic) {
		this.generic = generic;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getMaker() {
		return maker;
	}
	public void setMaker(String maker) {
		this.maker = maker;
	}
	
	@Override
	public String toString() {
		return "MedicineVo [medicineNo=" + medicineNo + ", medicineNm=" + medicineNm + ", symptom=" + symptom
				+ ", generic=" + generic + ", price=" + price + ", maker=" + maker + "]";
	}
}
