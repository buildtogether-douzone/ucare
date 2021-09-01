package com.douzone.ucare.vo;

public class TimeVo {
	private Long timeNo;
	private String date;
	private String time;
	private String status;
	
	public Long getTimeNo() {
		return timeNo;
	}
	public void setTimeNo(Long timeNo) {
		this.timeNo = timeNo;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	@Override
	public String toString() {
		return "TimeVo [timeNo=" + timeNo + ", date=" + date + ", time=" + time + ", status=" + status + "]";
	}

}
