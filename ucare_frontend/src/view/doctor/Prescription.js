import React, { useState, useEffect, useRef, Fragment } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { DataTable } from 'primereact/datatable';
import { classNames } from 'primereact/utils';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Menu } from 'primereact/menu';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid';

import Alert from '@material-ui/lab/Alert';
import PersonIcon from '@material-ui/icons/Person';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import { makeStyles } from '@material-ui/styles';

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
import medicineService from '../../service/medicineService';

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
})

export default function Prescription() {

    let emptyPrescriptionItem = {
        patientNo: null,
        medicineNm: '',
        dosage: null,
        dosingDay: null,
        usage: ''
    };

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

    let emptyMedicineItem = {
        medicineNo: null,
        medicineCode: '',
        medicineNm: '',
        company: '',
        mainIngredient: '',
        additive: '',
        origin: ''
    };

    const classes = useStyles();
    const [items, setItems] = useState([]);
    const [medicineItems, setMedicineItems] = useState([]);
    const [prescriptionitems, setPrescriptionItems] = useState([]);
    const [prescriptionItem, setPrescriptionItem] = useState(emptyPrescriptionItem);
    const [patientItem, setPatientItem] = useState(emptyPatientItem);
    const [diagnosisItem, setDiagnosisItem] = useState(emptyDiagnosisItem);
    const [medicineSelectedItem, setMedicineSelectedItem] = useState(emptyMedicineItem);
    const [selectedItems, setSelectedItems] = useState(null);
    const [price, setPrice] = useState('');
    const [insurancePrice, setInsurancePrice] = useState('');
    const [date, setDate] = useState(new Date());
    const [medicineItemDialog, setMedicineItemDialog] = useState(false);
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
    const [deleteItemsDialog, setDeleteItemsDialog] = useState(false);
    const [receiptCompleteDialog, setReceiptCompleteDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [itemDialog, setItemDialog] = useState(false);

    const [data, setData] = useState([]); //table data
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const [reload, setReload] = useRecoilState(reloadState);
    const [value, setValue] = useState('');

    const menu = useRef(null);
    const $websocket = useRef(null);

    const dt = useRef(null);
    const medicineDt = useRef(null);

    const retrieveMedicine = (e) => {
        medicineService.retrieveAll()
          .then( res => {
            console.log('success!!');
            setMedicineItems(res.data);
        })
          .catch(err => {
            console.log('retrieveMedicine() Error!', err);
        });
    }

    useEffect(() => {
        retrieveMedicine();
        prescriptionService.retrieveCureYN(dateFormat(date))
            .then(res => {
                console.log('success!!');

                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].cureYN === 'true') {
                        res.data[i].value = '처방대기중';
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
        prescriptionService.retrieveCureYN(dateFormat(date))
            .then(res => {
                console.log('success!!');

                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].cureYN === 'true') {
                        res.data[i].value = '처방대기중';
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

    const saveItem = () => {
        setSubmitted(true);

        if (item.diseaseNm.trim()) {
            let _items = [...items];
            let _item = { ...item };
            if (item.diseaseNo) {
                diseaseService.update(_item)
                    .then(res => {
                        const index = findIndexByNo(item.diseaseNo);

                        _items[index] = _item;
                        setItems(_items);
                        setItemDialog(false);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: '수정되었습니다.', life: 3000 });
                    })
                    .catch(err => {
                        console.log('update() Error!', err);
                    })
            }
            else {
                diseaseService.create(_item)
                    .then(res => {
                        console.log('success!!');
                        _item.diseaseNo = res.data;
                        _items.unshift(_item);
                        setItems(_items);
                        setItemDialog(false);
                        setItem(emptyItem);
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: '저장되었습니다.', life: 3000 });
                    })
                    .catch(err => {
                        console.log('create() Error!', err);
                    })
            }
        }
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
            })
            .catch(err => {
                console.log('delete() Error!', err);
            });
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
        if (data.cureYN === 'true') {
            patientService.retrieve(data.patientNo)
                .then(res => {
                    setPatientItem(res.data);
                    diagnosisService.retrieveByReceiptNo(data.receiptNo)
                        .then(res => {
                            setDiagnosisItem(res.data);
                        })
                        .catch(err => {
                            console.log('retrieveByReceiptNo() Error!', err);
                        })
                })
                .catch(err => {
                    console.log('retrieve() Error!', err);
                });
        }
        else if (data.cureYN === 'complete')
            alert("처방완료된 환자입니다.");
        else
            menu.current.toggle(e, setItem(data));
    }

    const itemTemplate = (data) => {
        return (
            <div className={styles.product_item} onClick={(e) => { menuControl(e, data) }} aria-controls="popup_menu" aria-haspopup>
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
        prescriptionService.retrieve(dateFormat(event.value))
            .then(res => {
                console.log('success!!');
                setItems(res.data);
            })
            .catch(err => {
                console.log('retrieve() Error!', err);
            });
    }

    const hideReceiptCompleteDialog = () => {
        setReceiptCompleteDialog(false);
    }

    const openNew = () => {
        document.body.style.position = "relative";
        document.body.style.overflow = "hidden";
        setPrescriptionItem(emptyPrescriptionItem);
        setSubmitted(false);
        setItemDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteItemsDialog(true);
    }

    const confirmDeleteItem = (item) => {
        setPrescriptionItem(item);
        setDeleteItemDialog(true);
    }

    const confirmMedicineItem = () => {
        setMedicineItemDialog(true);
    }

    const hideDialog = () => {
        document.body.style.position = "";
        document.body.style.overflow = "";
        setSubmitted(false);
        setItemDialog(false);
    }

    const hideDeleteItemDialog = () => {
        setDeleteItemDialog(false);
    }

    const hideMedicineItemDialog = () => {
        setMedicineItemDialog(false);
    }

    const inputMedicineItemDialog = (data) => {
        prescriptionItem.medicineNm = data.medicineNm;
        prescriptionItem.patientNo = patientItem.patientNo;
        setMedicineItemDialog(false);
    }

    const itemDialogFooter = (
        <React.Fragment>
            <Button label="취소" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="저장" icon="pi pi-check" className="p-button-text" onClick={saveItem} />
        </React.Fragment>
    );

    const deleteItemDialogFooter = (
        <React.Fragment>
            <Button label="아니오" icon="pi pi-times" className="p-button-text" onClick={hideDeleteItemDialog} />
            <Button label="예" icon="pi pi-check" className="p-button-text" onClick={deleteItem} />
        </React.Fragment>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' }} onClick={console.log()} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" style={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' }} onClick={console.log()} />
            </React.Fragment>
        );
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="입력" icon="pi pi-plus" className="p-button-success p-mr-2" style={{ backgroundColor: '#616161', borderColor: '#616161' }} onClick={openNew} />
                <Button label="삭제" icon="pi pi-trash" className="p-button-danger" style={{ backgroundColor: '#616161', borderColor: '#616161' }} onClick={console.log()} disabled={!selectedItems || !selectedItems.length} />
            </React.Fragment>
        )
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }
    const tableHeader = (
        <div className="table-header">
            <span className="p-input-icon-left">
            </span>
            <span className="p-input-icon-left" style={{ float: 'right' }}>
                <Button label="선택삭제" icon="pi pi-trash" className="p-button-danger" style={{ float: 'right', backgroundColor: '#FFFFFF', borderColor: '#FF0000', color: '#FF0000'  }} onClick={console.log()} disabled={!selectedItems || !selectedItems.length} /> 
                <Button label="입력" icon="pi pi-plus" className="p-button-success p-mr-2" style={{ float: 'right', backgroundColor: '#FFFFFF', borderColor: '#1C91FB', color: '#1C91FB' }} onClick={openNew} />
            </span>
        </div>
    );

    const medicineHeader = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
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

    const emptyMessage = () => {
        return (
            <span style={{ fontSize: '20px', display: 'block', textAlign:'center', paddingTop: '25%', paddingBottom: '25%' }}>환자 내역이 없습니다.</span>
        );
    }

    const empty = () => {
        return (
            <span style={{ fontSize: '20px', display: 'block', textAlign:'center', paddingTop: '5%', paddingBottom: '5%' }}>처방 내역이 없습니다.</span>
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
                        <TabView style={{ justifyContent: 'center' }}>
                            <TabPanel header={"전체" + "(" + items.length + ")"} headerStyle={{width:'33%'}}>
                                <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                    <DataScroller value={items} itemTemplate={itemTemplate} rows={10} inline scrollHeight="400px" header={header} emptyMessage={emptyMessage} />
                                </div>
                            </TabPanel>
                            <TabPanel header={"처방대기" + "(" + items.filter(val => val.cureYN === 'true').length + ")"} headerStyle={{width:'33%'}}>
                                <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                    <DataScroller value={items.filter(val => val.cureYN === 'true')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="400px" header={header} emptyMessage={emptyMessage} />
                                </div>
                            </TabPanel>
                            <TabPanel header={"처방완료" + "(" + items.filter(val => val.cureYN === 'complete').length + ")"} headerStyle={{width:'33%'}}>
                                <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                    <DataScroller value={items.filter(val => val.cureYN === 'complete')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="400px" header={header} emptyMessage={emptyMessage} />
                                </div>
                            </TabPanel>
                        </TabView>
                    </Card>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-6">
                    <Card style={{ height: '100%' }}>
                        <span style={{ color: '#1C91FB', fontSize: '20px', display: 'block', textAlign:'center' }}>처방</span>
                        <Divider />
                            <div>
                                {iserror &&
                                    <Alert severity="error">
                                        {errorMessages.map((msg, i) => {
                                            return <div key={i}>{msg}</div>
                                        })}
                                    </Alert>
                                }
                            </div>
                            <div className={classes.Line}>
                                <div className={classes.addon}>
                                    <PersonIcon style={{ fontSize: "25px", color: "#616161" }} />
                                </div>
                                <InputText
                                    placeholder="환자명"
                                    className={classes.textStyle}
                                    value={patientItem.name} />
                            </div>
                            <div className={classes.Line}>
                                <div className={classes.addon}>
                                    <BlurOnIcon style={{ fontSize: "25px", color: "#616161" }} />
                                </div>
                                <InputText
                                    placeholder="질병"
                                    className={classes.textStyle}
                                    value={diagnosisItem.diseaseNm} />
                            </div>
                            <div className="card">
                                <DataTable ref={dt} value={prescriptionitems} selection={selectedItems} emptyMessage={empty} onSelectionChange={(e) => setSelectedItems(e.value)}
                                    dataKey="diseaseNo" paginator rows={5}
                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                                    globalFilter={globalFilter}
                                    header={tableHeader}>

                                    <Column style={{ textAlign: 'right', width: '5%', padding: '10px' }} selectionMode="multiple"></Column>
                                    <Column style={{ textAlign: 'center', width: '15%', padding: '10px' }} field="patientNo" header="환자코드" hidden="true"></Column>
                                    <Column style={{ textAlign: 'center', width: '20%', padding: '10px' }} field="medicineNm" header="처방약"></Column>
                                    <Column style={{ textAlign: 'center', width: '15%', padding: '10px' }} field="dosage" header="투여량" sortable></Column>
                                    <Column style={{ textAlign: 'center', width: '15%', padding: '10px' }} field="dosingDay" header="투약일수" sortable></Column>
                                    <Column style={{ textAlign: 'center', width: '20%', padding: '10px' }} field="usage" header="용법"></Column>
                                    <Column style={{ textAlign: 'center', width: '10%', padding: '5px' }} body={actionBodyTemplate}></Column>
                                </DataTable>
                            </div>

                            <Dialog visible={itemDialog} style={{ width: '450px' }} header="처방등록" modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
                                <div className="p-field">
                                    <label htmlFor="patientNo">환자번호</label>
                                    <InputText id="patientNo" value={prescriptionItem.patientNo} onChange={(e) => onInputChange(e, 'patientNo')} required autoFocus className={classNames({ 'p-invalid': submitted && !prescriptionItem.patientNo })} />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="medicineNm">처방약</label>
                                    <InputText id="medicineNm" value={prescriptionItem.medicineNm} onChange={(e) => onInputChange(e, 'medicineNm')} onClick={confirmMedicineItem} className={classNames({ 'p-invalid': submitted && !prescriptionItem.medicineNm })} />
                                    {submitted && !prescriptionItem.medicineNm && <small className="p-error">처방약은 필수입력입니다.</small>}
                                </div>
                                <div className="p-field">
                                    <label htmlFor="dosage">투여량</label>
                                    <InputText id="dosage" value={prescriptionItem.dosage} onChange={(e) => onInputChange(e, 'dosage')} className={classNames({ 'p-invalid': submitted && !prescriptionItem.dosage })} />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="dosingDay">투약일수</label>
                                    <InputText id="dosingDay" value={prescriptionItem.dosingDay} onChange={(e) => onInputChange(e, 'dosingDay')} className={classNames({ 'p-invalid': submitted && !prescriptionItem.dosingDay })} />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="usage">용법</label>
                                    <InputTextarea id="usage" value={prescriptionItem.usage} onChange={(e) => onInputChange(e, 'usage')} required rows={3} cols={20} />
                                </div>
                            </Dialog>

                            <Dialog visible={medicineItemDialog} style={{ width: '600px', height: '500px' }} header="의약품정보" modal onHide={hideMedicineItemDialog}>
                                <div className="card">
                                    <DataTable ref={medicineDt} value={medicineItems} selectionMode="single" selection={medicineSelectedItem} emptyMessage="데이터가 없습니다." onSelectionChange={(e) => setMedicineSelectedItem(e.value)}
                                        onRowDoubleClick={() => inputMedicineItemDialog(medicineSelectedItem)}
                                        dataKey="medicineNo" paginator rows={5}
                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                                        globalFilter={globalFilter}
                                        header={medicineHeader}>

                                        <Column field="medicineCode" header="약품코드" sortable></Column>
                                        <Column field="medicineNm" header="약품명" sortable></Column>
                                        <Column field="company" header="제조사" ></Column>
                                        <Column field="mainIngredient" header="주성분" ></Column>
                                        <Column field="origin" header="수입/제조" sortable></Column>
                                    </DataTable>
                                </div>
                            </Dialog>

                            <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                                <div className="confirmation-content">
                                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                                    {prescriptionItem && <span><b>{prescriptionItem.medicineNm} 삭제하시겠습니까</b>?</span>}
                                </div>
                            </Dialog>
                        </Card>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}