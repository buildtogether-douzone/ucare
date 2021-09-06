import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { SelectButton } from 'primereact/selectbutton';
import { ListBox } from 'primereact/listbox';
import { DataScroller } from 'primereact/datascroller';
import { Rating } from 'primereact/rating';
import timeService from '../../service/timeService';
import patientService from '../../service/patientService';
import reservationService from '../../service/reservationService';


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

    const [items, setItems] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(emptyItem);
    const [time, setTime] = useState(null);
    const [selectedTime, setSelectedTime] = useState(emptyTime);
    const [date, setDate] = useState(new Date());

    let reservation = {
        patientNo: selectedPatient.patientNo || null,
        revDate: date,
        revTime: '',
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

    // yyyy-MM-dd 포맷으로 반환
    const dateFormat = (date) => {
        var year = date.getFullYear();              //yyyy
        var month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        var day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        return year + '-' + month + '-' + day;
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
        reservation.revDate = event.target.value;
        timeService.retrieveAll(dateFormat(event.value))
            .then(res => {
                console.log('success!!');
                setTime(res.data);
            })
            .catch(err => {
                console.log('retrieve() Error!', err);
            });
    }

    const create = (reservation) => {
        reservationService.create(reservation)
            .then(res => {
                console.log(reservation.patientNo + '님의 정보가 성공적으로 등록되었습니다.');
            })
            .catch(err => {
                console.log('create() 에러', err);
            });

    };

    return (
        <div className="p-grid" style={{ margin: '10px' }}>

            <div className="p-col-12 p-lg-8">
                <div className="card p-fluid">
                    <Card title="예약">
                        <div className="p-field">
                            <label htmlFor="name">이름/주민등록번호</label>
                            <Dropdown value={selectedPatient} options={items} onChange={onPatientChange} optionLabel="name" filter showClear filterBy="name" placeholder="이름"
                                valueTemplate={selectedPatientTemplate} itemTemplate={patientOptionTemplate} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="ssn">주민등록번호</label>
                            <InputText id="ssn" type="text" value={selectedPatient.ssn} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="tel">연락처</label>
                            <InputText id="tel" type="text" value={selectedPatient.telNo} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="navigatorstemplate">날짜</label>
                            <Calendar id="navigatorstemplate" dateFormat="yy/mm/dd" value={date} onChange={(e) => onDateChange(e)} monthNavigator yearNavigator yearRange="2010:2030"
                                monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate} />
                        </div>

                        <Button label="예약" className="p-button-outlined" type="submit" onClick={(e) => create(reservation)} />

                    </Card>
                </div>

            </div>

            <div className="p-col-12 p-lg-4">
                <div className="card p-fluid">
                    <Card>
                        <div className="p-field">
                            <label htmlFor="time">시간</label>
                            <ListBox value={selectedTime} options={time} onChange={(e) => (reservation.revTime = e.value.time)} optionLabel="time" listStyle={{ maxHeight: '375px' }} />
                        </div>
                    </Card>
                </div>
            </div>

        </div>
    )
}