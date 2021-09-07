import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import reservationService from '../../service/reservationService';
import timeService from '../../service/timeService'
import receiptService from '../../service/receiptService';

export default function ReservationList() {
    const [reservations, setReservations] = useState(null);
    const [reservation, setReservation] = useState(null);
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(date);
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
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
        dt.current.filter(date, 'revDate', 'custom');
    }, []);

    const filterDate = (value, filter) => {
        if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
            return true;
        }

        if (value === undefined || value === null) {
            return false;
        }

        return value === dateFormat(filter);
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

    const onDateChange = (e) => {
        dt.current.filter(e.value, 'revDate', 'custom');
        setSelectedDate(e.value);
    }


    const nameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">{rowData.name}</span>
            </React.Fragment>
        );
    }

    const timeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">{rowData.revTime}</span>
            </React.Fragment>
        );
    }

    const ssnBodyTemplate = (rowData) => {
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

    const monthNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
    }

    const yearNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
    }

    const confirmDeleteItem = (item) => {
        setReservation(item);
        setDeleteItemDialog(true);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button style={{color: '#1C91FB'}} icon="pi pi-trash" className="p-button-rounded p-button-warning p-button-text" onClick={() => confirmDeleteItem(rowData)} />
            </React.Fragment>
        );
    }

    const hideDeleteItemDialog = () => {
        setDeleteItemDialog(false);
    }

    const deleteItem = () => {
        reservationService.delete(reservation.revNo)
            .then(res => {
                let _time = {
                    date: reservation.revDate,
                    time: reservation.revTime
                }
                setDeleteItemDialog(false);
                //window.location.reload();
                timeService.updateDelete(_time)
            })
            .catch(err => {
                console.log('delete() Error!', err);
            })
    }

    const deleteItemDialogFooter = (
        <React.Fragment>
            <Button label="아니오" icon="pi pi-times" className="p-button-text" onClick={hideDeleteItemDialog} />
            <Button label="예" icon="pi pi-check" className="p-button-text" onClick={deleteItem} />
        </React.Fragment>
    );

    const reset = () => {
        setSelectedDate(date);
        setGlobalFilter('');
        dt.current.reset();
    }

    const header = (
        <div className="table-header">
            <Button type="button" onClick={reset} icon="pi pi-filter-slash" className="p-button-rounded" style={{backgroundColor: '#1C91FB', borderColor: '#1C91FB'}}/>
            <span className="p-input-icon-left" style={{width: '30%', float: 'right'}}>
                <i className="pi pi-search" />
                <InputText type="search" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="검색" />
            </span>
            <Calendar style={{width: '30%', float: 'right'}} id="navigatorstemplate" dateFormat="yy/mm/dd" value={selectedDate} onChange={onDateChange} monthNavigator yearNavigator yearRange="2010:2030"
                                monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate} placeholder="예약 날짜" />
        </div>
    );

    const dateFilter = <Calendar value={selectedDate} onChange={onDateChange} dateFormat="yy-mm-dd" className="p-column-filter" placeholder="Registration Date"/>;

    return (
        <div className="datatable-filter-demo">
            <div className="card">
                <DataTable ref={dt} value={reservations} paginator rows={10}
                    header={header} className="p-datatable-customers"
                    globalFilter={globalFilter} emptyMessage="예약 내역이 없습니다.">
                    <Column style={{ textAlign: 'center', padding: '8px', width: '20%'}} field="name" header="이름" body={nameBodyTemplate} />
                    <Column style={{ textAlign: 'center', padding: '8px', width: '25%' }} field="ssn" filterField="ssn" header="주민등록번호" body={ssnBodyTemplate} />
                    <Column style={{ textAlign: 'center', padding: '8px', width: '20%' }} field="revTime" header="예약시간" body={timeBodyTemplate} />
                    <Column style={{ textAlign: 'center', padding: '8px', width: '20%' }} field="revDate" header="예약날짜" body={dateBodyTemplate} filterElement={dateFilter} filterFunction={filterDate} />
                    <Column style={{ textAlign: 'center', padding: '8px', width: '15%' }} header="예약취소" body={actionBodyTemplate}></Column>
                </DataTable>

                <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {reservation && <span><b>{reservation.name}</b>님의 예약을 취소하시겠습니까?</span>}
                </div>
            </Dialog>
            </div>
        </div>
    );
}