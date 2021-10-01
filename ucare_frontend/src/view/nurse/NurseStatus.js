import React, { useState, useEffect, useRef, Fragment } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel';
import { TabView, TabPanel } from 'primereact/tabview';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { useRecoilState } from 'recoil';
import { reloadState } from '../../recoil/atom/nurseAtom';
import SockJsClient from 'react-stomp';

import statusService from '../../service/statusService';
import timeService from '../../service/timeService';
import hospitalService from '../../service/hospitalService';
import patientService from '../../service/patientService';
import diagnosisService from '../../service/diagnosisService';
import receiptService from '../../service/receiptService';

import styles from '../../assets/scss/DataScroller.scss';

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
    }

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
    const [activeIndex, setActiveIndex] = useState(1);

    const [reload, setReload] = useRecoilState(reloadState);
    const [value, setValue] = useState('');

    const menu = useRef(null);
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
                                $websocket.current.sendMessage('/Doctor');
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
                        res.data[i].value = '진료중';
                    } else if (res.data[i].state === 'careWait') {
                        res.data[i].value = '진료대기중';
                    } else if (res.data[i].state === 'wait') {
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
                        res.data[i].value = '진료중';
                    } else if (res.data[i].state === 'careWait') {
                        res.data[i].value = '진료대기중';
                    } else if (res.data[i].state === 'wait') {
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
    }, [reload, value]);

    const calculatePrice = (data) => {
        let resultPrice = hospitalItem.basicPrice;

        diagnosisService.retrieveByReceiptNo(data.receiptNo)
            .then(res => {
                console.log('success!!');
                setDiagnosisItem(res.data);

                if (res.data.cureYN === 'true')
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
        _item.value = '완료';

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

    // yyyy-MM-dd 포맷으로 반환
    const dateFormat = (date) => {
        var year = date.getFullYear();              //yyyy
        var month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        var day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        return year + '-' + month + '-' + day;
    }

    const menuToggle = (e, data) => {
        if (data.state === 'wait' || data.state === 'care') {
            calculatePrice(data);
        }
        else if (data.state === 'complete')
            alert("수납완료된 건입니다.");
        else
            menu.current.toggle(e, setItem(data));
    }

    const itemTemplate = (data) => {
        return (
            <div className={styles.product_item} onContextMenu={(e) => { e.preventDefault(); menuToggle(e, data);}} aria-controls="popup_menu" aria-haspopup>
                <div className={styles.product_detail}>
                    <div className={styles.product_name}>{data.name}</div>
                    <div className={styles.product_description}>{data.diagnosisTime}</div>
                </div>
                <div className={styles.product_price}>
                    <div className={styles.product_name}>{data.value}</div>
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
            <Button label="아니오" icon="pi pi-times" className="p-button-text" onClick={hideReceiptCompleteDialog} />
            <Button label="예" icon="pi pi-check" className="p-button-text" onClick={deleteItem} />
        </React.Fragment>
    );

    const hideReceiptCompleteDialog = () => {
        setReceiptCompleteDialog(false);
    }

    const receiptCompleteDialogFooter = (
        <React.Fragment>
            <Button label="아니오" icon="pi pi-times" className="p-button-text" onClick={hideReceiptCompleteDialog} />
            <Button label="예" icon="pi pi-check" className="p-button-text" onClick={receiptComplete} />
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

    const header = renderHeader();

    return (
        <Fragment>
            <SockJsClient
                url="http://localhost:8080/ucare_backend/start"
                topics={['/topics/nurse']}
                onMessage={msg => { setValue(msg) }}
                ref={$websocket} />
            <div className="card" style={{ margin: '20px' }}>
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 p-lg-6">
                    <TabView>
                        <TabPanel header={"전체" + "(" + items.length + ")"}>
                            <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                <DataScroller value={items} itemTemplate={itemTemplate} rows={10} inline scrollHeight="500px" header={header} />
                            </div>
                        </TabPanel>
                        <TabPanel header={"대기" + "(" + items.filter(val => val.state === 'careWait').length + ")"}>
                            <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                <DataScroller value={items.filter(val => val.state === 'careWait')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="500px" header={header} />
                            </div>
                        </TabPanel>
                        <TabPanel header={"진료중" + "(" + items.filter(val => val.state === 'care').length + ")"}>
                            <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                <DataScroller value={items.filter(val => val.state === 'care')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="500px" header={header} />
                            </div>
                        </TabPanel>
                        <TabPanel header={"수납대기" + "(" + items.filter(val => val.state === 'wait').length + ")"}>
                            <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                <DataScroller value={items.filter(val => val.state === 'wait')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="500px" header={header} />
                            </div>
                        </TabPanel>
                        <TabPanel header={"완료" + "(" + items.filter(val => val.state === 'complete').length + ")"}>
                            <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                <DataScroller value={items.filter(val => val.state === 'complete')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="500px" header={header} />
                            </div>
                        </TabPanel>
                    </TabView>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-6">
                    <Card>
                        <span style={{ color: '#1C91FB', fontSize: '20px', display: 'block', textAlign:'center' }}>수납</span>
                        <Divider />
                        {(item.state !== 'wait') &&
                            <div className="activity-header">
                                <div className="p-grid">
                                    <div className="p-col-12" style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>
                                        <span>
                                            {(item.state === 'careWait' || item.state === 'care' || item.state === '') && <span>진료가 완료된 후 수납계산이 가능합니다.</span>}
                                        </span>
                                    </div>
                                    <div className="p-col-6" style={{ textAlign: 'right' }}>
                                    </div>
                                </div>
                            </div>
}
                            {(item.state === 'wait') &&
                                <ul className="activity-list">
                                        <div className="p-d-flex p-jc-between p-ai-center p-mb-3" style={{border: "1px solid #dee2e6" , paddingLeft:"42%", backgroundColor: "#F8F9FA"}} >
                                            <h1>{patientItem.name}님</h1>
                                        </div>
                                    {(patientItem.age < 7 || patientItem.age >= 65) &&
                                    <li>
                                        <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                            <h3 className="activity p-m-0">기본진료비</h3>
                                            <div className="count">5000원</div>
                                        </div>
                                    </li>
                                    }
                                    {(patientItem.age >= 7 && patientItem.age < 65) &&
                                    <li>
                                        <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                            <h3 className="activity p-m-0">기본진료비</h3>
                                            <div className="count">{hospitalItem.basicPrice}원</div>
                                        </div>
                                    </li>
                                    }
                                    {(diagnosisItem.cureYN === "true") &&
                                        <li>
                                            <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                                <h3 className="activity p-m-0">치료</h3>
                                                <div className="count">10000원</div>
                                            </div>
                                        </li>
                                    }
                                    {(patientItem.insurance === "Y") &&
                                        <li>
                                            <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                                <h3 className="activity p-m-0">보험</h3>
                                                <div className="count">-{insurancePrice}원</div>
                                            </div>
                                        </li>
                                    }
                                    {(item.diagnosisTime >= '09:00:00' && item.diagnosisTime < '12:00:00') &&
                                    <li>
                                        <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                            <h3 className="activity p-m-0">할인</h3>
                                            <div className="count">{calPrice}원</div>
                                        </div>
                                    </li>
                                    }
                                    {(item.diagnosisTime > '18:00:00' && item.diagnosisTime < '24:00:00') &&
                                    <li>
                                        <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                            <h3 className="activity p-m-0">할증</h3>
                                            <div className="count">{calPrice}원</div>
                                        </div>
                                    </li>
                                    }
                                    <Divider />
                                    {(price !== '') &&
                                        <li>
                                            <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                                <h3 className="activity p-m-0">총</h3>
                                                <div className="count">{price}원</div>
                                            </div>
                                        </li>
                                    }
                                    <div>
                                        <Button type="button" label="수납완료" onClick={confirmReceiptComplete} className="p-button-rounded" style={{ width: '100%', marginTop: '20px' }} />
                                    </div>
                                </ul>
                            }
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

                <Dialog visible={receiptCompleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={receiptCompleteDialogFooter} onHide={hideReceiptCompleteDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {item && <span><b>수납을 완료하시겠습니까?</b></span>}
                    </div>
                </Dialog>
            </div>
        </Fragment>
    );
}