import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import { AutoComplete } from 'primereact/autocomplete';
import patientService from '../../service/patientService';
import Select from './Select';


export default function Reservation() {

        const [items, setItems] = useState([]);
        const [selectedPatient, setSelectedPatient] = useState(null);
        const [time, setTime] = useState(null);  
        const [selectedTime, setSelectedTime] = useState(null);   
           
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
    
        useEffect(() => {
            retrieveAll();
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



    return (
        <div className="p-grid">
            <div className="p-col-12 p-md-6">
                <div className="card p-fluid">
                    <Card title="예약">
                        <div className="p-field">
                        <label htmlFor="name">이름/주민등록번호</label>
                <Dropdown value={selectedPatient} options={items} onChange={onPatientChange} optionLabel="name" filter showClear filterBy="name" placeholder="이름"
                    valueTemplate={selectedPatientTemplate} itemTemplate={patientOptionTemplate} />
                    </div>
                       <Select select={selectedPatient} />
                       <div className="p-field">
                        <label htmlFor="name">시간</label>
                <Dropdown value={selectedTime} options={time} onChange={onTimeChange} optionLabel="name" placeholder="시간" />
                    </div>
                    </Card>

                </div>
            </div>
        </div>
    )
}