import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import medicineService from '../../service/medicineService';

import '../../assets/scss/DataTable.scss';

export default function Medicine() {

    let emptyItem = {
        medicineNo: null,
        medicineCode: '',
        medicineNm: '',
        company: '',
        mainIngredient: '',
        additive: '',
        origin: ''
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
                    toast.current.show({ severity: 'success', summary: '알림', detail: '수정 완료!', life: 3000 });
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
                    toast.current.show({ severity: 'success', summary: '알림', detail: '등록 완료!', life: 3000 });
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
            setDeleteItemDialog(false);
            toast.current.show({ severity: 'success', summary: '알림', detail: '삭제 완료!', life: 3000 });
            retrieveMedicine();
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
                            toast.current.show({ severity: 'success', summary: '알림', detail: '등록 완료!', life: 3000 });
                            retrieveMedicine();
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
                    setDeleteItemsDialog(false);
                    toast.current.show({ severity: 'success', summary: '알림', detail: '삭제 완료!', life: 3000 });
                    retrieveMedicine();
                }
            })
            .catch(err => {
                success = false;
                setDeleteItemsDialog(false);
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

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button style={{color: '#1C91FB'}} icon="pi pi-pencil" className="p-button-rounded p-button-warning p-button-text" onClick={() => editItem(rowData)} />
                <Button style={{color: '#1C91FB'}} icon="pi pi-trash" className="p-button-rounded p-button-warning p-button-text" onClick={() => confirmDeleteItem(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText className="p-mr-2" type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
                <Button label="입력" icon="pi pi-plus" className="p-button-success p-mr-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#1C91FB', color: '#1C91FB' }} onClick={openNew} />
                <Button label="선택삭제" icon="pi pi-trash" className="p-button-danger" style={{ backgroundColor: '#FFFFFF', borderColor: '#FF0000', color: '#FF0000' }} onClick={confirmDeleteSelected} disabled={!selectedItems || !selectedItems.length} />
            </span>
            <span className="p-input-icon-left"  style={{ float: 'right' }}>
                <Button style={{ float: 'right', backgroundColor: '#FFFFFF', borderColor: '#82AF72', color: '#82AF72' }} label="Excel Export" icon="pi pi-upload" onClick={exportExcel} />
                <FileUpload style={{ float: 'right' }} chooseOptions={{ label: 'Excel', icon: 'pi pi-file-excel', className: 'p-button-success' }} mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" className="p-mr-2" onUpload={importExcel} />
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

    const emptyMessage = () => {
        return (
            <span style={{ fontSize: '20px', display: 'block', textAlign:'center', paddingTop: '30%', paddingBottom: '30%' }}>약품 정보가 없습니다.</span>
        );
    }

    return (
        <div className="datatable-crud">
            <Toast ref={toast} position="top-center"/>

            <div className="card">
                <DataTable ref={dt} value={items} selection={selectedItems} emptyMessage={emptyMessage} onSelectionChange={(e) => setSelectedItems(e.value)}
                    dataKey="medicineNo" paginator rows={6}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column style={{ textAlign: 'right', width: '4%', padding: '10px' }} selectionMode="multiple"></Column>
                    <Column style={{ textAlign: 'center', width: '8%', padding: '10px' }} field="medicineCode" header="약품코드" sortable></Column>
                    <Column style={{ textAlign: 'center', width: '21%', padding: '10px' }} field="medicineNm" header="약품명" sortable></Column>
                    <Column style={{ textAlign: 'center', width: '14%', padding: '10px' }} field="company" header="제조사" sortable></Column>
                    <Column style={{ textAlign: 'center', width: '14%', padding: '10px' }} field="mainIngredient" header="주성분" sortable></Column>
                    <Column style={{ textAlign: 'center', width: '21%', padding: '10px' }} field="additive" header="첨가제" sortable></Column>
                    <Column style={{ textAlign: 'center', width: '10%', padding: '10px' }} field="origin" header="수입/제조" sortable></Column>
                    <Column style={{ textAlign: 'left', width: '8%', padding: '5px' }} body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={itemDialog} style={{ width: '450px' }} header="약품 등록" modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="medicineCode">약품코드</label>
                    <InputText id="medicineCode" value={item.medicineCode} onChange={(e) => onInputChange(e, 'medicineCode')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.medicineCode })} />
                    {submitted && !item.medicineCode && <small className="p-error">약품코드는 필수입력입니다.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="medicineNm">약품명</label>
                    <InputText id="medicineNm" value={item.medicineNm} onChange={(e) => onInputChange(e, 'medicineNm')} className={classNames({ 'p-invalid': submitted && !item.medicineNm })} />
                    {submitted && !item.medicineNm && <small className="p-error">약품명은 필수입력입니다.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="company">제조사</label>
                    <InputText id="company" value={item.company} onChange={(e) => onInputChange(e, 'company')} className={classNames({ 'p-invalid': submitted && !item.company })} />
                </div>
                <div className="p-field">
                    <label htmlFor="mainIngredient">주성분</label>
                    <InputText id="mainIngredient" value={item.mainIngredient} onChange={(e) => onInputChange(e, 'mainIngredient')} className={classNames({ 'p-invalid': submitted && !item.mainIngredient })} />
                </div>
                <div className="p-field">
                    <label htmlFor="additive">첨가제</label>
                    <InputText id="additive" value={item.additive} onChange={(e) => onInputChange(e, 'additive')} className={classNames({ 'p-invalid': submitted && !item.additive })} />
                </div>
                <div className="p-field">
                    <label htmlFor="origin">수입/제조</label>
                    <InputText id="origin" value={item.origin} onChange={(e) => onInputChange(e, 'origin')} className={classNames({ 'p-invalid': submitted && !item.origin })} />
                </div>
            </Dialog>

            <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {item && <span><b>{item.medicineNm}</b>을 삭제하시겠습니까?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteItemsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemsDialogFooter} onHide={hideDeleteItemsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {item && <span>선택 항목을 삭제하시겠습니까?</span>}
                </div>
            </Dialog>
        </div>
    );
}