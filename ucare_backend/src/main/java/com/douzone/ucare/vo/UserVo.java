package com.douzone.ucare.vo;

import io.swagger.annotations.ApiModelProperty;

public class UserVo {
	private int rowNo;
	@ApiModelProperty(example="사용자 번호")
	private int userNo;
	@ApiModelProperty(example="사용자 아이디")
	private String id;
	@ApiModelProperty(example="사용자 비밀번호")
	private String password;
	@ApiModelProperty(example="사용자 이름")
	private String name;
	@ApiModelProperty(example="사용자 성별")
	private String gender;
	@ApiModelProperty(example="사용자 주민번호")
	private String ssn;
	@ApiModelProperty(example="사용자 이메일 id")
	private String emailId;
	@ApiModelProperty(example="사용자 이메일 주소")
	private String email;
	@ApiModelProperty(example="사용자 주소")
	private String address;
	@ApiModelProperty(example="사용자 상세 주소")
	private String detailAddress;
	@ApiModelProperty(example="사용자 전화번호")
	private String telNo;
	@ApiModelProperty(example="사용자 역할")
	private String role;
	@ApiModelProperty(example="사용자 상태")
	private String status;
	@ApiModelProperty(example="비고")
	private String remark;
	@ApiModelProperty(example="사용자 생일")
	private String birth;
	@ApiModelProperty(example="사용자 사진")
	private String image;
	private String checkFile;
	
	
	public String getCheckFile() {
		return checkFile;
	}
	public void setCheckFile(String checkFile) {
		this.checkFile = checkFile;
	}
	public int getRowNo() {
		return rowNo;
	}
	public void setRowNo(int rowNo) {
		this.rowNo = rowNo;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getSsn() {
		return ssn;
	}
	public void setSsn(String ssn) {
		this.ssn = ssn;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDetailAddress() {
		return detailAddress;
	}
	public void setDetailAddress(String detailAddress) {
		this.detailAddress = detailAddress;
	}
	public String getTelNo() {
		return telNo;
	}
	public void setTelNo(String telNo) {
		this.telNo = telNo;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	
	@Override
	public String toString() {
		return "UserVo [rowNo=" + rowNo + ", userNo=" + userNo + ", id=" + id + ", password=" + password + ", name="
				+ name + ", gender=" + gender + ", ssn=" + ssn + ", emailId=" + emailId + ", email=" + email
				+ ", address=" + address + ", detailAddress=" + detailAddress + ", telNo=" + telNo + ", role=" + role
				+ ", status=" + status + ", remark=" + remark + ", birth=" + birth + ", image=" + image + "]";
	}
	
}
