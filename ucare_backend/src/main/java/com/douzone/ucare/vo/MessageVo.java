package com.douzone.ucare.vo;

public class MessageVo {
	private Long msgNo;
	private String name;
	private String title;
	private String toName;
	private String contents;
	private String msgDate;
	private String status;
	private Long userNo;
	private int countFalse;
	
	public int getCountFalse() {
		return countFalse;
	}
	public void setCountFalse(int countFalse) {
		this.countFalse = countFalse;
	}
	public Long getMsgNo() {
		return msgNo;
	}
	public void setMsgNo(Long msgNo) {
		this.msgNo = msgNo;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getToName() {
		return toName;
	}
	public void setToName(String toName) {
		this.toName = toName;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public String getMsgDate() {
		return msgDate;
	}
	public void setMsgDate(String msgDate) {
		this.msgDate = msgDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Long getUserNo() {
		return userNo;
	}
	public void setUserNo(Long userNo) {
		this.userNo = userNo;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	@Override
	public String toString() {
		return "MessageVo [msgNo=" + msgNo + ", name=" + name + ", title=" + title + ", toName=" + toName
				+ ", contents=" + contents + ", msgDate=" + msgDate + ", status=" + status + ", userNo=" + userNo
				+ ", countFalse=" + countFalse + "]";
	}

}
	

