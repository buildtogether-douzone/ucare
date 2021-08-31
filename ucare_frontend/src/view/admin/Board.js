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
import boardService from '../../service/boardService';

export default function Board() {

    let emptyItem = {
        boardNo: null,
        title: '',
        contents: '',
        hit: '',
        image: '',
        boardDt: '',
        boardTime: '',
        userId: '',
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

    const retrieveAll = (e) => {
        boardService.retrieveAll()
          .then( res => {
            console.log(res.data);
            console.log('success!!');
            setItems(res.data);
        })
          .catch(err => {
            console.log('retrieveAll() Error!', err);
        });
    }

    useEffect(() => {
        retrieveAll();
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

        if (item.title.trim()) {
            let _items = [...items];
            let _item = {...item};
            if (item.boardNo) {
                boardService.update(_item)
                .then(res => {
                    const index = findIndexByNo(item.boardNo);
                    _items[index] = _item;
                    setItemDialog(false);
                    window.location.reload();
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: '수정 완료!', life: 3000 });
                })
                .catch(err => {
                    console.log('update() Error!', err);
                })
            }    
            else {
                _item.userNo = sessionStorage.getItem('user_no');
                boardService.create(_item)
                .then(res => {
                    console.log('success!!');
                    setItemDialog(false);
                    window.location.reload();
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: '등록 완료!', life: 3000 });
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
        boardService.delete(item.boardNo)
        .then(res => {
            setDeleteItemDialog(false);
            window.location.reload();
            toast.current.show({ severity: 'success', summary: 'Successful', detail: '삭제 완료!', life: 3000 });
        })
        .catch(err => {
            console.log('delete() Error!', err);
        })
    }

    const findIndexByNo = (boardNo) => {
        let index = -1;
        for (let i = 0; i < items.length; i++) {
            if (items[i].boardNo === boardNo) {
                index = i;
                break;
            }
        }

        return index;
    }


    const confirmDeleteSelected = () => {
        setDeleteItemsDialog(true);
    }

    const deleteSelectedItems = () => {
        let success;
        selectedItems.map((item, index) => (
            boardService.delete(item.boardNo)
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
                <Button label="글쓰기" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="삭제" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedItems || !selectedItems.length} />
            </React.Fragment>
        )
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
                <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={items} selection={selectedItems} emptyMessage="No data" onSelectionChange={(e) => setSelectedItems(e.value)}
                    dataKey="boardNo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column field="boardNo" header="No"></Column>
                    <Column field="title" header="제목"></Column>
                    <Column field="userId" header="작성자"></Column>
                    <Column field="boardDt" header="작성일"></Column>
                    <Column field="hit" header="조회"></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={itemDialog} style={{ width: '450px' }} header="공지 사항" modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="title">제목</label>
                    <InputText id="title" value={item.title} onChange={(e) => onInputChange(e, 'title')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.title })} />
                    {submitted && !item.title && <small className="p-error">Name is required.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="contents">내용</label>
                    <InputTextarea id="contents" value={item.contents} onChange={(e) => onInputChange(e, 'contents')} required rows={6} cols={20} />
                </div>
                <div className="p-field">
                    <label htmlFor="image">파일 첨부</label>
                    <InputText id="image" value={item.image} onChange={(e) => onInputChange(e, 'image')} className={classNames({ 'p-invalid': submitted && item.image })} />
                </div>
            </Dialog>

            <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {item && <span><b>{item.title}</b>을 삭제하시겠습니까?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteItemsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemsDialogFooter} onHide={hideDeleteItemsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {item && <span>선택한 항목들을 삭제하시겠습니까?</span>}
                </div>
            </Dialog>
        </div>
    );
}