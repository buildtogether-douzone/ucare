import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import '../assets/scss/DataTableDemo.scss';
import data from './products.json';
import SiteLayout from '../layout/SiteLayout';

export default function DataTableCrudDemo() {

    let emptyItem = {
        no: null,
        name: '',
        symptom: '',
        generic: '',
        price: 0,
        maker: ''
    };

    const [items, setItems] = useState(null);
    const [itemDialog, setItemDialog] = useState(false);
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
    const [deleteItemsDialog, setDeleteItemsDialog] = useState(false);
    const [item, setItem] = useState(emptyItem);
    const [selectedItems, setSelectedItems] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    // const productService = new ProductService();

    useEffect(() => {
        // productService.getProducts().then(data => setProducts(data));
        setItems(data.data);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formatCurrency = (value) => {
        return value.toLocaleString("ko-KR", { style: 'currency', currency: 'KRW'}); 
    }

    const openNew = () => {
        setItem(emptyItem);
        setSubmitted(false);
        setItemDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setItemDialog(false);
    }

    const hideDeleteItemDialog = () => {
        setDeleteItemDialog(false);
    }

    const hideDeleteItemsDialog = () => {
        setDeleteItemsDialog(false);
    }

    const saveItem = () => {
        setSubmitted(true);

        if (item.name.trim()) {
            let _items = [...items];
            let _item = {...item};
            if (item.no) {
                const index = findIndexByNo(item.no);

                _items[index] = _item;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item Updated', life: 3000 });
            }
            else {
                _items.no = createId();
                _items.image = 'item-placeholder.svg';
                _items.push(_items);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item Created', life: 3000 });
            }

            setItems(_items);
            setItemDialog(false);
            setItem(emptyItem);
        }
    }

    const editItem = (item) => {
        setItem({...item});
        setItemDialog(true);
    }

    const confirmDeleteItem = (item) => {
        setItem(item);
        setDeleteItemDialog(true);
    }

    const deleteItem = () => {
        let _items = items.filter(val => val.id !== item.id);
        setItem(_items);
        setDeleteItemDialog(false);
        setItem(emptyItem);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item Deleted', life: 3000 });
    }

    const findIndexByNo = (no) => {
        let index = -1;
        for (let i = 0; i < items.length; i++) {
            if (items[i].no === no) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const importExcel = (e) => {
        const file = e.files[0];

        import('xlsx').then(xlsx => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const wb = xlsx.read(e.target.result, { type: 'array' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = xlsx.utils.sheet_to_json(ws, { header: 1 });

                // Prepare DataTable
                const cols = data[0];
                data.shift();

                let _importedCols = cols.map(col => ({ field: col, header: toCapitalize(col) }));
                let _importedData = data.map(d => {
                    return cols.reduce((obj, c, i) => {
                        obj[c] = d[i];
                        return obj;
                    }, {});
                });

                setImportedCols(_importedCols);
                setImportedData(_importedData);
            };

            reader.readAsArrayBuffer(file);
        });
    }

    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(items);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'items');
        });
    }

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }

    const confirmDeleteSelected = () => {
        setDeleteItemsDialog(true);
    }

    const deleteSelectedItems = () => {
        let _items = items.filter(val => !selectedItems.includes(val));
        setItems(_items);
        setDeleteItemsDialog(false);
        selectedItems(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Items Deleted', life: 3000 });
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _item = {...item};
        _item[`${name}`] = val;

        setItem(_item);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _item = {...item};
        _item[`${name}`] = val;

        setItem(_item);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="입력" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="삭제" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedItems || !selectedItems.length} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" label="Import" chooseLabel="엑셀 Import" className="p-mr-2 p-d-inline-block" onUpload={importExcel} />
                <Button label="엑셀 Export" icon="pi pi-upload" className="p-button-help" onClick={exportExcel} />
            </React.Fragment>
        )
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editItem(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteItem(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Items</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
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
    const deleteItemsDialogFooter = (
        <React.Fragment>
            <Button label="아니오" icon="pi pi-times" className="p-button-text" onClick={hideDeleteItemsDialog} />
            <Button label="예" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedItems} />
        </React.Fragment>
    );

    return (
        <SiteLayout>
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={items} selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value)}
                    dataKey="no" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="name" header="약품명" sortable></Column>
                    <Column field="symptom" header="임상증상" sortable></Column>
                    <Column field="generic" header="Generic" sortable></Column>
                    <Column field="price" header="가격" body={priceBodyTemplate} sortable></Column>
                    <Column field="maker" header="제조사" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={itemDialog} style={{ width: '450px' }} header="약품 등록" modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="name">약품명</label>
                    <InputText id="name" value={item.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.name })} />
                    {submitted && !item.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="symptom">임상증상</label>
                    <InputTextarea id="symptom" value={item.description} onChange={(e) => onInputChange(e, 'symptom')} required rows={3} cols={20} />
                </div>

                <div className="p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="price">가격</label>
                        <InputNumber id="price" value={item.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="KRW" locale="ko-KR" />
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="maker">제조사</label>
                        <InputText id="maker" value={item.maker} onChange={(e) => onInputChange(e, 'maker')} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {item && <span>Are you sure you want to delete <b>{item.name}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteItemsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemsDialogFooter} onHide={hideDeleteItemsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {item && <span>Are you sure you want to delete the selected items?</span>}
                </div>
            </Dialog>
        </div>
        </SiteLayout>
    );
}