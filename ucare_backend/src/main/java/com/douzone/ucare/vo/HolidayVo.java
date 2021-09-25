package com.douzone.ucare.vo;

public class HolidayVo {
	private Long holidayNo;
	private String date;
	private Boolean holiday;
	
	public Long getHolidayNo() {
		return holidayNo;
	}
	public void setHolidayNo(Long holidayNo) {
		this.holidayNo = holidayNo;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public Boolean getHoliday() {
		return holiday;
	}
	public void setHoliday(Boolean holiday) {
		this.holiday = holiday;
	}
	
	@Override
	public String toString() {
		return "HolidayVo [holidayNo=" + holidayNo + ", date=" + date + ", holiday=" + holiday + "]";
	}
}
