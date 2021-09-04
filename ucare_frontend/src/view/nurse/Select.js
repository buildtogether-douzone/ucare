import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import { Skeleton } from 'primereact/skeleton';
import patientService from '../../service/patientService';

export default function Reservation(props) {
    const { select } = props;
//    console.log(select);

    let emptyItem = {
        patientNo: null,
        name: '',
        ssn: '',
        telNo: '',
        time: '',
        userId: ''
    };

        const [items, setItems] = useState(null);
        const [item, setItem] = useState(emptyItem);
        const [selectedPatient, setSelectedPatient] = useState(null);
    
    
        const onPatientChange = (e) => {
            setSelectedPatient(e.value);
        }
    
    
        const selectedPatientTemplate = (option, props) => {
            if (option) {
                return (
                    <div className="country-item country-item-value">
                        <div>{option.name} {option.ssn}</div>
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

    return (
        <div className="p-grid">
            <div className="p-col-12 p-md-6">
                <div className="card p-fluid">
                        <div className="p-field">
                            <label htmlFor="email1">Email</label>
                            <InputText id="email1" type="text" />
                        </div>
                        <div className="p-field">
                            <label htmlFor="age1">Age</label>
                            <InputText id="age1" type="text" />
                        </div>
                </div>
            </div>
        </div>
    )
}