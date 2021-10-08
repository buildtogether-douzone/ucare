# U-Care Project

## HIS(Healthcare Information System)

### * Install

```bash
$ git clone https://github.com/buildtogether-douzone/ucare.git
$ cd ucare
$ npm i
$ mvn clean package
```

---

### Team 

Build Together

---

### Team Member 

정신후(Team Leader), 조대헌, 김나은

---

### Project Title

U-Care

---

### System Architecture
<img src="https://github.com/buildtogether-douzone/Document/blob/main/UcareImage/SystemArchitecture.png"/>


### Detailed Architecture
<img src="https://github.com/buildtogether-douzone/Document/blob/main/UcareImage/DetailedArchitecture.png"/>

### Development Environment

+ Front-End: React
+ Back-End: Spring Boot
+ Maven
+ Java 8
+ PostgreSQL



### Path

```bash
ucare
  | --- ucare_frontend
  | 		 | --- config
  | 		 |        | --- webpack.config.js
  | 		 |        | --- babel.config.json
  | 		 | --- public
  | 		 |        | --- favicon.ico
  | 		 |        | --- index.html
  | 		 |        | --- primereact.css
  | 		 | ---  src
  | 		 |       | --- assets
  | 		 |       | --- layout
  | 		 |       | --- lib
  | 		 |       | --- recoil
  | 		 |       | --- redux
  | 		 |       | --- routes
  | 		 |       | --- service
  | 		 |       | --- view
  | 		 |       | --- App.js
  | 		 |       | --- index.js
  | --- ucare_backend
  | 		 | --- src
  | 		 |      | --- main
  | 		 |      |       | --- java\com\douzone\ucare
  | 		 |      |       |             | --- aspect
  | 		 |      |       |             | --- batch
  | 		 |      |       |             | --- config
  | 		 |      |       |             | --- controller
  | 		 |      |       |             | --- exception
  | 		 |      |       |             | --- repository
  | 		 |      |       |             | --- service
  | 		 |      |       |             | --- vo
  | 		 |      |       |             | --- BootInitializer.java
  | 		 |      |       |             | --- UcareApplication.java
  | 		 |      |       | --- resources
  | 		 |      |       |         | --- com\douzone\ucare\config
  | 		 |      |       |         | --- mybatis
  | 		 |      |       |         | --- application.yml
  | 		 |      |       |         | --- logback.xml
  | 		 |      |       | --- webapp
  | 		 |      |       |        | --- assets
  | 		 |      |       |        |       | --- images
  | 		 |      |       |        |       | --- js
  | 		 |      |       |        |       | --- uploads-images
  | 		 |      | --- test
  | 		 |      |      | --- java\com\douzone\ucare
  | 		 |      |      |             | --- UcareApplicationTest.java
  | 		 |      |      | --- resources
  | 		 | --- pom.xml
  | --- node_modules
  | --- .gitignore
  | --- package-lock.json
  | --- package.json
  | --- pom.xml
```



### 사용기술

+ Front-End
  + PrimeReact
  + Material-UI
  + Axios(fetch)
  + Moment
  + Modal
  + React-Full-Page
  + Redux
  + React-Stomp
  + Recoil
  + React-to-print
  + Xlsx
  + Webpack
  + Babel
  + Concurrently
+ Back-End
  + Spring-Batch
  + Spring-Scheduler
  + Spring-Security
  + JWT
  + LomBok
  + Mybatis
  + Spring-Websocket
  + Swagger

### ERD(Entity Relation Diagram)
<img src="https://github.com/buildtogether-douzone/Document/blob/main/UcareImage/ERD.png"/>

### DB Schema(PostgreSQL)
```
-- ucare.batch_job_instance definition

-- Drop table

-- DROP TABLE ucare.batch_job_instance;

CREATE TABLE ucare.batch_job_instance (
	job_instance_id int8 NOT NULL,
	"version" int8 NULL,
	job_name varchar(100) NOT NULL,
	job_key varchar(32) NOT NULL,
	CONSTRAINT batch_job_instance_pkey PRIMARY KEY (job_instance_id),
	CONSTRAINT job_inst_un UNIQUE (job_name, job_key)
);

-- Permissions

ALTER TABLE ucare.batch_job_instance OWNER TO ucare;
GRANT ALL ON TABLE ucare.batch_job_instance TO ucare;


-- ucare.disease definition

-- Drop table

-- DROP TABLE ucare.disease;

CREATE TABLE ucare.disease (
	disease_no bigserial NOT NULL, -- 질병번호
	disease_nm varchar(100) NOT NULL, -- 질병한글명
	symptom varchar(200) NULL, -- 증상
	disease_code varchar NOT NULL, -- 질병코드
	disease_eng_nm varchar NULL, -- 질병영문명
	CONSTRAINT disease_pkey PRIMARY KEY (disease_no)
);

-- Column comments

COMMENT ON COLUMN ucare.disease.disease_no IS '질병번호';
COMMENT ON COLUMN ucare.disease.disease_nm IS '질병한글명';
COMMENT ON COLUMN ucare.disease.symptom IS '증상';
COMMENT ON COLUMN ucare.disease.disease_code IS '질병코드';
COMMENT ON COLUMN ucare.disease.disease_eng_nm IS '질병영문명';

-- Permissions

ALTER TABLE ucare.disease OWNER TO ucare;
GRANT ALL ON TABLE ucare.disease TO ucare;


-- ucare.holiday definition

-- Drop table

-- DROP TABLE ucare.holiday;

CREATE TABLE ucare.holiday (
	holiday_no bigserial NOT NULL, -- 번호
	"date" date NOT NULL, -- 날짜
	holiday bool NOT NULL, -- 휴일유무
	CONSTRAINT holiday_pkey PRIMARY KEY (holiday_no)
);

-- Column comments

COMMENT ON COLUMN ucare.holiday.holiday_no IS '번호';
COMMENT ON COLUMN ucare.holiday."date" IS '날짜';
COMMENT ON COLUMN ucare.holiday.holiday IS '휴일유무';

-- Permissions

ALTER TABLE ucare.holiday OWNER TO ucare;
GRANT ALL ON TABLE ucare.holiday TO ucare;


-- ucare.hospital definition

-- Drop table

-- DROP TABLE ucare.hospital;

CREATE TABLE ucare.hospital (
	hospital_no bigserial NOT NULL, -- 병원번호
	hospital_nm varchar(50) NOT NULL, -- 병원명
	head_nm varchar(50) NOT NULL, -- 병원장명
	address varchar(200) NOT NULL, -- 주소
	tel_no varchar(100) NOT NULL, -- 연락처
	basic_price int8 NOT NULL, -- 기본진료비
	image varchar(200) NULL, -- 이미지
	site_add varchar(200) NULL, -- 사이트 주소
	email varchar(200) NULL, -- 이메일
	fax_no varchar(200) NULL, -- 팩스 번호
	hd_speak text NULL, -- 병원장 인사말
	CONSTRAINT hospital_pkey PRIMARY KEY (hospital_no)
);

-- Column comments

COMMENT ON COLUMN ucare.hospital.hospital_no IS '병원번호';
COMMENT ON COLUMN ucare.hospital.hospital_nm IS '병원명';
COMMENT ON COLUMN ucare.hospital.head_nm IS '병원장명';
COMMENT ON COLUMN ucare.hospital.address IS '주소';
COMMENT ON COLUMN ucare.hospital.tel_no IS '연락처';
COMMENT ON COLUMN ucare.hospital.basic_price IS '기본진료비';
COMMENT ON COLUMN ucare.hospital.image IS '이미지';
COMMENT ON COLUMN ucare.hospital.site_add IS '사이트 주소';
COMMENT ON COLUMN ucare.hospital.email IS '이메일';
COMMENT ON COLUMN ucare.hospital.fax_no IS '팩스 번호';
COMMENT ON COLUMN ucare.hospital.hd_speak IS '병원장 인사말';

-- Permissions

ALTER TABLE ucare.hospital OWNER TO ucare;
GRANT ALL ON TABLE ucare.hospital TO ucare;


-- ucare.medicine definition

-- Drop table

-- DROP TABLE ucare.medicine;

CREATE TABLE ucare.medicine (
	medicine_no bigserial NOT NULL, -- 약품코드
	medicine_nm varchar(100) NOT NULL, -- 약품명
	company varchar(100) NULL, -- 제조사
	medicine_code varchar NOT NULL, -- 약품기준코드
	main_ingredient varchar NULL, -- 주성분
	additive varchar NULL, -- 첨가제
	origin varchar NULL, -- 수입/제조
	CONSTRAINT medicine_pkey PRIMARY KEY (medicine_no)
);

-- Column comments

COMMENT ON COLUMN ucare.medicine.medicine_no IS '약품코드';
COMMENT ON COLUMN ucare.medicine.medicine_nm IS '약품명';
COMMENT ON COLUMN ucare.medicine.company IS '제조사';
COMMENT ON COLUMN ucare.medicine.medicine_code IS '약품기준코드';
COMMENT ON COLUMN ucare.medicine.main_ingredient IS '주성분';
COMMENT ON COLUMN ucare.medicine.additive IS '첨가제';
COMMENT ON COLUMN ucare.medicine.origin IS '수입/제조';

-- Permissions

ALTER TABLE ucare.medicine OWNER TO ucare;
GRANT ALL ON TABLE ucare.medicine TO ucare;


-- ucare."time" definition

-- Drop table

-- DROP TABLE ucare."time";

CREATE TABLE ucare."time" (
	time_no bigserial NOT NULL, -- 번호
	"date" date NOT NULL, -- 진료날짜
	"time" varchar NOT NULL, -- 진료시간
	status bool NULL, -- 상태
	CONSTRAINT time_pkey PRIMARY KEY (time_no)
);

-- Column comments

COMMENT ON COLUMN ucare."time".time_no IS '번호';
COMMENT ON COLUMN ucare."time"."date" IS '진료날짜';
COMMENT ON COLUMN ucare."time"."time" IS '진료시간';
COMMENT ON COLUMN ucare."time".status IS '상태';

-- Permissions

ALTER TABLE ucare."time" OWNER TO ucare;
GRANT ALL ON TABLE ucare."time" TO ucare;


-- ucare."user" definition

-- Drop table

-- DROP TABLE ucare."user";

CREATE TABLE ucare."user" (
	user_no bigserial NOT NULL, -- 유저번호
	id varchar(50) NOT NULL, -- ID
	"password" varchar(200) NOT NULL, -- 비밀번호
	"name" varchar(50) NOT NULL, -- 이름
	gender varchar(10) NOT NULL, -- 성별
	ssn varchar(100) NOT NULL, -- 주민등록번호
	email varchar(50) NOT NULL, -- 이메일
	address varchar(200) NOT NULL, -- 주소
	tel_no varchar(100) NOT NULL, -- 연락처
	"role" varchar(100) NOT NULL, -- 직급
	status varchar(20) NOT NULL, -- 상태
	remark text NULL, -- 비고
	birth date NULL, -- 생일
	image varchar(200) NULL, -- 이미지
	detail_address varchar NULL, -- 상세주소
	CONSTRAINT user_pkey PRIMARY KEY (user_no)
);

-- Column comments

COMMENT ON COLUMN ucare."user".user_no IS '유저번호';
COMMENT ON COLUMN ucare."user".id IS 'ID';
COMMENT ON COLUMN ucare."user"."password" IS '비밀번호';
COMMENT ON COLUMN ucare."user"."name" IS '이름';
COMMENT ON COLUMN ucare."user".gender IS '성별';
COMMENT ON COLUMN ucare."user".ssn IS '주민등록번호';
COMMENT ON COLUMN ucare."user".email IS '이메일';
COMMENT ON COLUMN ucare."user".address IS '주소';
COMMENT ON COLUMN ucare."user".tel_no IS '연락처';
COMMENT ON COLUMN ucare."user"."role" IS '직급';
COMMENT ON COLUMN ucare."user".status IS '상태';
COMMENT ON COLUMN ucare."user".remark IS '비고';
COMMENT ON COLUMN ucare."user".birth IS '생일';
COMMENT ON COLUMN ucare."user".image IS '이미지';
COMMENT ON COLUMN ucare."user".detail_address IS '상세주소';

-- Permissions

ALTER TABLE ucare."user" OWNER TO ucare;
GRANT ALL ON TABLE ucare."user" TO ucare;


-- ucare.batch_job_execution definition

-- Drop table

-- DROP TABLE ucare.batch_job_execution;

CREATE TABLE ucare.batch_job_execution (
	job_execution_id int8 NOT NULL,
	"version" int8 NULL,
	job_instance_id int8 NOT NULL,
	create_time timestamp NOT NULL,
	start_time timestamp NULL,
	end_time timestamp NULL,
	status varchar(10) NULL,
	exit_code varchar(2500) NULL,
	exit_message varchar(2500) NULL,
	last_updated timestamp NULL,
	job_configuration_location varchar(2500) NULL,
	CONSTRAINT batch_job_execution_pkey PRIMARY KEY (job_execution_id),
	CONSTRAINT job_inst_exec_fk FOREIGN KEY (job_instance_id) REFERENCES ucare.batch_job_instance(job_instance_id)
);

-- Permissions

ALTER TABLE ucare.batch_job_execution OWNER TO ucare;
GRANT ALL ON TABLE ucare.batch_job_execution TO ucare;


-- ucare.batch_job_execution_context definition

-- Drop table

-- DROP TABLE ucare.batch_job_execution_context;

CREATE TABLE ucare.batch_job_execution_context (
	job_execution_id int8 NOT NULL,
	short_context varchar(2500) NOT NULL,
	serialized_context text NULL,
	CONSTRAINT batch_job_execution_context_pkey PRIMARY KEY (job_execution_id),
	CONSTRAINT job_exec_ctx_fk FOREIGN KEY (job_execution_id) REFERENCES ucare.batch_job_execution(job_execution_id)
);

-- Permissions

ALTER TABLE ucare.batch_job_execution_context OWNER TO ucare;
GRANT ALL ON TABLE ucare.batch_job_execution_context TO ucare;


-- ucare.batch_job_execution_params definition

-- Drop table

-- DROP TABLE ucare.batch_job_execution_params;

CREATE TABLE ucare.batch_job_execution_params (
	job_execution_id int8 NOT NULL,
	type_cd varchar(6) NOT NULL,
	key_name varchar(100) NOT NULL,
	string_val varchar(250) NULL,
	date_val timestamp NULL,
	long_val int8 NULL,
	double_val float8 NULL,
	identifying bpchar(1) NOT NULL,
	CONSTRAINT job_exec_params_fk FOREIGN KEY (job_execution_id) REFERENCES ucare.batch_job_execution(job_execution_id)
);

-- Permissions

ALTER TABLE ucare.batch_job_execution_params OWNER TO ucare;
GRANT ALL ON TABLE ucare.batch_job_execution_params TO ucare;


-- ucare.batch_step_execution definition

-- Drop table

-- DROP TABLE ucare.batch_step_execution;

CREATE TABLE ucare.batch_step_execution (
	step_execution_id int8 NOT NULL,
	"version" int8 NOT NULL,
	step_name varchar(100) NOT NULL,
	job_execution_id int8 NOT NULL,
	start_time timestamp NOT NULL,
	end_time timestamp NULL,
	status varchar(10) NULL,
	commit_count int8 NULL,
	read_count int8 NULL,
	filter_count int8 NULL,
	write_count int8 NULL,
	read_skip_count int8 NULL,
	write_skip_count int8 NULL,
	process_skip_count int8 NULL,
	rollback_count int8 NULL,
	exit_code varchar(2500) NULL,
	exit_message varchar(2500) NULL,
	last_updated timestamp NULL,
	CONSTRAINT batch_step_execution_pkey PRIMARY KEY (step_execution_id),
	CONSTRAINT job_exec_step_fk FOREIGN KEY (job_execution_id) REFERENCES ucare.batch_job_execution(job_execution_id)
);

-- Permissions

ALTER TABLE ucare.batch_step_execution OWNER TO ucare;
GRANT ALL ON TABLE ucare.batch_step_execution TO ucare;


-- ucare.batch_step_execution_context definition

-- Drop table

-- DROP TABLE ucare.batch_step_execution_context;

CREATE TABLE ucare.batch_step_execution_context (
	step_execution_id int8 NOT NULL,
	short_context varchar(2500) NOT NULL,
	serialized_context text NULL,
	CONSTRAINT batch_step_execution_context_pkey PRIMARY KEY (step_execution_id),
	CONSTRAINT step_exec_ctx_fk FOREIGN KEY (step_execution_id) REFERENCES ucare.batch_step_execution(step_execution_id)
);

-- Permissions

ALTER TABLE ucare.batch_step_execution_context OWNER TO ucare;
GRANT ALL ON TABLE ucare.batch_step_execution_context TO ucare;


-- ucare.board definition

-- Drop table

-- DROP TABLE ucare.board;

CREATE TABLE ucare.board (
	board_no bigserial NOT NULL, -- 공지사항번호
	title varchar(200) NOT NULL, -- 제목
	contents text NOT NULL, -- 내용
	hit int8 NOT NULL, -- 조회수
	url varchar(200) NULL, -- URL
	board_date date NOT NULL, -- 작성날짜
	board_time time NOT NULL, -- 작성시간
	ins_no int8 NULL, -- 입력자
	ins_dt timestamp NULL, -- 입력일자
	upt_no int8 NULL, -- 수정자
	upt_dt timestamp NULL, -- 수정일자
	user_no int4 NULL, -- 유저등록번호
	CONSTRAINT board_pkey PRIMARY KEY (board_no),
	CONSTRAINT "user" FOREIGN KEY (user_no) REFERENCES ucare."user"(user_no)
);

-- Column comments

COMMENT ON COLUMN ucare.board.board_no IS '공지사항번호';
COMMENT ON COLUMN ucare.board.title IS '제목';
COMMENT ON COLUMN ucare.board.contents IS '내용';
COMMENT ON COLUMN ucare.board.hit IS '조회수';
COMMENT ON COLUMN ucare.board.url IS 'URL';
COMMENT ON COLUMN ucare.board.board_date IS '작성날짜';
COMMENT ON COLUMN ucare.board.board_time IS '작성시간';
COMMENT ON COLUMN ucare.board.ins_no IS '입력자';
COMMENT ON COLUMN ucare.board.ins_dt IS '입력일자';
COMMENT ON COLUMN ucare.board.upt_no IS '수정자';
COMMENT ON COLUMN ucare.board.upt_dt IS '수정일자';
COMMENT ON COLUMN ucare.board.user_no IS '유저등록번호';

-- Permissions

ALTER TABLE ucare.board OWNER TO ucare;
GRANT ALL ON TABLE ucare.board TO ucare;


-- ucare.message definition

-- Drop table

-- DROP TABLE ucare.message;

CREATE TABLE ucare.message (
	msg_no bigserial NOT NULL, -- 메세지번호
	"name" varchar(50) NOT NULL, -- 유저이름
	to_name varchar(50) NOT NULL, -- to
	contents text NOT NULL, -- 메세지
	msg_date timestamp NOT NULL, -- 입력날짜
	status bool NOT NULL, -- 상태
	user_no int8 NULL,
	title varchar(200) NOT NULL, -- 제목
	CONSTRAINT msg_pkey PRIMARY KEY (msg_no),
	CONSTRAINT "user" FOREIGN KEY (user_no) REFERENCES ucare."user"(user_no)
);

-- Column comments

COMMENT ON COLUMN ucare.message.msg_no IS '메세지번호';
COMMENT ON COLUMN ucare.message."name" IS '유저이름';
COMMENT ON COLUMN ucare.message.to_name IS 'to';
COMMENT ON COLUMN ucare.message.contents IS '메세지';
COMMENT ON COLUMN ucare.message.msg_date IS '입력날짜';
COMMENT ON COLUMN ucare.message.status IS '상태';
COMMENT ON COLUMN ucare.message.title IS '제목';

-- Permissions

ALTER TABLE ucare.message OWNER TO ucare;
GRANT ALL ON TABLE ucare.message TO ucare;


-- ucare.patient definition

-- Drop table

-- DROP TABLE ucare.patient;

CREATE TABLE ucare.patient (
	patient_no bigserial NOT NULL, -- 환자등록번호
	"name" varchar(50) NOT NULL, -- 이름
	gender varchar(10) NOT NULL, -- 성별
	ssn varchar(100) NOT NULL, -- 주민등록번호
	age int4 NULL, -- 나이
	insurance_yn varchar(10) NOT NULL, -- 보험여부
	tel_no varchar(100) NOT NULL, -- 연락처
	address varchar(200) NOT NULL, -- 주소
	diagnosis_type varchar(10) NOT NULL, -- 진료구분
	visit_date date NOT NULL, -- 내원일
	height varchar(10) NULL, -- 키
	weight varchar(10) NULL, -- 몸무게
	email varchar(50) NULL, -- 이메일
	remark text NULL, -- 비고
	ins_dt date NULL, -- 입력일자
	upt_no varchar(50) NULL, -- 수정자
	upt_dt date NULL, -- 수정일자
	user_no int8 NULL,
	detail_address varchar(200) NULL, -- 상세주소
	CONSTRAINT patient_pkey PRIMARY KEY (patient_no),
	CONSTRAINT "user" FOREIGN KEY (user_no) REFERENCES ucare."user"(user_no)
);

-- Column comments

COMMENT ON COLUMN ucare.patient.patient_no IS '환자등록번호';
COMMENT ON COLUMN ucare.patient."name" IS '이름';
COMMENT ON COLUMN ucare.patient.gender IS '성별';
COMMENT ON COLUMN ucare.patient.ssn IS '주민등록번호';
COMMENT ON COLUMN ucare.patient.age IS '나이';
COMMENT ON COLUMN ucare.patient.insurance_yn IS '보험여부';
COMMENT ON COLUMN ucare.patient.tel_no IS '연락처';
COMMENT ON COLUMN ucare.patient.address IS '주소';
COMMENT ON COLUMN ucare.patient.diagnosis_type IS '진료구분';
COMMENT ON COLUMN ucare.patient.visit_date IS '내원일';
COMMENT ON COLUMN ucare.patient.height IS '키';
COMMENT ON COLUMN ucare.patient.weight IS '몸무게';
COMMENT ON COLUMN ucare.patient.email IS '이메일';
COMMENT ON COLUMN ucare.patient.remark IS '비고';
COMMENT ON COLUMN ucare.patient.ins_dt IS '입력일자';
COMMENT ON COLUMN ucare.patient.upt_no IS '수정자';
COMMENT ON COLUMN ucare.patient.upt_dt IS '수정일자';
COMMENT ON COLUMN ucare.patient.detail_address IS '상세주소';

-- Permissions

ALTER TABLE ucare.patient OWNER TO ucare;
GRANT ALL ON TABLE ucare.patient TO ucare;


-- ucare.receipt definition

-- Drop table

-- DROP TABLE ucare.receipt;

CREATE TABLE ucare.receipt (
	receipt_no bigserial NOT NULL, -- 접수번호
	receipt_dt date NOT NULL, -- 접수날짜
	receipt_time time NOT NULL, -- 접수시간
	accept_yn varchar(5) NOT NULL, -- 수납여부
	remark text NULL, -- 비고
	bp int4 NULL, -- 혈압
	bs int4 NULL, -- 혈당
	user_no int8 NOT NULL, -- 입력자
	ins_dt timestamp NOT NULL, -- 입력일자
	upt_no varchar(50) NULL, -- 수정자
	upt_dt timestamp NULL, -- 수정일자
	patient_no int8 NULL,
	state varchar(50) NULL, -- 상태
	diagnosis_time varchar NULL, -- 진료시간
	CONSTRAINT receipt_pkey PRIMARY KEY (receipt_no),
	CONSTRAINT patient FOREIGN KEY (patient_no) REFERENCES ucare.patient(patient_no),
	CONSTRAINT "user" FOREIGN KEY (user_no) REFERENCES ucare."user"(user_no)
);

-- Column comments

COMMENT ON COLUMN ucare.receipt.receipt_no IS '접수번호';
COMMENT ON COLUMN ucare.receipt.receipt_dt IS '접수날짜';
COMMENT ON COLUMN ucare.receipt.receipt_time IS '접수시간';
COMMENT ON COLUMN ucare.receipt.accept_yn IS '수납여부';
COMMENT ON COLUMN ucare.receipt.remark IS '비고';
COMMENT ON COLUMN ucare.receipt.bp IS '혈압';
COMMENT ON COLUMN ucare.receipt.bs IS '혈당';
COMMENT ON COLUMN ucare.receipt.user_no IS '입력자';
COMMENT ON COLUMN ucare.receipt.ins_dt IS '입력일자';
COMMENT ON COLUMN ucare.receipt.upt_no IS '수정자';
COMMENT ON COLUMN ucare.receipt.upt_dt IS '수정일자';
COMMENT ON COLUMN ucare.receipt.state IS '상태';
COMMENT ON COLUMN ucare.receipt.diagnosis_time IS '진료시간';

-- Permissions

ALTER TABLE ucare.receipt OWNER TO ucare;
GRANT ALL ON TABLE ucare.receipt TO ucare;


-- ucare.reservation definition

-- Drop table

-- DROP TABLE ucare.reservation;

CREATE TABLE ucare.reservation (
	rev_no bigserial NOT NULL, -- 예약번호
	rev_date date NOT NULL, -- 예약날짜
	rev_time varchar NOT NULL, -- 예약시간
	ins_no int8 NULL, -- 입력자
	ins_dt timestamp NULL, -- 입력일자
	upt_no int8 NULL, -- 수정자
	upt_dt timestamp NULL, -- 수정일자
	patient_no int4 NULL, -- 환자등록번호
	receipt_yn bool NULL DEFAULT false, -- 접수여부
	CONSTRAINT rev_pkey PRIMARY KEY (rev_no),
	CONSTRAINT patient FOREIGN KEY (patient_no) REFERENCES ucare.patient(patient_no)
);

-- Column comments

COMMENT ON COLUMN ucare.reservation.rev_no IS '예약번호';
COMMENT ON COLUMN ucare.reservation.rev_date IS '예약날짜';
COMMENT ON COLUMN ucare.reservation.rev_time IS '예약시간';
COMMENT ON COLUMN ucare.reservation.ins_no IS '입력자';
COMMENT ON COLUMN ucare.reservation.ins_dt IS '입력일자';
COMMENT ON COLUMN ucare.reservation.upt_no IS '수정자';
COMMENT ON COLUMN ucare.reservation.upt_dt IS '수정일자';
COMMENT ON COLUMN ucare.reservation.patient_no IS '환자등록번호';
COMMENT ON COLUMN ucare.reservation.receipt_yn IS '접수여부';

-- Permissions

ALTER TABLE ucare.reservation OWNER TO ucare;
GRANT ALL ON TABLE ucare.reservation TO ucare;


-- ucare.diagnosis definition

-- Drop table

-- DROP TABLE ucare.diagnosis;

CREATE TABLE ucare.diagnosis (
	diagnosis_no bigserial NOT NULL, -- 진료번호
	diagnosis_memo text NOT NULL, -- 진료메모
	cure_yn varchar(50) NOT NULL, -- 치료여부
	diagnosis_dt date NOT NULL, -- 진료날짜
	ins_dt date NULL, -- 입력일자
	upt_no varchar(50) NULL, -- 수정자
	upt_dt date NULL, -- 수정일자
	remark text NULL, -- 비고
	user_no int8 NULL,
	receipt_no int8 NULL,
	diagnosis_time time NULL, -- 진료시간
	patient_no int8 NULL, -- 환자번호
	disease_nm varchar NULL, -- 병명
	medicine_nm varchar NULL, -- 약품명
	CONSTRAINT diagnosis_pkey PRIMARY KEY (diagnosis_no),
	CONSTRAINT patient FOREIGN KEY (patient_no) REFERENCES ucare.patient(patient_no),
	CONSTRAINT receipt FOREIGN KEY (receipt_no) REFERENCES ucare.receipt(receipt_no),
	CONSTRAINT "user" FOREIGN KEY (user_no) REFERENCES ucare."user"(user_no)
);

-- Column comments

COMMENT ON COLUMN ucare.diagnosis.diagnosis_no IS '진료번호';
COMMENT ON COLUMN ucare.diagnosis.diagnosis_memo IS '진료메모';
COMMENT ON COLUMN ucare.diagnosis.cure_yn IS '치료여부';
COMMENT ON COLUMN ucare.diagnosis.diagnosis_dt IS '진료날짜';
COMMENT ON COLUMN ucare.diagnosis.ins_dt IS '입력일자';
COMMENT ON COLUMN ucare.diagnosis.upt_no IS '수정자';
COMMENT ON COLUMN ucare.diagnosis.upt_dt IS '수정일자';
COMMENT ON COLUMN ucare.diagnosis.remark IS '비고';
COMMENT ON COLUMN ucare.diagnosis.diagnosis_time IS '진료시간';
COMMENT ON COLUMN ucare.diagnosis.patient_no IS '환자번호';
COMMENT ON COLUMN ucare.diagnosis.disease_nm IS '병명';
COMMENT ON COLUMN ucare.diagnosis.medicine_nm IS '약품명';

-- Permissions

ALTER TABLE ucare.diagnosis OWNER TO ucare;
GRANT ALL ON TABLE ucare.diagnosis TO ucare;


-- ucare.prescription definition

-- Drop table

-- DROP TABLE ucare.prescription;

CREATE TABLE ucare.prescription (
	prescription_no bigserial NOT NULL, -- 처방코드
	diagnosis_no int8 NOT NULL, -- 진료코드
	patient_no int8 NOT NULL, -- 환자코드
	medicine_nm varchar NOT NULL, -- 처방약
	dosage int4 NULL, -- 투여량
	dosing_day int4 NULL, -- 투약일수
	"usage" varchar NULL, -- 용법
	CONSTRAINT prescription_pkey PRIMARY KEY (prescription_no),
	CONSTRAINT diagnosis FOREIGN KEY (diagnosis_no) REFERENCES ucare.diagnosis(diagnosis_no),
	CONSTRAINT patient FOREIGN KEY (patient_no) REFERENCES ucare.patient(patient_no)
);

-- Column comments

COMMENT ON COLUMN ucare.prescription.prescription_no IS '처방코드';
COMMENT ON COLUMN ucare.prescription.diagnosis_no IS '진료코드';
COMMENT ON COLUMN ucare.prescription.patient_no IS '환자코드';
COMMENT ON COLUMN ucare.prescription.medicine_nm IS '처방약';
COMMENT ON COLUMN ucare.prescription.dosage IS '투여량';
COMMENT ON COLUMN ucare.prescription.dosing_day IS '투약일수';
COMMENT ON COLUMN ucare.prescription."usage" IS '용법';

-- Permissions

ALTER TABLE ucare.prescription OWNER TO ucare;
GRANT ALL ON TABLE ucare.prescription TO ucare;
```
