import React, { useState, useEffect, useRef } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel';
import { ProgressBar } from 'primereact/progressbar';

import statusService from '../../service/statusService';
import timeService from '../../service/timeService';
import patientService from '../../service/patientService';
import diagnosisService from '../../service/diagnosisService';

import '../../assets/scss/DataScroller.scss';

export default function Status() {

    let emptyItem = {
        receiptNo: null,
        name: '',
        state: '',
        diagnosisTime: ''
    };

    let emptyPatient = {
        patientNo: null,
        name: '',
        age: '',
        gender: '',
        insurance_yn: '',
        diagnosis_type: ''
    }

    let emptyPastDiagnosis = {
        diagnosisNo: null,
        diagnosisMemo: '',
        cureYN: '',
        diagnosisDate: '',
        diseaseName: ''
    }

    const [items, setItems] = useState([]);
    const [pastDiagnosis, setPastDiagnosis] = useState([]);
    const [item, setItem] = useState(emptyItem);
    const [pastDiagnosisItem, setPastDiagnosisItem] = useState(emptyPastDiagnosis);
    const [patient, setPatient] = useState(emptyPatient);
    const [date, setDate] = useState(new Date());
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);

    const menu = useRef(null);

    const options = [
        {
            items: [
                {
                    label: '진료',
                    icon: 'pi pi-refresh',
                    command: () => {
                        let _items = [...items];
                        let _item = {...item};
                        const value = 'care';

                        const index = findIndexByNo(item.receiptNo);

                        _items[index].state = 'care';
                        _items[index].value = '진료중';
                        _item = _items[index];

                        statusService.update(_item)
                        .then( res => {
                            console.log('success!!');
                            setItems(_items);
                            setItem(emptyItem);
                        })
                        .catch(err => {
                            console.log('update() Error!', err);
                        });
                    }
                },
                {
                    label: '접수취소',
                    icon: 'pi pi-times',
                    command: () => {
                        confirmDeleteItem(item);
                    }
                }
            ]
        }
    ];

    useEffect(() => {
        statusService.retrieve(dateFormat(date))
          .then( res => {
            console.log('success!!');

            for(var i = 0; i < res.data.length; i++) {
                if(res.data[i].state === 'care') {
                    res.data[i].value = '진료중';
                } else if(res.data[i].state === 'careWait') {
                    res.data[i].value = '진료대기중';
                } else if(res.data[i].state === 'wait') {
                    res.data[i].value = '수납대기중';
                } else {
                    res.data[i].value = '완료';
                }
            }
            setItems(res.data);
        })
          .catch(err => {
            console.log('retrieve() Error!', err);
        });
    }, []);

    const deleteItem = () => {
        let _items = [...items];
        let _item = {...item};

        const index = findIndexByNo(item.receiptNo);

        _item = _items[index];

        statusService.delete(_item.receiptNo)
            .then( res => {
                console.log('success!!');
                timeService.updateByCancel(_item);
                let _items = items.filter(item => item.receiptNo !== _item.receiptNo);
                setItems(_items);
                setItem(emptyItem);
                setDeleteItemDialog(false);
            })
            .catch(err => {
                console.log('delete() Error!', err);
            });
    }

    const confirmDeleteItem = (item) => {
        setItem(item);
        setDeleteItemDialog(true);
    }

    const selectOptions = [
        {label: '진료중', value: 'care'},
        {label: '진료대기중', value: 'careWait'},
        {label: '수납대기중', value: 'wait'},
        {label: '완료', value: 'finish'}
    ];

    // yyyy-MM-dd 포맷으로 반환
    const dateFormat = (date) => {
        var year = date.getFullYear();              //yyyy
        var month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        var day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        return  year + '-' + month + '-' + day;
    }

    const menuControl = (e, data) => {
        patientService.retrieve(data.patientNo)
            .then(res => {
                setPatient(res.data[0]);
                diagnosisService.retrieveByPatientNo(res.data[0].patientNo)
                    .then(res => {
                        setPastDiagnosis(res.data);
                    })
                    .catch(err => {
                        console.log('retrieveByPatientNo() Error!', err);
                    })
            })
            .catch(err => {
                console.log('retrieve() Error!', err);
            });
    }

    const itemTemplate = (data) => {
        return (
            <div className="product-item" onClick={(e) => menuControl(e, data)} aria-controls="popup_menu" aria-haspopup>
                <div className="product-detail">
                    <div className="product-name">{data.name}</div>
                    <div className="product-description">{data.diagnosisTime}</div>
                </div>
                <div className="product-price">
                    <div className="product-name">{data.value}</div>
                </div>
            </div>
        );
    }

    const pastDiagnosisTemplate = (data) => {
        return (
            <div className="product-item" aria-controls="popup_menu" aria-haspopup>
                <div className="product-detail">
                    <div className="product-name">{data.diagnosisTime}</div>
                </div>
                <div className="product-price">
                    <div className="product-name">{data.diseaseName}</div>
                    <div className="product-description">{data.cureYN}</div>
                </div>
            </div>
        );
    }

    const findIndexByNo = (receiptNo) => {
        let index = -1;
        for (let i = 0; i < items.length; i++) {
            if (items[i].receiptNo === receiptNo) {
                index = i;
                break;
            }
        }

        return index;
    }

    const onSelectChange = (event, data) => {
        let _items = [...items];
        let _item = {...item};
        const value = event.value;

        const index = findIndexByNo(data.receiptNo);

        _items[index].state = event.value;
        _item = _items[index];

        statusService.update(_item)
          .then( res => {
            console.log('success!!');
            setItem(emptyItem);
        })
          .catch(err => {
            console.log('update() Error!', err);
        });
    }

    const onDateChange = (event) => {
        statusService.retrieve(dateFormat(event.value))
          .then( res => {
            console.log('success!!');
            setItems(res.data);
        })
          .catch(err => {
            console.log('retrieve() Error!', err);
        });
    }

    const hideDeleteItemDialog = () => {
        setDeleteItemDialog(false);
    }

    const deleteItemDialogFooter = (
        <React.Fragment>
            <Button label="아니오" icon="pi pi-times" className="p-button-text" onClick={hideDeleteItemDialog} />
            <Button label="예" icon="pi pi-check" className="p-button-text" onClick={deleteItem} />
        </React.Fragment>
    );

    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div style={{textAlign: 'left'}}>
                    <Calendar dateFormat="yy/mm/dd" value={date} onChange={(e) => onDateChange(e)}></Calendar>
                </div>
            </div>
        );
    }

    const header = renderHeader();

    return (
        <div className="card">
            <div className="p-grid">
                <div className="p-col-12 p-md-6 p-lg-4">
                        <div className="datascroller" style={{ justifyContent:'center', padding: '20px' }}>
                                <DataScroller value={items} itemTemplate={itemTemplate} rows={10} inline scrollHeight="500px" header={header} />
                        </div>
                </div>
                <div className="p-col-12 p-md-6 p-lg-4">
                <div className="card p-fluid">
                <Panel header="환자정보" style={{ height: '100%' }} style={{ justifyContent:'center', padding: '20px' }}>
                    <div className="activity-header">
                        <div className="p-grid">
                            <div className="p-col-6">
                                <span style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center'}}>{patient.name}{patient.name && '/'}{patient.gender}</span>
                            </div>
                            <div className="p-col-6" style={{ textAlign: 'right' }}>
                            </div>
                        </div>
                    </div>

                    <ul className="activity-list">
                        <li>
                            <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                <h5 className="activity p-m-0">보험여부</h5>
                                <div className="count">{patient.insurance}</div>
                            </div>
                        </li>
                        <li>
                            <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                <h5 className="activity p-m-0">진료구분</h5>
                                <div className="count">{patient.diagnosis}</div>
                            </div>
                        </li>
                    </ul>
                </Panel>
                </div>
                <div className="card p-fluid">
                <Panel header="과거병력" style={{ height: '100%' }} style={{ justifyContent:'center', padding: '20px' }}>
                    <div className="activity-header">
                            <div className="datascroller">
                                <DataScroller value={pastDiagnosis} itemTemplate={pastDiagnosisTemplate} rows={3} inline scrollHeight="300px" />
                            </div>
                    </div>
                </Panel>
                </div>
                </div>
                <div className="p-col-12 p-md-6 p-lg-4">
                <Panel header="진료" style={{ height: '100%' }} style={{ justifyContent:'center', padding: '20px' }}>
                    <div className="activity-header">
                        <div className="p-grid">
                            <div className="p-col-6">
                                <span style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center'}}>{patient.name}{patient.name && '/'}{patient.gender}</span>
                                <p>Updated 1 minute ago</p>
                            </div>
                            <div className="p-col-6" style={{ textAlign: 'right' }}>
                                <Button label="Refresh" icon="pi pi-refresh" />
                            </div>
                        </div>
                    </div>

                    <ul className="activity-list">
                        <li>
                            <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                <h5 className="activity p-m-0">Income</h5>
                                <div className="count">$900</div>
                            </div>
                            <ProgressBar value={95} showValue={false} />
                        </li>
                        <li>
                            <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                <h5 className="activity p-m-0">Tax</h5>
                                <div className="count" style={{ backgroundColor: '#f9c851' }}>$250</div>
                            </div>
                            <ProgressBar value={24} showValue={false} />
                        </li>
                    </ul>
                </Panel>
                </div>
            </div>
            <Menu model={options} popup ref={menu} id="popup_menu" />

            <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {item && <span><b>접수를 취소하시겠습니까?</b></span>}
                </div>
            </Dialog>
        </div>
    );
}