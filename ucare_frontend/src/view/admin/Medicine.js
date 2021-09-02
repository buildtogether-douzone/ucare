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
import '../../assets/scss/DataTable.scss';
import medicineService from '../../service/medicineService';

export default function Medicine() {

    let emptyItem = {
        medicineNo: null,
        medicineNm: '',
        symptom: '',
        generic: '',
        price: 0,
        maker: ''
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

    const retrieveMedicine = (e) => {
        medicineService.retrieveAll()
          .then( res => {
            console.log('success!!');
            setItems(res.data);
        })
          .catch(err => {
            console.log('retrieveMedicine() Error!', err);
        });
    }

    useEffect(() => {
        retrieveMedicine();
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString("ko-KR", { style: 'currency', currency: 'KRW'}); 
    }

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

        if (item.medicineNm.trim()) {
            let _items = [...items];
            let _item = {...item};
            if (item.medicineNo) {
                medicineService.update(_item)
                .then(res => {
                    const index = findIndexByNo(item.medicineNo);

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
                medicineService.create(_item)
                .then(res => {
                    console.log('success!!');
                    _item.medicineNo = res.data;
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
        medicineService.delete(item.medicineNo)
        .then(res => {
            let _items = items.filter(val => val.medicineNo !== item.medicineNo);
            setItems(_items);
            setDeleteItemDialog(false);
            setItem(emptyItem);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Item Deleted', life: 3000 });
        })
        .catch(err => {
            console.log('delete() Error!', err);
        })
    }

    const findIndexByNo = (medicineNo) => {
        let index = -1;
        for (let i = 0; i < items.length; i++) {
            if (items[i].medicineNo === medicineNo) {
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
                    medicineService.excelCreate(item)
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
            medicineService.delete(item.medicineNo)
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
                <FileUpload chooseOptions={{ label: 'Excel', icon: 'pi pi-file-excel', className: 'p-button-success' }} mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="p-mr-2" onUpload={importExcel} />
                <Button label="Excel Export" icon="pi pi-upload" className="p-button-help" onClick={exportExcel} />
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
                    dataKey="medicineNo" paginator rows={7}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="medicineNm" header="약품명" sortable></Column>
                    <Column field="symptom" header="임상증상" sortable></Column>
                    <Column field="generic" header="Generic" sortable></Column>
                    <Column field="price" header="가격" body={priceBodyTemplate} sortable></Column>
                    <Column field="maker" header="제조사" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={itemDialog} style={{ width: '450px' }} header="약품 등록" modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="medicineNm">약품명</label>
                    <InputText id="medicineNm" value={item.medicineNm} onChange={(e) => onInputChange(e, 'medicineNm')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.medicineNm })} />
                    {submitted && !item.medicineNm && <small className="p-error">Name is required.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="symptom">임상증상</label>
                    <InputTextarea id="symptom" value={item.symptom} onChange={(e) => onInputChange(e, 'symptom')} required rows={3} cols={20} />
                </div>
                <div className="p-field">
                    <label htmlFor="generic">Generic</label>
                    <InputText id="generic" value={item.generic} onChange={(e) => onInputChange(e, 'generic')} className={classNames({ 'p-invalid': submitted && !item.generic })} />
                    {submitted && !item.generic && <small className="p-error">Name is required.</small>}
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
                    {item && <span>Are you sure you want to delete <b>{item.medicineNm}</b>?</span>}
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