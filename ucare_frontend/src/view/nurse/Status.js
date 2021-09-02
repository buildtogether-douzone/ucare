import React, { useState, useEffect } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';

import statusService from '../../service/statusService';
import { ProductService } from '../../service/ProductService';

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
    const [sortKey, setSortKey] = useState('careWait');
    const [sortOrder, setSortOrder] = useState(null);
    const [date, setDate] = useState(new Date());

    const selectOptions = [
        {label: '진료중', value: 'care'},
        {label: '진료대기중', value: 'careWait'},
        {label: '수납대기중', value: 'wait'},
        {label: '완료', value: 'finish'}
    ];

    const productService = new ProductService();

    useEffect(() => {
        statusService.retrieve(dateFormat(date))
          .then( res => {
            console.log('success!!');
            setItems(res.data);
        })
          .catch(err => {
            console.log('retrieve() Error!', err);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            <div className="product-item">
                <div className="product-detail">
                    <div className="product-name">{data.name}</div>
                    <div className="product-description">{data.diagnosisTime}</div>
                </div>
                <div className="product-price">
                    <Dropdown options={selectOptions} value={data.state} optionLabel="label" onChange={(e) => onSelectChange(e, data)} />
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
        <div className="datascroller">
            <div className="card">
                <DataScroller value={items} itemTemplate={itemTemplate} rows={10} inline scrollHeight="500px" header={header} />
            </div>
        </div>
    );
}