import React, { useState, useEffect, useRef } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';

import statusService from '../../service/statusService';
import timeService from '../../service/timeService';
import patientService from '../../service/patientService';
import receiptService from '../../service/receiptService';
import diagnosisService from '../../service/diagnosisService';
import diseaseService from '../../service/diseaseService';
import medicineService from '../../service/medicineService';

import '../../assets/scss/DataScroller.scss';

export default function DoctorDiagnosis() {

    let emptyItem = {
        receiptNo: null,
        name: '',
        state: '',
        diagnosisTime: '',
        value: ''
    };

    let emptyPatient = {
        patientNo: null,
        name: '',
        age: '',
        gender: '',
        insurance_yn: '',
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
    const [medicineItem, setMedicineItem] = useState([]);
    const [medicineItems, setMedicineItems] = useState([]);
    const [memo, setMemo] = useState('');
    const [cureYN, setCureYN] = useState('');

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
        .then( res => {
            console.log('success!!');
            setDiseaseItems(res.data);
        })
        .catch(err => {
            console.log('retrieveDisease() Error!', err);
        });

        medicineService.retrieveAll()
        .then( res => {
            console.log('success!!');
            setMedicineItems(res.data);
        })
        .catch(err => {
            console.log('retrieveMedicine() Error!', err);
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
        const index = findIndexByNo(data.receiptNo);
        setItem(items[index]);

        patientService.retrieve(data.patientNo)
            .then(res => {
                setPatient(res.data[0]);
                console.log(res.data);
                diagnosisService.retrieveByPatientNo(res.data[0].patientNo)
                    .then(res => {
                        for(var i = 0; i < res.data.length; i++) {
                            if(res.data[i].cureYN === 'true') 
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
                    <div className="product-name">{data.diagnosisDate}</div>
                </div>
                <div className="product-price">
                    <div className="product-name" style={{fontSize: 'x-small'}}>{data.diseaseNm}</div>
                    <div className="product-description" style={{fontSize: 'x-small'}}>{data.value}</div>
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

    const saveDiagnosis = () => {
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
        for(var i = 0; i < diseaseItem.length; i++) {
            if(i == 0) _diseaseNm = diseaseItem[i].diseaseNm;
            else _diseaseNm = _diseaseNm + ',' + diseaseItem[i].diseaseNm;
        }

        let _medicineNm = '';
        for(var i = 0; i < medicineItem.length; i++) {
            if(i == 0) _medicineNm = medicineItem[i].medicineNm;
            else _medicineNm = _medicineNm + ',' + medicineItem[i].medicineNm;
        }

        diagnosisItem.diseaseNm = _diseaseNm;
        diagnosisItem.medicineNm = _medicineNm;

        diagnosisService.create(diagnosisItem)
          .then( res => {
            console.log('success!!');
            setDiseaseItem(null);
            setMedicineItem(null);
            setCureYN('');
            setMemo('');
            setDiseaseItem([]);
            setMedicineItem([]);

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
            })
            .catch(err => {
                console.log('update() error', err);
            })
        })
          .catch(err => {
            console.log('update() Error!', err);
        });
    }

    const diseaseTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.diseaseNm}</div>
            </div>
        );
    }

    const selectedDiseaseTemplate = (option) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.diseaseNm}</div>
                </div>
            );
        }

        return "Select Disease";
    }

    const diseasePanelFooterTemplate = () => {
        const selectedItems = diseaseItem;
        const length = selectedItems ? selectedItems.length : 0;
        return (
            <div className="p-py-2 p-px-3">
                <b>{length}</b> item{length > 1 ? 's' : ''} selected.
            </div>
        );
    }

    const medicineTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.medicineNm}</div>
            </div>
        );
    }

    const selectedMedicineTemplate = (option) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.medicineNm}</div>
                </div>
            );
        }

        return "Select Medicine";
    }

    const medicinePanelFooterTemplate = () => {
        const selectedItems = medicineItem;
        const length = selectedItems ? selectedItems.length : 0;
        return (
            <div className="p-py-2 p-px-3">
                <b>{length}</b> item{length > 1 ? 's' : ''} selected.
            </div>
        );
    }

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
                <Panel header="환자정보" style={{ height: '100%', justifyContent:'center', padding: '20px' }}>
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
                                <DataScroller value={pastDiagnosis} itemTemplate={pastDiagnosisTemplate} rows={5} inline scrollHeight="300px" />
                            </div>
                    </div>
                </Panel>
                </div>
                </div>
                <div className="p-col-12 p-md-6 p-lg-4">
                <Panel header="진료" style={{ height: '100%' }} style={{ justifyContent:'center', padding: '20px' }}>
                <div className="card p-fluid">
                    <div className="p-field p-grid">
                        <label htmlFor="name3" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0">병명</label>
                        <div className="p-col-12 p-md-10">
                            <MultiSelect value={diseaseItem} options={diseaseItems} onChange={(e) => setDiseaseItem(e.value)} optionLabel="diseaseNm" placeholder="Select disease" filter className="multiselect-custom"
                    itemTemplate={diseaseTemplate} selectedItemTemplate={selectedDiseaseTemplate} panelFooterTemplate={diseasePanelFooterTemplate} />
                        </div>
                    </div>
                    <div className="p-field p-grid">
                        <label htmlFor="care" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0">처방</label>
                        <div className="p-col-12 p-md-10">
                            <Checkbox onChange={e => setCureYN(e.checked)} checked={cureYN}></Checkbox>
                            <label htmlFor="checkOption1"> 치료</label>
                        </div>
                    </div>
                    <div className="p-field p-grid">
                        <label htmlFor="name3" className="p-col-12 p-mb-2 p-md-2 p-mb-md-0">처방약</label>
                        <div className="p-col-12 p-md-10">
                            <MultiSelect value={medicineItem} options={medicineItems} onChange={(e) => setMedicineItem(e.value)} optionLabel="medicineNm" placeholder="Select medicine" filter className="multiselect-custom"
                        itemTemplate={medicineTemplate} selectedItemTemplate={selectedMedicineTemplate} panelFooterTemplate={medicinePanelFooterTemplate} />
                        </div>
                    </div>
                </div>
                    <div className="card">
                        <h5>진료메모</h5>
                        <InputTextarea value={memo} onChange={(e) => setMemo(e.target.value)} rows={5} cols={30} autoResize />
                    </div>
                    <div>
                        <Button type="button" label="진료완료" onClick={saveDiagnosis} style={{ marginTop: '20px' }} />
                    </div>
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