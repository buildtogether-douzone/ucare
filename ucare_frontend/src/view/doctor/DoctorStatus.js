import React, { useState, useEffect, useRef, Fragment } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { InputText } from "primereact/inputtext";

import statusService from '../../service/statusService';
import timeService from '../../service/timeService';
import patientService from '../../service/patientService';
import receiptService from '../../service/receiptService';
import diagnosisService from '../../service/diagnosisService';
import diseaseService from '../../service/diseaseService';

import styles from '../../assets/scss/DataScroller.scss';

import SockJsClient from 'react-stomp';

export default function DoctorDiagnosis() {

    let emptyItem = {
        receiptNo: null,
        name: '',
        state: '',
        diagnosisTime: '',
        value: ''
    };

    let emptyDiseaseItem = {
        diseaseNo: null,
        diseaseCode: '',
        diseaseNm: '',
        diseaseEngNm: '',
        symptom: ''
    };

    let emptyPatient = {
        patientNo: null,
        name: '',
        age: '',
        gender: '',
        insurance: '',
        diagnosis: ''
    };

    const [items, setItems] = useState([]);
    const [pastDiagnosis, setPastDiagnosis] = useState([]);
    const [item, setItem] = useState(emptyItem);
    const [patient, setPatient] = useState(emptyPatient);
    const [date, setDate] = useState(new Date());
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
    const [diseaseItem, setDiseaseItem] = useState([]);
    const [diseaseItems, setDiseaseItems] = useState([]);
    const [memo, setMemo] = useState('');
    const [cureYN, setCureYN] = useState('');
    const [diseaseItemDialog, setDiseaseItemDialog] = useState(false);
    const [diseaseSelectedItem, setDiseaseSelectedItem] = useState(emptyDiseaseItem);
    const [globalFilter, setGlobalFilter] = useState(null);

    const [reload, setReload] = useState('');

    const menu = useRef(null);
    const diseaseDt = useRef(null);
    const toast = useRef(null);
    const $websocket = useRef(null);

    const options = [
        {
            items: [
                {
                    label: '진료',
                    icon: 'pi pi-refresh',
                    command: () => {
                        let _items = [...items];
                        let _item = { ...item };
                        const value = 'care';

                        const index = findIndexByNo(item.receiptNo);

                        _items[index].state = 'care';
                        _items[index].value = '진료중';
                        _item = _items[index];

                        statusService.update(_item)
                            .then(res => {
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
            .then(res => {
                console.log('success!!');

                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].state === 'care') {
                        res.data[i].value = '진료중';
                    } else if (res.data[i].state === 'careWait') {
                        res.data[i].value = '진료대기중';
                    } else if (res.data[i].state === 'wait') {
                        res.data[i].value = '완료';
                    } else {
                        res.data[i].value = '완료';
                    }
                }
                setItems(res.data);
            })
            .catch(err => {
                console.log('retrieve() Error!', err);
            });

        diseaseService.retrieveAll()
            .then(res => {
                console.log('success!!');
                setDiseaseItems(res.data);
            })
            .catch(err => {
                console.log('retrieveDisease() Error!', err);
            });

    }, []);

    useEffect(() => {
        statusService.retrieve(dateFormat(date))
            .then(res => {
                console.log('success!!');

                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].state === 'care') {
                        res.data[i].value = '진료중';
                    } else if (res.data[i].state === 'careWait') {
                        res.data[i].value = '진료대기중';
                    } else if (res.data[i].state === 'wait') {
                        res.data[i].value = '완료';
                    } else {
                        res.data[i].value = '완료';
                    }
                }
                setItems(res.data);
            })
            .catch(err => {
                console.log('retrieve() Error!', err);
            });

        diseaseService.retrieveAll()
            .then(res => {
                console.log('success!!');
                setDiseaseItems(res.data);
            })
            .catch(err => {
                console.log('retrieveDisease() Error!', err);
            });

    }, [reload]);

    const deleteItem = () => {
        let _items = [...items];
        let _item = { ...item };

        const index = findIndexByNo(item.receiptNo);

        _item = _items[index];

        statusService.delete(_item.receiptNo)
            .then(res => {
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

    // yyyy-MM-dd 포맷으로 반환
    const dateFormat = (date) => {
        var year = date.getFullYear();              //yyyy
        var month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        var day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        return year + '-' + month + '-' + day;
    }

    const menuControl = (e, data) => {
        const index = findIndexByNo(data.receiptNo);
        setItem(items[index]);

        patientService.retrieve(data.patientNo)
            .then(res => {
                setPatient(res.data);
                console.log(res.data);
                diagnosisService.retrieveByPatientNo(res.data.patientNo)
                    .then(res => {
                        for (var i = 0; i < res.data.length; i++) {
                            if ((res.data[i].cureYN === 'true') || (res.data[i].cureYN === 'complete'))
                                res.data[i].value = '치료';
                            else
                                res.data[i].value = '치료X';
                        }
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
            <div className={styles.product_item} onClick={(e) => menuControl(e, data)} aria-controls="popup_menu" aria-haspopup>
                <div className={styles.product_detail}>
                    <div className={styles.product_name}>{data.name}</div>
                    <div className={styles.product_description}>{data.diagnosisTime}</div>
                </div>
                <div className={styles.product_price}>
                    { data.value == "완료" ?
                        <div style={{ color: '#8E8E8E' }}>{data.value}</div> :
                    data.value == "진료중" ?
                        <div style={{ color: '#FFA040' }}>{data.value}</div> :
                        <div style={{ color: '#1C91FB' }}>{data.value}</div>
                    }
                </div>
            </div>
        );
    }

    const pastDiagnosisTemplate = (data) => {
        return (
            <div className={styles.product_item} aria-controls="popup_menu" aria-haspopup>
                <div className={styles.product_detail}>
                    <div className={styles.product_name} style={{ fontWeight: 'bold' }}>{data.diagnosisDate}</div>
                </div>
                <div className={styles.product_price}>
                    <div className={styles.product_name} style={{ fontSize: 'small' }}>{data.diseaseNm}</div>
                    <div className={styles.product_description} style={{ fontSize: 'small' }}>{data.value}</div>
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

    const onDateChange = (event) => {
        setDate(dateFormat(event.value));
        statusService.retrieve(dateFormat(event.value))
            .then(res => {
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

    const hideDiseaseItemDialog = () => {
        setDiseaseItemDialog(false);
    }

    const inputDiseaseItemDialog = () => {
        setDiseaseItemDialog(false);
    }

    const confirmDiseaseItem = () => {
        setDiseaseItemDialog(true);
    }

    const deleteItemDialogFooter = (
        <React.Fragment>
            <Button label="아니오" icon="pi pi-times" className="p-button-text" onClick={hideDeleteItemDialog} />
            <Button label="예" icon="pi pi-check" className="p-button-text" onClick={deleteItem} />
        </React.Fragment>
    );

    const saveDiagnosis = () => {
        if (item.state === 'careWait') {
            toast.current.show({ severity: 'error', summary: '알림', detail: '진료 대기중인 환자입니다.', life: 3000 });
            return;
        }

        if (item.value === '완료') {
            toast.current.show({ severity: 'error', summary: '알림', detail: '진료가 완료된 환자입니다.', life: 3000 });
            return;
        }

        if (patient.patientNo === null) {
            toast.current.show({ severity: 'error', summary: '알림', detail: '환자 정보를 선택해주세요.', life: 3000 });
            return;
        }
        if (diseaseSelectedItem.diseaseNm === '') {
            toast.current.show({ severity: 'error', summary: '알림', detail: '병명을 입력해주세요.', life: 3000 });
            return;
        }

        let diagnosisItem = {
            cureYN: cureYN,
            diagnosisMemo: memo,
            userNo: sessionStorage.getItem('user_no'),
            receiptNo: item.receiptNo,
            diseaseNm: '',
            patientNo: patient.patientNo,
            medicineNm: ''
        };

        let _diseaseNm = '';
        _diseaseNm = diseaseSelectedItem.diseaseNm;

        diagnosisItem.diseaseNm = _diseaseNm;

        diagnosisService.create(diagnosisItem)
            .then(res => {
                console.log('success!!');
                setDiseaseItem(null);
                setCureYN('');
                setMemo('');
                setDiseaseItem([]);
                setDiseaseSelectedItem(emptyDiseaseItem);

                let _patientItem = patient;
                _patientItem.diagnosis = '재진';

                patientService.updateDiagnosis(_patientItem)
                    .then(res => {
                        setPatient(_patientItem);
                    })
                    .catch(err => {
                        console.log('update() error', err);
                    })

                let _receiptItem = item;
                _receiptItem.state = 'wait';
                _receiptItem.value = "완료";

                receiptService.updateState(_receiptItem).then(res => {
                    let _items = items.filter(item => item.receiptNo !== _receiptItem.receiptNo);
                    _items.push(_receiptItem);
                    setItems(_items);

                    $websocket.current.sendMessage('/Nurse');
                })
                    .catch(err => {
                        console.log('update() error', err);
                    })
            })
            .catch(err => {
                console.log('update() Error!', err);
            });
    }

    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div style={{ textAlign: 'left' }}>
                    <Calendar dateFormat="yy/mm/dd" value={date} onChange={(e) => onDateChange(e)}></Calendar>
                </div>
            </div>
        );
    }

    const emptyMessage = () => {
        return (
            <span style={{ fontSize: '20px', display: 'block', textAlign: 'center', paddingTop: '40%', paddingBottom: '40%' }}>환자 내역이 없습니다.</span>
        );
    }

    const empty = () => {
        return (
            <span style={{ fontSize: '20px', display: 'block', textAlign: 'center', paddingTop: '20%', paddingBottom: '20%' }}>과거 병력이 없습니다.</span>
        );
    }

    const handleClickSendTo = () => {
        $websocket.current.sendMessage('/Nurse');
    };

    const diseaseHeader = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const header = renderHeader();

    return (
        <Fragment>
            <SockJsClient
                url="http://localhost:8080/ucare_backend/start"
                topics={['/topics/doctor']}
                onMessage={msg => { setReload(msg) }}
                ref={$websocket} />
            <Toast ref={toast} position="top-center"/>
            <div className="card" style={{ margin: '20px', height: '85%' }}>
                <div className="p-grid" style={{ height: '100%' }}>
                    <div className="p-col-12 p-md-6 p-lg-4">
                        <Card style={{ height: '100%' }}>
                            <TabView>
                                <TabPanel header={"전체" + "(" + items.length + ")"} headerStyle={{ width: '25%' }}>
                                    <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                        <DataScroller value={items} itemTemplate={itemTemplate} rows={10} inline scrollHeight="400px" header={header} emptyMessage={emptyMessage} />
                                    </div>
                                </TabPanel>
                                <TabPanel header={"대기" + "(" + items.filter(val => val.state === 'careWait').length + ")"} headerStyle={{ width: '25%' }}>
                                    <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                        <DataScroller value={items.filter(val => val.state === 'careWait')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="400px" header={header} emptyMessage={emptyMessage} />
                                    </div>
                                </TabPanel>
                                <TabPanel header={"진료중" + "(" + items.filter(val => val.state === 'care').length + ")"} headerStyle={{ width: '25%' }}>
                                    <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                        <DataScroller value={items.filter(val => val.state === 'care')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="400px" header={header} emptyMessage={emptyMessage} />
                                    </div>
                                </TabPanel>
                                <TabPanel header={"완료" + "(" + items.filter(val => (val.state === 'complete') || (val.state === 'wait')).length + ")"} headerStyle={{ width: '25%' }}>
                                    <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                        <DataScroller value={items.filter(val => (val.state === 'complete') || (val.state === 'wait'))} itemTemplate={itemTemplate} rows={10} inline scrollHeight="400px" header={header} emptyMessage={emptyMessage} />
                                    </div>
                                </TabPanel>
                            </TabView>
                        </Card>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-4">
                        <Card style={{ height: '40%' }}>
                            <span style={{ color: '#1C91FB', fontSize: '20px', display: 'block', textAlign: 'center' }}>환자 정보</span>
                            <Divider />
                            <div className="activity-header">
                                <div className="p-grid">
                                    <div className="p-col-6">
<<<<<<< HEAD
                                        <span style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginLeft: '20px' }}>{patient.name}{patient.name && ''}{patient.gender && '/'}{patient.age}</span>
=======
                                        <span style={{ fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginLeft: '20px' }}>{patient.name}{patient.name && '('}{patient.gender}{patient.gender && '/'}{patient.age}{patient.age && '세)'}</span>
>>>>>>> 438931e3b02115dac5c580786d70fdd1d3c1006a
                                    </div>
                                    <div className="p-col-6" style={{ textAlign: 'right' }}>
                                    </div>
                                </div>
                            </div>

                            <ul className="activity-list">
                                <li>
                                    <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                        <label htmlFor="insurance">보험 여부</label>
                                        <div className="count" style={{ marginRight: '3rem' }}>{patient.insurance}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                    <label htmlFor="diagnosis">진료 구분</label>
                                        <div className="count" style={{ marginRight: '3rem' }}>{patient.diagnosis}</div>
                                    </div>
                                </li>
                            </ul>
                        </Card>
                        <Card style={{ height: '58%', marginTop: '10px' }}>
                            <span style={{ color: '#1C91FB', fontSize: '20px', display: 'block', textAlign: 'center' }}>과거 병력</span>
                            <Divider />
                            <div className="activity-header">
                                <div className="datascroller">
                                    <DataScroller value={pastDiagnosis} itemTemplate={pastDiagnosisTemplate} rows={5} inline scrollHeight="300px" emptyMessage={empty} />
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-4">
                        <Card style={{ height: '100%' }}>
                            <span style={{ color: '#1C91FB', fontSize: '20px', display: 'block', textAlign: 'center' }}>진료</span>
                            <Divider />
                            <div className="card p-fluid">
                                <div className="p-field p-grid" style={{ marginTop: '2rem' }}>
                                    <label htmlFor="name3" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0">병명</label>
                                    <div className="p-col-12 p-md-10">
                                        <InputText id="diseaseNm" value={diseaseSelectedItem.diseaseNm} onClick={confirmDiseaseItem} placeholder="질병" />
                                    </div>
                                </div>
                                <div className="p-field p-grid" style={{ marginTop: '2rem' }}>
                                    <label htmlFor="care" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0">처방</label>
                                    <div className="p-col-12 p-md-10">
                                        <Checkbox onChange={e => setCureYN(e.checked)} checked={cureYN}></Checkbox>
                                        <label style={{ marginLeft: '5px' }} htmlFor="checkOption1"> 치료</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-fluid" style={{ marginTop: '2rem' }}>
                                <label htmlFor="memo">진료 메모</label>
                                <div className="p-field" style={{ marginTop: '2%' }} style={{ marginTop: '1.5rem' }}>
                                <InputTextarea value={memo} onChange={(e) => setMemo(e.target.value)} rows={8} cols={30} autoResize />
                            </div>
                            </div>
                            <div>
                                <Button type="button" label="진료완료" onClick={saveDiagnosis} style={{ width: '100%', marginTop: '30px' }} />
                            </div>
                        </Card>
                    </div>
                </div>
                <Menu model={options} popup ref={menu} id="popup_menu" />

                <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {item && <span><b>접수를 취소하시겠습니까?</b></span>}
                    </div>
                </Dialog>

                <Dialog visible={diseaseItemDialog} style={{ width: '55%', height: '70%' }} header="질병정보" modal onHide={hideDiseaseItemDialog}>
                    <div className="card">
                        <DataTable ref={diseaseDt} value={diseaseItems} selectionMode="single" selection={diseaseSelectedItem} emptyMessage="데이터가 없습니다." onSelectionChange={(e) => setDiseaseSelectedItem(e.value)}
                            onRowDoubleClick={inputDiseaseItemDialog}
                            dataKey="diseaseNo" paginator rows={8}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                            globalFilter={globalFilter}
                            header={diseaseHeader}>

                            <Column style={{ textAlign: 'center', width: '10%', padding: '10px' }} field="diseaseCode" header="질병코드" sortable></Column>
                            <Column style={{ textAlign: 'center', width: '24%', padding: '10px' }} field="diseaseNm" header="병명" sortable></Column>
                            <Column style={{ textAlign: 'center', width: '24%', padding: '10px' }} field="diseaseEngNm" header="영문명" sortable></Column>
                            <Column style={{ textAlign: 'center', width: '24%', padding: '10px' }} field="symptom" header="증상" sortable></Column>
                        </DataTable>
                    </div>
                </Dialog>
            </div>
        </Fragment>
    );
}