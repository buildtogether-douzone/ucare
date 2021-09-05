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

    if(!select){
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
                </div>
            </div>
        </div>
    )
}