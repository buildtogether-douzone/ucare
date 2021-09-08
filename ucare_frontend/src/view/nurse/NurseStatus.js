import React, { useState, useEffect, useRef } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel';

import statusService from '../../service/statusService';
import timeService from '../../service/timeService';
import hospitalService from '../../service/hospitalService';

import '../../assets/scss/DataScroller.scss';
import { __esModule } from 'react-full-page/lib/components/FullPage';

export default function Status() {

    let emptyItem = {
        receiptNo: null,
        name: '',
        state: '',
        diagnosisTime: ''
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

    let resultPrice = null;

    const [items, setItems] = useState([]);
    const [item, setItem] = useState(emptyItem);
    const [hospitalItem, setHospitalItem] = useState(emptyHospitalItem);
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
        hospitalService.fetchHospitalInfo()
         .then( res => {
            setHospitalItem(res.data);
        })
          .catch(err => {
            console.log('retrieve() Error!', err);
        });
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

    const calculatePrice = () => {
        let basicPrice = hospitalItem.basicPrice;

        //if()
    }

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

    const menuToggle = (e, data) => {
        if(data.state === 'wait' || data.state === 'care')
            setItem(data)
        else
            menu.current.toggle(e, setItem(data));
    }

    const itemTemplate = (data) => {
        return (
            <div className="product-item" onClick={(e) => menuToggle(e, data)} aria-controls="popup_menu" aria-haspopup>
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

    console.log(item);

    return (
        <div className="card">
            <div className="p-grid">
                <div className="p-col-6">
                        <div className="datascroller" style={{ justifyContent:'center', padding: '50px' }}>
                                <DataScroller value={items} itemTemplate={itemTemplate} rows={10} inline scrollHeight="500px" header={header} />
                        </div>
                </div>
                <Divider layout="vertical" />
                <div className="p-col-5">
                <Panel header="수납" style={{ height: '100%', justifyContent:'center', padding: '20px' }}>
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
                    { (item.state === 'wait') &&
                    <ul className="activity-list">
                        <li>
                            <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                <h3 className="activity p-m-0">기본진료비</h3>
                                <div className="count">{ hospitalItem.basicPrice }원</div>
                            </div>
                        </li>
                        <li>
                            <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                <h3 className="activity p-m-0">치료</h3>
                                <div className="count">10000원</div>
                            </div>
                        </li>
                        <li>
                            <div className="p-d-flex p-jc-between p-ai-center p-mb-3">
                                <h3 className="activity p-m-0">보험</h3>
                                <div className="count">10000원</div>
                            </div>
                        </li>
                        <div>
                            <Button type="button" label="수납완료" className="p-button-rounded" style={{ width: '100%', marginTop: '20px' }} />
                        </div>
                    </ul>
                    }
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