import React, { useState, useEffect, useRef, Fragment } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { InputText } from "primereact/inputtext";
import { makeStyles } from '@material-ui/styles';
import PersonIcon from '@material-ui/icons/Person';
import BlurOnIcon from '@material-ui/icons/BlurOn';

import { useReactToPrint } from 'react-to-print';
import { useRecoilState } from 'recoil';
import { reloadState } from '../../recoil/atom/nurseAtom';
import SockJsClient from 'react-stomp';

import statusService from '../../service/statusService';
import timeService from '../../service/timeService';
import hospitalService from '../../service/hospitalService';
import patientService from '../../service/patientService';
import diagnosisService from '../../service/diagnosisService';
import receiptService from '../../service/receiptService';
import prescriptionService from '../../service/prescriptionService';

import styles from '../../assets/scss/DataScroller.scss';

const useStyles = makeStyles({
    textStyle: {
        height: '50px',
        width: '800px',
        marginBottom: '20px'
    },
    addon: {
        backgroundColor: "#DFDFDF",
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        textAlign: 'center',
        paddingTop: '12px',
        width: '5%',
        marginBottom: '20px'
    },
    image: {
        display: 'block',
        top: 80,
        right: 80,
        float: 'left',
        marginBottom: '40px',
        marginRight: '80px'
    },
    profile: {
        display: 'block',
        width: '200px',
        height: '230px',
        border: '1px solid #AAAAAA',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%, 100%',
        backgroundPosition: 'center',
        overflow: 'hidden',
    },
    textfiled: {
        width: '100%'
    },
    Line: {
        display: 'flex',
        flexDirection: 'row'
    }
});

export default function NurseStatus() {

    let emptyItem = {
        receiptNo: null,
        patientNo: null,
        name: '',
        state: '',
        diagnosisTime: '',
        value: ''
    };

    let emptyHospitalItem = {
        hospitalNo: null,
        address: '',
        basicPrice: null,
        email: '',
        faxNo: '',
        headName: '',
        hospitalName: '',
        image: '',
        siteAddress: '',
        telNo: ''
    }

    let emptyPatientItem = {
        patientNo: null,
        name: '',
        address: '',
        insurance: '',
        ssn: '',
        telNo: '',
        age: null,
        ageGender: '',
        detailAddress: '',
        diagnosis: '',
        email: '',
        gender: '',
        height: null,
        remark: ''
    };

    let emptyDiagnosisItem = {
        diagnosisNo: null,
        patientNo: null,
        receiptNo: null,
        userNo: null,
        diagnosisDate: '',
        diagnosisMemo: '',
        cureYN: '',
        diseaseNm: '',
        medicineNm: ''
    };

    const classes = useStyles();
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(emptyItem);
    const [hospitalItem, setHospitalItem] = useState(emptyHospitalItem);
    const [patientItem, setPatientItem] = useState(emptyPatientItem);
    const [diagnosisItem, setDiagnosisItem] = useState(emptyDiagnosisItem);
    const [price, setPrice] = useState('');
    const [insurancePrice, setInsurancePrice] = useState('');
    const [calPrice, setCalPrice] = useState(0);
    const [date, setDate] = useState(new Date());
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
    const [receiptCompleteDialog, setReceiptCompleteDialog] = useState(false);
    const [prescriptionItems, setPrescriptionItems] = useState([]);

    const [reload, setReload] = useRecoilState(reloadState);
    const [value, setValue] = useState('');

    const componentRef = useRef();
    const menu = useRef(null);
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
                                $websocket.current.sendMessage('/Doctor');
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
        hospitalService.fetchHospitalInfo()
            .then(res => {
                setHospitalItem(res.data);
            })
            .catch(err => {
                console.log('retrieve() Error!', err);
            });
        statusService.retrieve(dateFormat(date))
            .then(res => {
                console.log('success!!');

                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].state === 'care') {
                        res.data[i].value = '?????????';
                    } else if (res.data[i].state === 'init') {
                        res.data[i].value = '???????????????';
                    } else if (res.data[i].state === 'wait') {
                        res.data[i].value = '???????????????';
                    } else {
                        res.data[i].value = '??????';
                    }
                }
                setItems(res.data);
            })
            .catch(err => {
                console.log('retrieve() Error!', err);
            });
    }, []);

    useEffect(() => {
        hospitalService.fetchHospitalInfo()
            .then(res => {
                setHospitalItem(res.data);
            })
            .catch(err => {
                console.log('retrieve() Error!', err);
            });
        statusService.retrieve(dateFormat(date))
            .then(res => {
                console.log('success!!');

                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].state === 'care') {
                        res.data[i].value = '?????????';
                    } else if (res.data[i].state === 'init') {
                        res.data[i].value = '???????????????';
                    } else if (res.data[i].state === 'wait') {
                        res.data[i].value = '???????????????';
                    } else {
                        res.data[i].value = '??????';
                    }
                }
                setItems(res.data);
            })
            .catch(err => {
                console.log('retrieve() Error!', err);
            });
    }, [reload, value]);

    const calculatePrice = (data) => {
        let resultPrice = hospitalItem.basicPrice;

        diagnosisService.retrieveByReceiptNo(data.receiptNo)
            .then(res => {
                console.log('success!!');
                setDiagnosisItem(res.data);

                prescriptionService.retrieveByDiagnosisNo(res.data.diagnosisNo)
                    .then(res => {
                        console.log('success!!');
                        setPrescriptionItems(res.data);
                    })
                    .catch(err => {
                        console.log('retrieveByDiagnosisNo() Error!', err);
                    })

                if (res.data.cureYN === 'true' || res.data.cureYN === 'complete' )
                    resultPrice += 10000;

                patientService.retrieve(data.patientNo)
                    .then(res => {
                        console.log('success!!');
                        setPatientItem(res.data);

                        if (res.data.age < 7 || res.data.age >= 65)
                            resultPrice -= 2000;

                        if (data.diagnosisTime >= '09:00:00' && data.diagnosisTime < '12:00:00') {
                            setCalPrice(-resultPrice * 0.1);
                            resultPrice *= 0.9;
                        }

                        if (data.diagnosisTime > '18:00:00' && data.diagnosisTime < '24:00:00') {
                            setCalPrice(resultPrice * 0.1);
                            resultPrice *= 1.1;
                        }

                        if (res.data.insurance === "Y") {
                            setInsurancePrice(resultPrice * 0.25);
                            resultPrice *= 0.75;
                        }

                        setItem(data);
                        setPrice(resultPrice);
                    })
                    .catch(err => {
                        console.log('retrieve() Error!', err);
                    });
            })
            .catch(err => {
                console.log('retrieve() Error!', err);
            });
    }

    const receiptComplete = () => {
        let _items = [...items];
        let _item = { ...item };

        const index = findIndexByNo(item.receiptNo);

        _item = _items[index];

        _item.state = 'complete';
        _item.value = '??????';

        _items[index] = _item;

        receiptService.updateState(_item)
            .then(res => {
                console.log('success!!');
                setItems(_items);
                setItem(emptyItem);
                hideReceiptCompleteDialog();
            })
            .catch(err => {
                console.log('update() Error!', err);
            });
    }

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
                $websocket.current.sendMessage('/Reservation');
                $websocket.current.sendMessage('/Doctor');
            })
            .catch(err => {
                console.log('delete() Error!', err);
            });
    }

    const confirmDeleteItem = (item) => {
        setItem(item);
        setDeleteItemDialog(true);
    }

    const confirmReceiptComplete = () => {
        setReceiptCompleteDialog(true);
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

    const menuToggle = (e, data) => {
        if (data.state === 'wait' || data.state === 'care' || data.state === 'complete')
            return;
        else
            menu.current.toggle(e, setItem(data));
    }

    const clickEvent = (e, data) => {
        if (data.state === 'wait' || data.state === 'complete')
            calculatePrice(data);
        else
            return;
    }

    const itemTemplate = (data) => {
        return (
            <div className={styles.product_item} onClick={(e) => clickEvent(e, data)} onContextMenu={(e) => { e.preventDefault(); menuToggle(e, data); }} aria-controls="popup_menu" aria-haspopup>
                <div className={styles.product_detail}>
                    <div className={styles.product_name}>{data.name}</div>
                    <div className={styles.product_description}>{data.diagnosisTime}</div>
                </div>
                <div className={styles.product_price}>
                    { data.value == "??????" ?
                        <div style={{ color: '#8E8E8E' }}>{data.value}</div> :
                    data.value == "?????????" ?
                        <div style={{ color: '#FFA040' }}>{data.value}</div> :
                    data.value == "???????????????" ?
                        <div style={{ color: '#1C91FB' }}>{data.value}</div> :
                        <div style={{ color: '#FF0000' }}>{data.value}</div>
                    }
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
        statusService.retrieve(dateFormat(event.value))
            .then(res => {
                console.log('success!!');

                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].state === 'care') {
                        res.data[i].value = '?????????';
                    } else if (res.data[i].state === 'init') {
                        res.data[i].value = '???????????????';
                    } else if (res.data[i].state === 'wait') {
                        res.data[i].value = '???????????????';
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

    const deleteItemDialogFooter = (
        <React.Fragment>
            <Button label="?????????" icon="pi pi-times" className="p-button-text" onClick={hideReceiptCompleteDialog} />
            <Button label="???" icon="pi pi-check" className="p-button-text" onClick={deleteItem} />
        </React.Fragment>
    );

    const hideReceiptCompleteDialog = () => {
        setReceiptCompleteDialog(false);
    }

    const receiptCompleteDialogFooter = (
        <React.Fragment>
            <Button label="?????????" icon="pi pi-times" className="p-button-text" onClick={hideReceiptCompleteDialog} />
            <Button label="???" icon="pi pi-check" className="p-button-text" onClick={receiptComplete} />
        </React.Fragment>
    );

    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div style={{ textAlign: 'left' }}>
                    <Calendar dateFormat="yy/mm/dd" value={date} onChange={(e) => onDateChange(e)}></Calendar>
                </div>
            </div>
        );
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    const emptyMessage = () => {
        return (
            <span style={{ fontSize: '20px', display: 'block', textAlign: 'center', paddingTop: '20%', paddingBottom: '20%' }}>?????? ????????? ????????????.</span>
        );
    }

    const header = renderHeader();

    return (
        <Fragment>
            <SockJsClient
                url="http://localhost:8080/ucare_backend/start"
                topics={['/topics/nurse']}
                onMessage={msg => { setValue(msg) }}
                ref={$websocket} />
            <div className="card" style={{ margin: '20px', height: '85%' }}>
                <div className="p-grid" style={{ height: '100%' }}>
                    <div className="p-col-12 p-md-6 p-lg-6">
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
                                <TabPanel header={"????????????" + "(" + items.filter(val => val.state === 'wait').length + ")"} headerStyle={{ width: '25%' }}>
                                    <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                        <DataScroller value={items.filter(val => val.state === 'wait')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="400px" header={header} emptyMessage={emptyMessage} />
                                    </div>
                                </TabPanel>
                                <TabPanel header={"??????" + "(" + items.filter(val => val.state === 'complete').length + ")"} headerStyle={{ width: '25%' }}>
                                    <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                        <DataScroller value={items.filter(val => val.state === 'complete')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="400px" header={header} emptyMessage={emptyMessage} />
                                    </div>
                                </TabPanel>
                            </TabView>
                        </Card>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-6">
                        <Card style={{ height: '100%' }}>
                            <span style={{ color: '#1C91FB', fontSize: '20px', display: 'block', textAlign: 'center' }}>??????</span>
                            <Divider />
                            {((item.state !== 'wait') && (item.state !== 'complete')) &&
                                <div className="activity-header">
                                    <div className="p-grid">
                                        <div className="p-col-12" style={{ fontSize: '20px', textAlign: 'center', paddingTop: '30%', paddingBottom: '30%' }}>
                                            <span>
                                                {(item.state === 'init' || item.state === 'care' || item.state === '') && <span>????????? ????????? ??? ??????????????? ???????????????.</span>}
                                            </span>
                                        </div>
                                        <div className="p-col-6" style={{ textAlign: 'right' }}>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div style={{ display: 'block', textAlign: 'center' }}>
                                {((item.state === 'wait') || (item.state === 'complete')) &&
                                    <ul className="activity-list" style={{ padding: 0 }}>
                                        <div className="p-d-flex p-jc-between p-ai-center p-mb-3" style={{ padding: 0, border: "1px solid #dee2e6", backgroundColor: "#F8F9FA", justifyContent: 'center' }} >
                                            <h1>{patientItem.name}???</h1>
                                        </div>
                                        <div style={{ padding: '30px' }}>
                                            {(patientItem.age < 7 || patientItem.age >= 65) &&
                                                <li style={{ listStyle: 'none' }}>
                                                    <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                                        <h3 className="activity p-m-0">???????????????</h3>
                                                        <div className="count" style={{ fontSize: '20px' }}>5000???</div>
                                                    </div>
                                                </li>
                                            }
                                            {(patientItem.age >= 7 && patientItem.age < 65) &&
                                                <li style={{ listStyle: 'none' }}>
                                                    <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                                        <h3 className="activity p-m-0">???????????????</h3>
                                                        <div className="count" style={{ fontSize: '20px' }}>{hospitalItem.basicPrice}???</div>
                                                    </div>
                                                </li>
                                            }
                                            {(diagnosisItem.cureYN === "true" || diagnosisItem.cureYN === "complete") &&
                                                <li style={{ listStyle: 'none' }}>
                                                    <div className="p-d-flex p-jc-between p-ai-center p-mb-3" style={{ marginTop: '3rem' }}>
                                                        <h3 className="activity p-m-0">??????</h3>
                                                        <div className="count" style={{ fontSize: '20px' }}>10000???</div>
                                                    </div>
                                                </li>
                                            }
                                            {(patientItem.insurance === "Y") &&
                                                <li style={{ listStyle: 'none' }}>
                                                    <div className="p-d-flex p-jc-between p-ai-center p-mb-3" style={{ marginTop: '3rem' }}>
                                                        <h3 className="activity p-m-0">??????</h3>
                                                        <div className="count" style={{ fontSize: '20px' }}>-{insurancePrice}???</div>
                                                    </div>
                                                </li>
                                            }
                                            {(item.diagnosisTime >= '09:00:00' && item.diagnosisTime < '12:00:00') &&
                                                <li style={{ listStyle: 'none' }}>
                                                    <div className="p-d-flex p-jc-between p-ai-center p-mb-3" style={{ marginTop: '3rem' }}>
                                                        <h3 className="activity p-m-0">??????</h3>
                                                        <div className="count" style={{ fontSize: '20px' }}>{calPrice}???</div>
                                                    </div>
                                                </li>
                                            }
                                            {(item.diagnosisTime > '18:00:00' && item.diagnosisTime < '24:00:00') &&
                                                <li style={{ listStyle: 'none' }}>
                                                    <div className="p-d-flex p-jc-between p-ai-center p-mb-3" style={{ marginTop: '3rem' }}>
                                                        <h3 className="activity p-m-0">??????</h3>
                                                        <div className="count" style={{ fontSize: '20px' }}>{calPrice}???</div>
                                                    </div>
                                                </li>
                                            }
                                            <Divider style={{ marginTop: '3rem' }} />
                                            {(price !== '') &&
                                                <li style={{ listStyle: 'none' }}>
                                                    <div className="p-d-flex p-jc-between p-ai-center p-mb-3" style={{ marginTop: '2rem' }}>
                                                        <h3 className="activity p-m-0">???</h3>
                                                        <div className="count" style={{ fontSize: '20px' }}>{price}???</div>
                                                    </div>
                                                </li>
                                            }
                                            {(item.state !== 'complete') &&
                                                <div>
                                                    <Button type="button" label="????????????" onClick={confirmReceiptComplete} className="p-button" style={{ width: '100%', marginTop: '30px' }} />
                                                </div>
                                            }
                                            {(item.state === 'complete' && diagnosisItem.cureYN === 'complete' && prescriptionItems.length !== 0) &&
                                                <div>
                                                    <Button type="button" label="????????? ??????" onClick={handlePrint} className="p-button" style={{ width: '100%', marginTop: '30px' }} />
                                                </div>
                                            }
                                        </div>
                                    </ul>
                                }
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

                <Dialog visible={receiptCompleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={receiptCompleteDialogFooter} onHide={hideReceiptCompleteDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {item && <span><b>????????? ?????????????????????????</b></span>}
                    </div>
                </Dialog>
                <div style={{ display: 'none' }}>
                    <div id="printPdf" ref={componentRef}>
                        <Card style={{ height: '100%' }}>
                            <span style={{ fontSize: '20px', display: 'block', textAlign: 'center' }}>??? ??? ???</span>
                            <Divider />
                            <div className={classes.Line}>
                                <div className={classes.addon}>
                                    <PersonIcon style={{ fontSize: "25px", color: "#616161" }} />
                                </div>
                                <InputText
                                    placeholder="?????????"
                                    className={classes.textStyle}
                                    value={patientItem.name} />
                            </div>
                            <div className={classes.Line}>
                                <div className={classes.addon}>
                                    <BlurOnIcon style={{ fontSize: "25px", color: "#616161" }} />
                                </div>
                                <InputText
                                    placeholder="??????"
                                    className={classes.textStyle}
                                    value={diagnosisItem.diseaseNm} />
                            </div>
                            <div className="card">
                                <DataTable value={prescriptionItems}
                                    dataKey="diseaseNo" paginator rows={10}
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items">

                                    <Column style={{ textAlign: 'center', width: '20%', padding: '10px' }} field="medicineNm" header="?????????"></Column>
                                    <Column style={{ textAlign: 'center', width: '15%', padding: '10px' }} field="dosage" header="?????????" ></Column>
                                    <Column style={{ textAlign: 'center', width: '15%', padding: '10px' }} field="dosingDay" header="????????????" ></Column>
                                    <Column style={{ textAlign: 'center', width: '20%', padding: '10px' }} field="usage" header="??????"></Column>
                                </DataTable>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}