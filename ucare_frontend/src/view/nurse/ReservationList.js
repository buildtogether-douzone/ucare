import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import styles from  '../../assets/scss/Reservation.scss';

import reservationService from '../../service/reservationService';
import timeService from '../../service/timeService'
import receiptService from '../../service/receiptService';
import SockJsClient from 'react-stomp';

import { useRecoilState } from 'recoil';
import { reloadState } from '../../recoil/atom/nurseAtom';

export default function ReservationList() {

    let emptyItem = {
        patientNo: null,
        revNo: null,
        revDate: '',
        revTime: '',
        name: '',
        insurance: ''
    };

    let empty = {
        bp: null,
        bs: null,
        remark: '',
        time: '',
        patientNo: null
    }

    const [reservations, setReservations] = useState(null);
    const [reservation, setReservation] = useState(emptyItem);
    const [item, setItem] = useState(empty);
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(date);
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
    const [itemDialog, setItemDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [value, setValue] = useState('');
    const dt = useRef(null);
    const toast = useRef(null);
    const $websocket = useRef(null);

    const [reload, setReload] = useRecoilState(reloadState);

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
    }, [reload]);

    useEffect(() => {
        reservationService.retrieveAll()
            .then(res => {
                console.log('success!!');
                setReservations(res.data);
            })
            .catch(err => {
                console.log('retrieveAll() Error!', err);
        });
    }, [value])

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
                <span className={styles.mouse} onClick={()=>rowColumnClick(rowData)}>{rowData.name}</span>
            </React.Fragment>
        );
    }


    const rowColumnClick = (rowData) => {
        setReservation({ ...rowData });
        setItem(empty);
        document.body.style.position = "relative";
        document.body.style.overflow = "hidden";
        setItemDialog(true);
    }

    const hideDialog = () => {
        document.body.style.position = "";
        document.body.style.overflow = "";
        setItemDialog(false);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _item = { ...item };
        _item[`${name}`] = val;

        setItem(_item);
    }

    const saveItem = (e) => {
        e.preventDefault();

        let today = new Date();

        let year = today.getFullYear(); // 년도
        let month = ('0' + (today.getMonth() + 1)).slice(-2);  // 월
        let date = ('0' + today.getDate()).slice(-2);  // 날짜

        let todayDate = year + '-' + month + '-' + date;

        if(todayDate !== reservation.revDate) {
            toast.current.show({ severity: 'error', summary: '알림', detail: '금일 예약건만 접수 가능합니다.', life: 3000 });
            return;
        }
    
        let receipt = {
          remark: item.remark,
          bp: item.bp,
          bs: item.bs,
          diagnosisTime: reservation.revTime,
          patientNo: reservation.patientNo,
          userId: sessionStorage.getItem('user')
        }

        receiptService.createRev(receipt)
          .then(res => {
            console.log(receipt.patientNo + '님이 성공적으로 접수되었습니다.');
            reservationService.delete(reservation.revNo)
                .then(res => {
                    $websocket.current.sendMessage('/Doctor');
                    $websocket.current.sendMessage('/Nurse');
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                })
                .catch(err => {
                    console.log('delete() 에러', err);
                });
          })
          .catch(err => {
            console.log('create() 에러', err);
          });

        document.body.style.position = "";
        document.body.style.overflow = "";
        setItemDialog(false);
      };

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
                $websocket.current.sendMessage('/Reservation');
                timeService.updateDelete(_time);
                setReload(!reload);
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

    const itemDialogFooter = (
        <React.Fragment>
            <Button label="취소" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="접수" icon="pi pi-check" className="p-button-text" onClick={saveItem} />
        </React.Fragment>
    );

    const reset = () => {
        setSelectedDate(null);
        setGlobalFilter('');
        dt.current.reset();
    }

    const header = (
        <div className="table-header">
            <Button type="button" onClick={reset} icon="pi pi-filter-slash" className="p-button-rounded p-button-outlined" style={{borderColor: '#1C91FB'}}/>
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
        <div className="datatable-filter">
            <SockJsClient
                url="http://localhost:8080/ucare_backend/start"
                topics={['/topics/nurse']}
                onMessage={msg => { setValue(msg) }}
                ref={$websocket} />
            <Toast ref={toast} />
            <div className="card">
                <DataTable ref={dt} value={reservations} paginator rows={6}
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

            <Dialog baseZIndex={9999} visible={itemDialog} style={{ width: '40%' }} header="접수" footer={itemDialogFooter} modal className="p-fluid" onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="patientNo" style={{fontWeight: 'bold'}}>환자번호</label>
                    <InputText value={reservation.patientNo} disabled />
                </div>
                <div className="p-field" style={{fontWeight: 'bold'}}>
                    <label htmlFor="name">이름</label>
                    <InputText value={reservation.name} disabled />
                </div>
                <div className="p-field">
                <label htmlFor="insurance" style={{fontWeight: 'bold'}}>보험 여부</label>
                    <InputText value={reservation.insurance} disabled />
                </div>
                <div className="p-field" style={{fontWeight: 'bold'}}>
                <label htmlFor="bp">혈압</label>
                <InputText value={item.bp || ''} onChange={(e) => onInputChange(e, 'bp')} />
                </div>
                <div className="p-field" style={{fontWeight: 'bold'}}>
                <label htmlFor="bs">혈당</label>
                <InputText value={item.bs || ''} onChange={(e) => onInputChange(e, 'bs')} />
                </div>              
                <div className="p-field" style={{fontWeight: 'bold'}}>
                <label htmlFor="remark">접수 메모</label>
                <InputTextarea value={item.remark || ''} onChange={(e) => onInputChange(e, 'remark')} rows={5} cols={30} autoResize />
                </div>

            </Dialog>

            </div>
        </div>
    );
}