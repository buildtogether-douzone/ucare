import React, { useState, useEffect, useRef } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { Menu } from 'primereact/menu';

import statusService from '../../service/statusService';
import timeService from '../../service/timeService';

import '../../assets/scss/DataScroller.scss';

export default function Status() {

    let emptyItem = {
        receiptNo: null,
        name: '',
        state: '',
        diagnosisTime: ''
    };

    const [items, setItems] = useState([]);
    const [item, setItem] = useState(emptyItem);
    const [date, setDate] = useState(new Date());

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
                        })
                        .catch(err => {
                            console.log('delete() Error!', err);
                        });
                    }
                }
            ]
        }
    ];

    const selectOptions = [
        {label: '진료중', value: 'care'},
        {label: '진료대기중', value: 'careWait'},
        {label: '수납대기중', value: 'wait'},
        {label: '완료', value: 'finish'}
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

    // yyyy-MM-dd 포맷으로 반환
    const dateFormat = (date) => {
        var year = date.getFullYear();              //yyyy
        var month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        var day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        return  year + '-' + month + '-' + day;
    }

    const itemTemplate = (data) => {
        return (
            <div className="product-item" onClick={(e) => menu.current.toggle(e, setItem(data))} aria-controls="popup_menu" aria-haspopup>
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
                <div className="p-col-6">
                        <div className="datascroller" style={{ justifyContent:'center', padding: '50px' }}>
                                <DataScroller value={items} itemTemplate={itemTemplate} rows={10} inline scrollHeight="500px" header={header} />
                        </div>
                </div>
                <Divider layout="vertical">
                </Divider>
                <div className="p-col-5" style={{ display: 'flex', justifyContent:'center', alignItems: 'center', padding: '10px' }}>
                        <Button label="Sign Up" icon="pi pi-user-plus" className="p-button-success"></Button>
                </div>
            </div>
            <Menu model={options} popup ref={menu} id="popup_menu" />
        </div>
    );
}