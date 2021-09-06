import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import reservationService from '../../service/reservationService';

export default function ReservationList() {
    const [reservations, setReservations] = useState(null);
    const [selectedRepresentative, setSelectedRepresentative] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [globalFilter, setGlobalFilter] = useState('');
    const dt = useRef(null);

    const retrieveAll = (e) => {
        reservationService.retrieveAll()
            .then(res => {
                console.log('success!!');
                setReservations(res.data);
            })
            .catch(err => {
                console.log('retrieveAll() Error!', err);
            });
    }


    useEffect(() => {
        retrieveAll();
    }, []);

    const filterDate = (value, filter) => {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        return value === formatDate(filter);
    }

    const formatDate = (date) => {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return date.getFullYear() + '-' + month + '-' + day;
    }


    const onDateChange = (e) => {
        dt.current.filter(e.value, 'date', 'custom');
        setSelectedDate(e.value);
    }


    const nameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">{rowData.name}</span>
            </React.Fragment>
        );
    }

    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="image-text">{rowData.ssn}</span>
            </React.Fragment>
        );
    }


    const dateBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">{rowData.revDate}</span>
            </React.Fragment>
        );
    }

    const editItem = (item) => {
        setItem({ ...item });
        setItemDialog(true);
    }

    const confirmDeleteItem = (item) => {
        setItem(item);
        setDeleteItemDialog(true);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editItem(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteItem(rowData)} />
            </React.Fragment>
        );
    }

    const reset = () => {
        setSelectedRepresentative(null);
        setSelectedDate(null);
        setSelectedStatus(null);
        setGlobalFilter('');
        dt.current.reset();
    }

    const header = (
        <div className="table-header">
            <Button style={{width: '15%'}} type="button" label="Clear" className="p-button-outlined" icon="pi pi-filter-slash" onClick={reset} />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="검색" />
            </span>
        </div>
    );

    const dateFilter = <Calendar value={selectedDate} onChange={onDateChange} dateFormat="yy-mm-dd" className="p-column-filter" placeholder="예약날짜"/>;

    return (
        <div className="datatable-filter-demo">
            <div className="card">
                <DataTable ref={dt} value={reservations} paginator rows={10}
                    header={header} className="p-datatable-customers"
                    globalFilter={globalFilter} emptyMessage="예약 내역이 없습니다.">
                    <Column style={{ textAlign: 'center' }} field="name" header="이름" body={nameBodyTemplate} filter filterPlaceholder="이름" />
                    <Column style={{ textAlign: 'center' }} field="ssn" filterField="ssn" header="주민등록번호" body={countryBodyTemplate} filter filterPlaceholder="주민등록번호" filterMatchMode="contains" />
                    <Column style={{ textAlign: 'center' }} field="revDate" header="예약날짜" body={dateBodyTemplate} filter filterElement={dateFilter} filterFunction={filterDate} />
                    <Column style={{ textAlign: 'center' }} header="예약취소" body={actionBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    );
}