import React, { useState, useEffect } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';

import statusService from '../../service/statusService';
import timeService from '../../service/timeService';
import { ProductService } from '../../service/ProductService';

import '../../assets/scss/DataScroller.scss';

export default function Status() {
    const [items, setItems] = useState([]);
    const [sortKey, setSortKey] = useState('careWait');
    const [sortOrder, setSortOrder] = useState(null);
    const [date, setDate] = useState(new Date());

    const sortOptions = [
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
            timeService.update(dateFormat(date));
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
                    <div className="product-description">{data.description}</div>
                </div>
                <div className="product-price">
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" />
                </div>
            </div>
        );
    }

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    }

    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div style={{textAlign: 'left'}}>
                    <Calendar dateFormat="yy/mm/dd" value={date} onChange={(e) => setDate(e.value)}></Calendar>
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