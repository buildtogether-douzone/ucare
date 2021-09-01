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
import { Editor } from 'primereact/editor';
import boardService from '../../service/boardService';
import '../../assets/scss/BoardTable.scss';

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

    const saveItem = () => {
        setSubmitted(true);

        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(data)], {type: "application/json"}));
        formData.append('file', file);

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

    const readItem = (item) => {
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

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _item = {...item};
        _item[`${name}`] = val;

        setItem(_item);
    }

    const onInputTextChange = (e, name) => {
        const val = e.htmlValue || 0;
        let _item = {...item};
        _item[`${name}`] = val;

        setItem(_item);
    }


    const handleFileOnChange = (e, name) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        let _item = {...item};
        _item[`${name}`] = file;
        reader.onloadend = () => {
        setItem(_item);
        }
      }
      
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="글쓰기" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
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
            <Button label="등록" icon="pi pi-check" className="p-button-text" onClick={saveItem} />
        </React.Fragment>
    );
    const deleteItemDialogFooter = (
        <React.Fragment>
            <Button label="아니오" icon="pi pi-times" className="p-button-text" onClick={hideDeleteItemDialog} />
            <Button label="예" icon="pi pi-check" className="p-button-text" onClick={deleteItem} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={items} selection={selectedItems} emptyMessage="No data" onRowClick={(e) => {readItem(e.data)}} onSelectionChange={(e) => setSelectedItems(e.value)}
                    dataKey="boardNo" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column style={{textAlign: 'center'}} field="boardNo" header="No"></Column>
                    <Column style={{textAlign: 'center'}} field="title" header="제목"></Column>
                    <Column style={{textAlign: 'center'}} field="userId" header="작성자"></Column>
                    <Column style={{textAlign: 'center'}} field="boardDt" header="작성일"></Column>
                    <Column style={{textAlign: 'center'}} field="hit" header="조회"></Column>
                    <Column style={{textAlign: 'center'}} body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog maximized visible={itemDialog} style={{ width: '450px' }} header="공지 사항" modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="title">제목</label>
                    <InputText id="title" value={item.title} onChange={(e) => onInputChange(e, 'title')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.title })} />
                    {submitted && !item.title && <small className="p-error">Name is required.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="contents">내용</label>
                    <Editor style={{ height: '320px' }} value={item.contents} onTextChange={(e) => onInputTextChange(e, 'contents')} />
                </div>
                <div className="p-field">
                    <label htmlFor="image">파일 첨부</label>
                    <input id={"file-input"} type="file" name="imageFile" onChange={(e) => handleFileOnChange(e, 'image')}/>
                </div>
            </Dialog>


            <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {item && <span><b>{item.title}</b>을 삭제하시겠습니까?</span>}
                </div>
            </Dialog>

        </div>
    );
}