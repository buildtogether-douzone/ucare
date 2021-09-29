import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import diseaseService from '../../service/diseaseService';

import '../../assets/scss/DataTable.scss';

export default function Disease() {

    let emptyItem = {
        diseaseNo: null,
        diseaseCode: '',
        diseaseNm: '',
        diseaseEngNm: '',
        symptom: ''
    };

    const [items, setItems] = useState(null);
    const [itemDialog, setItemDialog] = useState(false);
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
    const [deleteItemsDialog, setDeleteItemsDialog] = useState(false);
    const [importedData, setImportedData] = useState([]);
    const [item, setItem] = useState(emptyItem);
    const [selectedItems, setSelectedItems] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const retrieveDisease = (e) => {
        diseaseService.retrieveAll()
          .then( res => {
            console.log('success!!');
            setItems(res.data);
        })
          .catch(err => {
            console.log('retrieveDisease() Error!', err);
        });
    }

    useEffect(() => {
        retrieveDisease();
    }, []);

    const openNew = () => {
        document.body.style.position = "relative";
        document.body.style.overflow = "hidden";
        setItem(emptyItem);
        setSubmitted(false);
        setItemDialog(true);
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

    const hideDeleteItemsDialog = () => {
        setDeleteItemsDialog(false);
    }

    const saveItem = () => {
        setSubmitted(true);

        if (item.diseaseNm.trim()) {
            let _items = [...items];
            let _item = {...item};
            if (item.diseaseNo) {
                diseaseService.update(_item)
                .then(res => {
                    const index = findIndexByNo(item.diseaseNo);

                    _items[index] = _item;
                    setItems(_items);
                    setItemDialog(false);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item Updated', life: 3000 });
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
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item Created', life: 3000 });
                })
                .catch(err => {
                    console.log('create() Error!', err);
                })
            }
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
        diseaseService.delete(item.diseaseNo)
        .then(res => {
            let _items = items.filter(val => val.diseaseNo !== item.diseaseNo);
            setItems(_items);
            setDeleteItemDialog(false);
            setItem(emptyItem);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item Deleted', life: 3000 });
        })
        .catch(err => {
            console.log('delete() Error!', err);
        })
    }

    const findIndexByNo = (diseaseNo) => {
        let index = -1;
        for (let i = 0; i < items.length; i++) {
            if (items[i].diseaseNo === diseaseNo) {
                index = i;
                break;
            }
        }

        return index;
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

                let _importedData = data.map(d => {
                    return cols.reduce((obj, c, i) => {
                        obj[c] = d[i];
                        return obj;
                    }, {});
                });

                setImportedData(_importedData);
                let success;
                _importedData.map((item, index) => (
                    diseaseService.excelCreate(item)
                    .then(res => {
                        success = true;
                        if((_importedData.length === (index+1)) && success === true) {
                            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Items Created', life: 3000 });
                        }
                    })
                    .catch(err => {
                        success = false;
                        console.log('excelCreate() Error!', err);
                    })
                ))
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
        let success;
        selectedItems.map((item, index) => (
            diseaseService.delete(item.diseaseNo)
            .then(res => {
                success = true;
                if((selectedItems.length === (index+1)) && success === true) {
                    let _items = items.filter(val => !selectedItems.includes(val));
                    setItems(_items);
                    setDeleteItemsDialog(false);
                    setSelectedItems(null);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Items Deleted', life: 3000 });
                }
            })
            .catch(err => {
                success = false;
                console.log('selectedDelete() Error!', err);
            })
        ))
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _item = {...item};
        _item[`${name}`] = val;

        setItem(_item);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="입력" icon="pi pi-plus" className="p-button-success p-mr-2" style={{ backgroundColor: '#616161', borderColor: '#616161' }} onClick={openNew} />
                <Button label="삭제" icon="pi pi-trash" className="p-button-danger" style={{ backgroundColor: '#616161', borderColor: '#616161' }} onClick={confirmDeleteSelected} disabled={!selectedItems || !selectedItems.length} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload chooseOptions={{ label: 'Excel', icon: 'pi pi-file-excel', className: 'p-button-success' }} mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="p-mr-2" onUpload={importExcel} />
                <Button label="Excel Export" icon="pi pi-upload" onClick={exportExcel} />
            </React.Fragment>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' }} onClick={() => editItem(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" style={{ backgroundColor: '#FFFFFF', borderColor: '#FFFFFF' }} onClick={() => confirmDeleteItem(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
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
        <div className="datatable-crud">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={items} selection={selectedItems} emptyMessage="No data" onSelectionChange={(e) => setSelectedItems(e.value)}
                    dataKey="diseaseNo" paginator rows={5}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="diseaseCode" header="질병코드" sortable></Column>
                    <Column field="diseaseNm" header="병명" sortable></Column>
                    <Column field="diseaseEngNm" header="영문명" sortable></Column>
                    <Column field="symptom" header="증상" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={itemDialog} style={{ width: '450px' }} header="질병 등록" modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="diseaseCode">질병코드</label>
                    <InputText id="diseaseCode" value={item.diseaseCode} onChange={(e) => onInputChange(e, 'diseaseCode')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.diseaseCode })} />
                    {submitted && !item.diseaseCode && <small className="p-error">질병코드는 필수입력입니다.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="diseaseNm">병명</label>
                    <InputText id="diseaseNm" value={item.diseaseNm} onChange={(e) => onInputChange(e, 'diseaseNm')} className={classNames({ 'p-invalid': submitted && !item.diseaseNm })} />
                    {submitted && !item.diseaseNm && <small className="p-error">병명은 필수입력입니다.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="diseaseEngNm">영문명</label>
                    <InputText id="diseaseEngNm" value={item.diseaseEngNm} onChange={(e) => onInputChange(e, 'diseaseEngNm')} className={classNames({ 'p-invalid': submitted && !item.diseaseEngNm })} />
                </div>
                <div className="p-field">
                    <label htmlFor="symptom">증상</label>
                    <InputTextarea id="symptom" value={item.symptom} onChange={(e) => onInputChange(e, 'symptom')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {item && <span>Are you sure you want to delete <b>{item.diseaseNm}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteItemsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemsDialogFooter} onHide={hideDeleteItemsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {item && <span>Are you sure you want to delete the selected items?</span>}
                </div>
            </Dialog>
        </div>
    );
}