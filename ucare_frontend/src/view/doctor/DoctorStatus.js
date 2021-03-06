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

    let emptyReceipt = {
        receiptNo: null,
        receiptDt: '',
        bp: null,
        bs: null,
        remark: '',
        diagnosisTime: ''
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
    const [receiptItem, setReceiptItem] = useState(emptyReceipt);
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
                    label: '??????',
                    icon: 'pi pi-refresh',
                    command: () => {
                        let _items = [...items];
                        let _item = { ...item };
                        const value = 'care';

                        const index = findIndexByNo(item.receiptNo);

                        _items[index].state = 'care';
                        _items[index].value = '?????????';
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
                    label: '????????????',
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
                        res.data[i].value = '?????????';
                    } else if (res.data[i].state === 'init') {
                        res.data[i].value = '???????????????';
                    } else if (res.data[i].state === 'wait') {
                        res.data[i].value = '??????';
                    } else {
                        res.data[i].value = '??????';
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
                        res.data[i].value = '?????????';
                    } else if (res.data[i].state === 'init') {
                        res.data[i].value = '???????????????';
                    } else if (res.data[i].state === 'wait') {
                        res.data[i].value = '??????';
                    } else {
                        res.data[i].value = '??????';
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

    // yyyy-MM-dd ???????????? ??????
    const dateFormat = (date) => {
        var year = date.getFullYear();              //yyyy
        var month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month ???????????? ??????
        var day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day ???????????? ??????
        return year + '-' + month + '-' + day;
    }

    const menuControl = (e, data) => {
        const index = findIndexByNo(data.receiptNo);
        setItem(items[index]);

        patientService.retrieve(data.patientNo)
            .then(res => {
                setPatient(res.data);

                receiptService.retrieveByReceiptNo(data.receiptNo)
                .then(res => {
                    setReceiptItem(res.data);
                })
                .catch(err => {
                    console.log('retrieveAll() ??????', err);
                });

                diagnosisService.retrieveByPatientNo(res.data.patientNo)
                    .then(res => {
                        for (var i = 0; i < res.data.length; i++) {
                            if ((res.data[i].cureYN === 'true') || (res.data[i].cureYN === 'complete'))
                                res.data[i].value = '??????';
                            else
                                res.data[i].value = '??????X';
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
                    { data.value == "??????" ?
                        <div style={{ color: '#8E8E8E' }}>{data.value}</div> :
                    data.value == "?????????" ?
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

                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].state === 'care') {
                        res.data[i].value = '?????????';
                    } else if (res.data[i].state === 'init') {
                        res.data[i].value = '???????????????';
                    } else if (res.data[i].state === 'wait') {
                        res.data[i].value = '??????';
                    } else {
                        res.data[i].value = '??????';
                    }
                }
                
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
            <Button label="?????????" icon="pi pi-times" className="p-button-text" onClick={hideDeleteItemDialog} />
            <Button label="???" icon="pi pi-check" className="p-button-text" onClick={deleteItem} />
        </React.Fragment>
    );

    const saveDiagnosis = () => {
        if (item.state === 'init') {
            toast.current.show({ severity: 'error', summary: '??????', detail: '?????? ???????????? ???????????????.', life: 3000 });
            return;
        }

        if (item.value === '??????') {
            toast.current.show({ severity: 'error', summary: '??????', detail: '????????? ????????? ???????????????.', life: 3000 });
            return;
        }

        if (patient.patientNo === null) {
            toast.current.show({ severity: 'error', summary: '??????', detail: '?????? ????????? ??????????????????.', life: 3000 });
            return;
        }
        if (diseaseSelectedItem.diseaseNm === '') {
            toast.current.show({ severity: 'error', summary: '??????', detail: '????????? ??????????????????.', life: 3000 });
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
                _patientItem.diagnosis = '??????';

                patientService.updateDiagnosis(_patientItem)
                    .then(res => {
                        setPatient(_patientItem);
                    })
                    .catch(err => {
                        console.log('update() error', err);
                    })

                let _receiptItem = item;
                _receiptItem.state = 'wait';
                _receiptItem.value = "??????";

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
            <span style={{ fontSize: '20px', display: 'block', textAlign: 'center', paddingTop: '40%', paddingBottom: '40%' }}>?????? ????????? ????????????.</span>
        );
    }

    const empty = () => {
        return (
            <span style={{ fontSize: '20px', display: 'block', textAlign: 'center', paddingTop: '20%', paddingBottom: '20%' }}>?????? ????????? ????????????.</span>
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
                                <TabPanel header={"??????" + "(" + items.length + ")"} headerStyle={{ width: '25%' }}>
                                    <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                        <DataScroller value={items} itemTemplate={itemTemplate} rows={10} inline scrollHeight="400px" header={header} emptyMessage={emptyMessage} />
                                    </div>
                                </TabPanel>
                                <TabPanel header={"??????" + "(" + items.filter(val => val.state === 'init').length + ")"} headerStyle={{ width: '25%' }}>
                                    <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                        <DataScroller value={items.filter(val => val.state === 'init')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="400px" header={header} emptyMessage={emptyMessage} />
                                    </div>
                                </TabPanel>
                                <TabPanel header={"?????????" + "(" + items.filter(val => val.state === 'care').length + ")"} headerStyle={{ width: '25%' }}>
                                    <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                        <DataScroller value={items.filter(val => val.state === 'care')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="400px" header={header} emptyMessage={emptyMessage} />
                                    </div>
                                </TabPanel>
                                <TabPanel header={"??????" + "(" + items.filter(val => (val.state === 'complete') || (val.state === 'wait')).length + ")"} headerStyle={{ width: '25%' }}>
                                    <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                        <DataScroller value={items.filter(val => (val.state === 'complete') || (val.state === 'wait'))} itemTemplate={itemTemplate} rows={10} inline scrollHeight="400px" header={header} emptyMessage={emptyMessage} />
                                    </div>
                                </TabPanel>
                            </TabView>
                        </Card>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-4">
                        <Card style={{ height: '48%' }}>
                            <span style={{ color: '#1C91FB', fontSize: '20px', display: 'block', textAlign: 'center' }}>?????? ??????</span>
                            <Divider />
                            <div className="activity-header">
                                <div className="p-grid">
                                    <div className="p-col-12" style={{ display: 'center', textAlign: 'center', marginTop: '1em' }}>
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{patient.name}{patient.name && '('}{patient.gender}{patient.gender && '/'}{patient.age}{patient.age && '???)'}</span>
                                    </div>
                                </div>
                            </div>

                            <ul className="activity-list">
                                <div className="p-grid" style={{ marginTop: '1em' }}>
                                    <div className="p-col-6">
                                        <label htmlFor="insurance">?????? ??????</label>
                                        <label style={{ marginLeft: '1rem' , color: '#1C91FB' }}>{patient.insurance}</label>
                                    </div>


                                    <div className="p-col-6">
                                    <label htmlFor="diagnosis">?????? ??????</label>
                                        <label style={{ marginLeft: '1rem' , color: '#1C91FB' }}>{patient.diagnosis}</label>
                                    </div>
                                </div>
                            </ul>
                            <ul className="activity-list">
                                <div className="p-grid" style={{ marginTop: '0.5em' }}>
                                    <div className="p-col-6">
                                        <label htmlFor="bp">??????</label>
                                        <label style={{ marginLeft: '3.5rem' , color: '#1C91FB' }}>{receiptItem.bp}</label>
                                    </div>


                                    <div className="p-col-6">
                                    <label htmlFor="bs">??????</label>
                                        <label style={{ marginLeft: '3.5rem' , color: '#1C91FB' }}>{receiptItem.bs}</label>
                                    </div>
                                </div>
                            </ul>
                            <ul className="activity-list">
                                <div className="p-grid" style={{ marginTop: '0.5em', marginBottom: '3rem' }}>
                                    <div className="p-col-12">
                                        <label htmlFor="remark">?????? ??????</label>
                                        <label style={{ marginLeft: '1rem' , color: '#1C91FB' }}>{receiptItem.remark}</label>
                                    </div>
                                </div>
                            </ul>
                        </Card>
                        <Card style={{ height: '50.5%', marginTop: '10px' }}>
                            <span style={{ color: '#1C91FB', fontSize: '20px', display: 'block', textAlign: 'center' }}>?????? ??????</span>
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
                            <span style={{ color: '#1C91FB', fontSize: '20px', display: 'block', textAlign: 'center' }}>??????</span>
                            <Divider />
                            <div className="card p-fluid">
                                <div className="p-field p-grid" style={{ marginTop: '2rem' }}>
                                    <label htmlFor="name3" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0">??????</label>
                                    <div className="p-col-12 p-md-10">
                                        <InputText id="diseaseNm" value={diseaseSelectedItem.diseaseNm} onClick={confirmDiseaseItem} placeholder="??????" />
                                    </div>
                                </div>
                                <div className="p-field p-grid" style={{ marginTop: '2rem' }}>
                                    <label htmlFor="care" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0">??????</label>
                                    <div className="p-col-12 p-md-10">
                                        <Checkbox onChange={e => setCureYN(e.checked)} checked={cureYN}></Checkbox>
                                        <label style={{ marginLeft: '5px' }} htmlFor="checkOption1"> ??????</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-fluid" style={{ marginTop: '2rem' }}>
                                <label htmlFor="memo">?????? ??????</label>
                                <div className="p-field" style={{ marginTop: '2%' }} style={{ marginTop: '1.5rem' }}>
                                <InputTextarea value={memo} onChange={(e) => setMemo(e.target.value)} rows={8} cols={30} autoResize />
                            </div>
                            </div>
                            <div>
                                <Button type="button" label="????????????" onClick={saveDiagnosis} style={{ width: '100%', marginTop: '30px' }} />
                            </div>
                        </Card>
                    </div>
                </div>
                <Menu model={options} popup ref={menu} id="popup_menu" />

                <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {item && <span><b>????????? ?????????????????????????</b></span>}
                    </div>
                </Dialog>

                <Dialog visible={diseaseItemDialog} style={{ width: '55%', height: '70%' }} header="????????????" modal onHide={hideDiseaseItemDialog}>
                    <div className="card">
                        <DataTable ref={diseaseDt} value={diseaseItems} selectionMode="single" selection={diseaseSelectedItem} emptyMessage="???????????? ????????????." onSelectionChange={(e) => setDiseaseSelectedItem(e.value)}
                            onRowDoubleClick={inputDiseaseItemDialog}
                            dataKey="diseaseNo" paginator rows={8}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                            globalFilter={globalFilter}
                            header={diseaseHeader}>

                            <Column style={{ textAlign: 'center', width: '10%', padding: '10px' }} field="diseaseCode" header="????????????" sortable></Column>
                            <Column style={{ textAlign: 'center', width: '24%', padding: '10px' }} field="diseaseNm" header="??????" sortable></Column>
                            <Column style={{ textAlign: 'center', width: '24%', padding: '10px' }} field="diseaseEngNm" header="?????????" sortable></Column>
                            <Column style={{ textAlign: 'center', width: '24%', padding: '10px' }} field="symptom" header="??????" sortable></Column>
                        </DataTable>
                    </div>
                </Dialog>
            </div>
        </Fragment>
    );
}