package com.douzone.ucare.vo;

import io.swagger.annotations.ApiModelProperty;

public class BoardVo {
	
	@ApiModelProperty(example="게시물 번호")
	private Long boardNo;
	@ApiModelProperty(example="게시물 제목")
	private String title;
	@ApiModelProperty(example="게시물 내용")
	private String contents;
	@ApiModelProperty(example="게시물 조회수")
	private Long hit;
	@ApiModelProperty(example="게시물 파일 URL")
	private String URL;
	@ApiModelProperty(example="게시물 날짜")
	private String boardDt;
	@ApiModelProperty(example="게시물 시간")
	private String boardTime;
	@ApiModelProperty(example="입력자")
	private Long insNo;
	@ApiModelProperty(example="입력일자")
	private String insDt;
	@ApiModelProperty(example="수정자")
	private Long uptNo;
	@ApiModelProperty(example="수정일자")
	private String uptDt;
	@ApiModelProperty(example="게시물 등록자 번호")
	private Long userNo;
	@ApiModelProperty(example="게시물 등록자 아이디")
	private String userId;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public Long getBoardNo() {
		return boardNo;
	}
	public void setBoardNo(Long boardNo) {
		this.boardNo = boardNo;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getURL() {
		return URL;
	}
	public void setURL(String URL) {
		this.URL = URL;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}
	public Long getHit() {
		return hit;
	}
	public void setHit(Long hit) {
		this.hit = hit;
	}
	public String getBoardDt() {
		return boardDt;
	}
	public void setBoardDt(String boardDt) {
		this.boardDt = boardDt;
	}
	public String getBoardTime() {
		return boardTime;
	}
	public void setBoardTime(String boardTime) {
		this.boardTime = boardTime;
	}
	public Long getInsNo() {
		return insNo;
	}
	public void setInsNo(Long insNo) {
		this.insNo = insNo;
	}
	public String getInsDt() {
		return insDt;
	}
	public void setInsDt(String insDt) {
		this.insDt = insDt;
	}
	public Long getUptNo() {
		return uptNo;
	}
	public void setUptNo(Long uptNo) {
		this.uptNo = uptNo;
	}
	public String getUptDt() {
		return uptDt;
	}
	public void setUptDt(String uptDt) {
		this.uptDt = uptDt;
	}
	public Long getUserNo() {
		return userNo;
	}
	public void setUserNo(Long userNo) {
		this.userNo = userNo;
	}

	
}
	

