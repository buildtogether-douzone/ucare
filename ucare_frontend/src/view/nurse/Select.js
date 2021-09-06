import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import timeService from '../../service/timeService';

export default function Reservation(props) {
    const { select } = props;

    const [time, setTime] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [date, setDate] = useState(new Date());

    // yyyy-MM-dd 포맷으로 반환
    const dateFormat = (date) => {
        var year = date.getFullYear();              //yyyy
        var month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        var day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        return year + '-' + month + '-' + day;
    }

    const retrieveAll = (e) => {
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
    }, []);

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
        timeService.retrieveAll(dateFormat(event.value))
            .then(res => {
                console.log('success!!');
                setTime(res.data);
            })
            .catch(err => {
                console.log('retrieve() Error!', err);
            });
    }

    if (!select) {
        return (
            <div className="p-grid">
                <div className="p-col-12 p-md-6">
                    <div className="card p-fluid">
                        <div className="p-field">
                            <label htmlFor="ssn1">주민등록번호</label>
                            <InputText id="ssn" type="text" value={''} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="telNo1">연락처</label>
                            <InputText id="telNo1" type="text" value={''} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="navigatorstemplate">날짜</label>
                            <Calendar id="navigatorstemplate" dateFormat="yy/mm/dd" value={date} onChange={(e) => onDateChange(e)} monthNavigator yearNavigator yearRange="2010:2030"
                                monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate} />
                        </div>
                        <div className="p-field">
                            <label htmlFor="name">시간</label>
                            <Dropdown value={selectedTime} options={time} onChange={onTimeChange} optionLabel="time" placeholder="시간" />
                        </div>
                        <Button label="예약" className="p-button-outlined" />
                    </div>
                </div>
            </div>
        )
    }




    return (
        <div className="p-grid">
            <div className="p-col-12 p-md-6">
                <div className="card p-fluid">
                    <div className="p-field">
                        <label htmlFor="ssn">주민등록번호</label>
                        <InputText id="ssn" type="text" value={select.ssn} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="telNo">연락처</label>
                        <InputText id="telNo" type="text" value={select.telNo} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="navigatorstemplate">날짜</label>
                        <Calendar id="navigatorstemplate" dateFormat="yy/mm/dd" value={date} onChange={(e) => onDateChange(e)} monthNavigator yearNavigator yearRange="2010:2030"
                            monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate} />
                    </div>
                    <div className="p-field">
                        <label htmlFor="name">시간</label>
                        <Dropdown value={selectedTime} options={time} onChange={onTimeChange} optionLabel="time" placeholder="시간" />
                    </div>

                    <Button label="예약" className="p-button-outlined" />

                </div>
            </div>
        </div>
    )
}