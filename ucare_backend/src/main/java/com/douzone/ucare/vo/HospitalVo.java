package com.douzone.ucare.vo;

public class HospitalVo {
	private long hospitalNo;
	private String hospitalName;
	private String headName;
	private String address;
	private String telNo;
	private int basicPrice;
	private String siteAddress;
	private String email;
	private String faxNo;
	private String headSpeak;
	private String image;
	
	public long getHospitalNo() {
		return hospitalNo;
	}
	public void setHospitalNo(long hospitalNo) {
		this.hospitalNo = hospitalNo;
	}
	public String getHospitalName() {
		return hospitalName;
	}
	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}
	public String getHeadName() {
		return headName;
	}
	public void setHeadName(String headName) {
		this.headName = headName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getTelNo() {
		return telNo;
	}
	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}
	public int getBasicPrice() {
		return basicPrice;
	}
	public void setBasicPrice(int basicPrice) {
		this.basicPrice = basicPrice;
	}
	public String getSiteAddress() {
		return siteAddress;
	}
	public void setSiteAddress(String siteAddress) {
		this.siteAddress = siteAddress;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getFaxNo() {
		return faxNo;
	}
	public void setFaxNo(String faxNo) {
		this.faxNo = faxNo;
	}
	public String getHeadSpeak() {
		return headSpeak;
	}
	public void setHeadSpeak(String headSpeak) {
		this.headSpeak = headSpeak;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
	@Override
	public String toString() {
		return "HospitalVo [hospitalNo=" + hospitalNo + ", hospitalName=" + hospitalName + ", headName=" + headName
				+ ", address=" + address + ", telNo=" + telNo + ", basicPrice=" + basicPrice + ", siteAddress="
				+ siteAddress + ", email=" + email + ", faxNo=" + faxNo + ", headSpeak=" + headSpeak + ", image="
				+ image + "]";
	}
	
	
}
