import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Calendar } from 'primereact/calendar';
import { ListBox } from 'primereact/listbox';
import { Toast } from 'primereact/toast';

import timeService from '../../service/timeService';
import patientService from '../../service/patientService';
import reservationService from '../../service/reservationService';
import ReservationList from './ReservationList';

import { useRecoilState } from 'recoil';
import { reloadState } from '../../recoil/atom/nurseAtom';

export default function Reservation() {

    let emptyItem = {
        patientNo: null,
        name: '',
        ssn: '',
        telNo: ''
    };

    let emptyTime = {
        patientNo: null,
        timeNo: null,
        name: '',
        ssn: '',
        telNo: ''
    };

    // yyyy-MM-dd 포맷으로 반환
    const dateFormat = (date) => {
        var year = date.getFullYear();              //yyyy
        var month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        var day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        return year + '-' + month + '-' + day;
    }

    const [items, setItems] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(emptyItem);
    const [time, setTime] = useState([]);
    const [selectedTime, setSelectedTime] = useState(emptyTime);
    const [date, setDate] = useState(new Date());

    const [reload, setReload] = useRecoilState(reloadState);

    const toast = useRef(null);

    let reservation = {
        patientNo: selectedPatient.patientNo,
        name: selectedPatient.name,
        revDate: dateFormat(date),
        revTime: selectedTime.time,
        insNo: window.sessionStorage.getItem('user_no')
    }

    const retrieveAll = (e) => {
        patientService.retrieveAll()
            .then(res => {
                console.log('success!!');
                setItems(res.data);
            })
            .catch(err => {
                console.log('retrieveAll() Error!', err);
            });
    }

    const retrieveTime = (e) => {
        timeService.retrieveAll(dateFormat(date))
            .then(res => {
                console.log('success!!');
                setTime(res.data);
            })
            .catch(err => {
                console.log('retrieveAll() Error!', err);
            });
    }

    useEffect(() => {
        retrieveAll();
        retrieveTime();
    }, []);

    const onPatientChange = (e) => {
        setSelectedPatient(e.value);
    }

    const selectedPatientTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.name}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const patientOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.name} {option.ssn}</div>
            </div>
        );
    }

    const onTimeChange = (e) => {
        setSelectedTime(e.value);
    }

    const monthNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
    }

    const yearNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
    }

    const onDateChange = (event) => {
        let today = new Date();

        if (dateFormat(today) > dateFormat(event.target.value)) {
            toast.current.show({ severity: 'error', summary: '알림', detail: '금일 이후 날짜를 선택해주세요.', life: 3000 });
            setDate(today);
            timeService.retrieveAll(dateFormat(today))
                .then(res => {
                    console.log('success!!');
                    setTime(res.data);
                })
                .catch(err => {
                    console.log('retrieve() Error!', err);
                });
        }
        else {
            setDate(event.target.value);
            timeService.retrieveAll(dateFormat(event.value))
                .then(res => {
                    console.log('success!!');
                    setTime(res.data);
                })
                .catch(err => {
                    console.log('retrieve() Error!', err);
                });
        }
    }

    const create = (reservation) => {
        console.log(reservation)
        reservationService.create(reservation)
            .then(res => {
                let _time = {
                    date: reservation.revDate,
                    time: reservation.revTime
                }
                console.log(reservation.patientNo + '님의 정보가 성공적으로 등록되었습니다.');
                timeService.updateTime(_time);
                alert(`${reservation.name}님이 예약되었습니다.`)
                setReload(!reload);
            })
            .catch(err => {
                console.log('create() 에러', err);
            });

    };

    return (
        <div className="p-grid" style={{ margin: '10px' }}>
            <Toast ref={toast} />
            <div className="p-col-12 p-lg-6">
                <div className="card p-fluid">
                    <Card>
                        <ReservationList />
                    </Card>
                </div>
            </div>
            <div className="p-col-12 p-lg-4">
                <div className="card p-fluid">
                    <Card title="예약">
                        <div className="p-field">
                            <label htmlFor="name">이름/주민등록번호</label>
                            <Dropdown value={selectedPatient} options={items} onChange={onPatientChange} optionLabel="name" filter filterBy="name" placeholder="이름"
                                valueTemplate={selectedPatientTemplate} itemTemplate={patientOptionTemplate} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="ssn">주민등록번호</label>
                            <InputText id="ssn" type="text" value={selectedPatient.ssn} placeholder="주민등록번호" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="tel">연락처</label>
                            <InputText id="tel" type="text" value={selectedPatient.telNo} placeholder="연락처" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="navigatorstemplate">날짜</label>
                            <Calendar id="navigatorstemplate" dateFormat="yy/mm/dd" value={date} onChange={(e) => onDateChange(e)} monthNavigator yearNavigator yearRange="2010:2030"
                                monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate} />
                        </div>

                        <Button style={{ marginTop: '16px', backgroundColor: '#1C91FB', color: 'white' }} label="예약" className="p-button-outlined" type="submit" onClick={(e) => create(reservation)} />
                    </Card>
                </div>
            </div>

            <div className="p-col-12 p-lg-2">
                <div className="card p-fluid">
                    <Card>
                        <div className="p-field">
                            <label htmlFor="time">시간</label>
                            {time != '' ?
                                <ListBox value={selectedTime} options={time} onChange={(e) => onTimeChange(e)} optionLabel="time" listStyle={{ maxHeight: '375px' }} />
                                : <div className="p-mb-3 p-text-left">예약 가능한 시간이 없습니다.</div>}
                        </div>
                    </Card>
                </div>
            </div>

        </div>
    )
}