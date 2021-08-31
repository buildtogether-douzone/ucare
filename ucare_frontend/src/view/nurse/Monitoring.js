import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { ProductService } from '../../service/ProductService';
import { Rating } from 'primereact/rating';
import { Calendar } from 'primereact/calendar';

import '../../assets/scss/DataView.scss';

export default function Monitoring() {
    const [items, setItems] = useState(null);
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const [layout, setLayout] = useState('list');
    const [date, setDate] = useState(new Date());
    
    const sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'},
    ];

    const productService = new ProductService();

    useEffect(() => {
        productService.getProducts().then(data => setItems(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

    const renderListItem = (data) => {
        return (
            <div className="p-col-7">
                <div className="product-list-item">
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">${data.price}</span>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>
                    </div>
                </div>
            </div>
        );
    }

    const itemTemplate = (item) => {
        if (!item) {
            return;
        }
        return renderListItem(item);
    }

    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange}/>
                    <Calendar dateFormat="yy/mm/dd" value={date} onChange={(e) => setDate(e.value)}></Calendar>
                </div>
            </div>
        );
    }

    const header = renderHeader();

    return (
        <div className="test">
        <div className="dataview">
            <div className="card">
                <DataView value={items} layout={layout} header={header}
                        itemTemplate={itemTemplate} paginator rows={9}
                        sortOrder={sortOrder} sortField={sortField} />
            </div>
        </div>
        </div>
    );
}