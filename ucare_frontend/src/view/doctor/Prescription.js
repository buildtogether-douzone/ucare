import React, { useState, useEffect, useRef, Fragment } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { Menu } from 'primereact/menu';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from "primereact/inputtext";

import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid';

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
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

import styles from '../../assets/scss/DataScroller.scss';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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
    Line:{
        display:'flex',
        flexDirection:'row'
    }
})

export default function Prescription() {

    let emptyItem = {
        receiptNo: null,
        patientNo: null,
        name: '',
        state: '',
        diagnosisTime: '',
        value: ''
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
    }

    const classes = useStyles();
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(emptyItem);
    const [patientItem, setPatientItem] = useState(emptyPatientItem);
    const [diagnosisItem, setDiagnosisItem] = useState(emptyDiagnosisItem);
    const [price, setPrice] = useState('');
    const [insurancePrice, setInsurancePrice] = useState('');
    const [date, setDate] = useState(new Date());
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
    const [receiptCompleteDialog, setReceiptCompleteDialog] = useState(false);

    var columns = [
        { title: "PatientNo", field: "patientNo", hidden: true },
        { title: "No.", field: "rowNo", editable: 'never' },
        { title: "처방약", field: "medicineNm", lookup: { 약품1: '약품1', 약품2: '약품2', 약품3: '약품3' } },
        { title: "투여량", field: "dosage", type: 'numeric' },
        { title: "투약일수", field: "dosingDay", type: 'numeric' },
        { title: "용법", field: "usage", type: 'numeric' }
    ]

    const [data, setData] = useState([]); //table data
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const [reload, setReload] = useRecoilState(reloadState);
    const [value, setValue] = useState('');

    const menu = useRef(null);
    const $websocket = useRef(null);

    const dt = useRef(null);

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

    const handleRowAdd = (newData, oldData, resolve) => {
        //validation
        let errorList = []
        // if(newData.role === ""){
        //   errorList.push("Please enter role")
        // }
        // if(newData.status === ""){
        //   errorList.push("Please enter status")
        // }

        if (errorList.length < 1) {
            prescriptionService.create(newData)
                .then(res => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    resolve()
                    setIserror(false)
                    setErrorMessages([])
                })
                .catch(error => {
                    setErrorMessages(["Update failed! Server error"])
                    setIserror(true)
                    resolve()

                })
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }

    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = []
        // if(newData.role === ""){
        //   errorList.push("Please enter role")
        // }
        // if(newData.status === ""){
        //   errorList.push("Please enter status")
        // }

        if (errorList.length < 1) {
            prescriptionService.update(newData)
                .then(res => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    resolve()
                    setIserror(false)
                    setErrorMessages([])
                })
                .catch(error => {
                    setErrorMessages(["Update failed! Server error"])
                    setIserror(true)
                    resolve()

                })
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
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
        console.log(data);
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

            <div className="card">
                <div className="p-grid">
                    <div className="p-col-12 p-md-6 p-lg-6">
                        <TabView style={{ justifyContent: 'center', padding: '20px' }}>
                            <TabPanel header={"전체" + "(" + items.length + ")"}>
                                <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                    <DataScroller value={items} itemTemplate={itemTemplate} rows={10} inline scrollHeight="500px" header={header} />
                                </div>
                            </TabPanel>
                            <TabPanel header={"처방대기" + "(" + items.filter(val => val.cureYN === 'true').length + ")"}>
                                <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                    <DataScroller value={items.filter(val => val.cureYN === 'true')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="500px" header={header} />
                                </div>
                            </TabPanel>
                            <TabPanel header={"처방완료" + "(" + items.filter(val => val.cureYN === 'complete').length + ")"}>
                                <div className={styles.datascroller} style={{ justifyContent: 'center' }}>
                                    <DataScroller value={items.filter(val => val.cureYN === 'complete')} itemTemplate={itemTemplate} rows={10} inline scrollHeight="500px" header={header} />
                                </div>
                            </TabPanel>
                        </TabView>
                    </div>
                    <div className="p-col-12 p-md-6 p-lg-6" style={{ padding: '2%' }}>
                        <Grid item xs={11}>
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
                                    value={patientItem.name}/>
                            </div>
                            <div className={classes.Line}>
                                <div className={classes.addon}>
                                    <BlurOnIcon style={{ fontSize: "25px", color: "#616161" }} />
                                </div>
                                <InputText
                                    placeholder="질병"
                                    className={classes.textStyle}
                                    value={diagnosisItem.diseaseNm}/>
                            </div>
                            <MaterialTable
                                title="처방"
                                columns={columns}
                                data={data}
                                icons={tableIcons}
                                editable={{
                                    onRowAdd: (newData) =>
                                        new Promise((resolve) => {
                                            handleRowAdd(newData, resolve)
                                        }),
                                    onRowUpdate: (newData, oldData) =>
                                        new Promise((resolve) => {
                                            handleRowUpdate(newData, oldData, resolve);

                                        })
                                }}
                            />
                        </Grid>
                    </div>
                </div>
                <Menu model={options} popup ref={menu} id="popup_menu" />
            </div>
        </Fragment>
    );
}