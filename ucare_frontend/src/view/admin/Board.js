import React, { useState, useEffect, useRef } from 'react';
import update from 'react-addons-update';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import boardService from '../../service/boardService';
import styles from  '../../assets/scss/BoardTable.scss';

const Board = React.forwardRef((props, ref) => {

    let emptyItem = {
        boardNo: null,
        title: '',
        contents: '',
        hit: '',
        boardDt: '',
        boardTime: '',
        userId: '',
        url:''
    };

    const [items, setItems] = useState(null);
    const [itemDialog, setItemDialog] = useState(false);
    const [viewDialog, setViewDialog] = useState(false);
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);
    const [item, setItem] = useState(emptyItem);
    const [selectedItems, setSelectedItems] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [URL, setURL] = useState(null);
    const [URLName, setURLName] = useState(null);
    const [reload, setReload] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    const retrieveAll = (e) => {
        boardService.retrieveAll()
            .then(res => {
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

    useEffect(() => {
        retrieveAll();
    }, [reload])


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

    const saveItem = () => {
        setSubmitted(true);

        if (item.title.trim()) {
            let _items = [...items];
            let _item = { ...item };
            _item.userNo = sessionStorage.getItem('user_no');

            const formData = new FormData();
            formData.append('data', new Blob([JSON.stringify(_item)], {type: "application/json"}));
            formData.append('URL', URL);


            if (item.boardNo) {
                boardService.update(formData)
                    .then(res => {
                        const index = findIndexByNo(item.boardNo);
                        _items[index] = _item;
                        setItemDialog(false);
                        toast.current.show({ severity: 'success', summary: '??????', detail: '?????? ?????????????????????.', life: 3000 });
                        setReload(!reload);
                    })
                    .catch(err => {
                        console.log('update() Error!', err);
                    })
            }
            else {
                boardService.create(formData)
                    .then(res => {
                        console.log('success!!');
                        setItemDialog(false);
                        toast.current.show({ severity: 'success', summary: '??????', detail: '?????? ?????????????????????.', life: 3000 });
                        setReload(!reload);
                    })
                    .catch(err => {
                        console.log('create() Error!', err);
                    })
            }
        }
    }

    const editItem = (item) => {
        setItem({ ...item });
        setItemDialog(true);
    }

    const confirmDeleteItem = (item) => {
        setItem(item);
        setDeleteItemDialog(true);
    }

    const deleteItem = () => {
        boardService.delete(item)
            .then(res => {
                setDeleteItemDialog(false);
                setReload(!reload);
                toast.current.show({ severity: 'success', summary: '??????', detail: '?????? ?????????????????????.', life: 3000 });
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
        let _item = { ...item };
        _item[`${name}`] = val;

        setItem(_item);
    }

    const onInputTextChange = (e, name) => {
        const val = e.htmlValue || 0;
        let _item = { ...item };
        _item[`${name}`] = val;

        setItem(_item);
    }


    const handleFileOnChange = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setURL(file);
        }
        reader.readAsDataURL(file);
      }

    const coltemplate = (rowData) => {
        return <div>
            <a className={styles.board_button} onClick={()=>rowColumnClick(rowData)}>{rowData.title}</a>
        </div>;
    }

    const rowColumnClick = (rowData) => {
        //hit update
        boardService.updateHit(rowData.boardNo)
            .then(res => {
                const itemsIndex = items.findIndex((item) => item.boardNo === rowData.boardNo);

                const newItems = update( items, {
                    [itemsIndex] : {
                        hit: {
                            $set: rowData.hit + 1 
                        }
                    }
                });
                
                setItems(newItems);
            })
            .catch(err => {
                console.log('Hit update() Error!', err);
            });

        setURLName(rowData.url && rowData.url.split("_", 3)[2]);
        setItem({ ...rowData });
        setViewDialog(true);
    }

    const hideViewDialog = () => {
        setViewDialog(false);
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
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
            <div style={{float: 'right'}}>
                {sessionStorage.getItem('role') == '?????????' && <Button label="?????????" icon="pi pi-plus" className="p-button" onClick={openNew} />}
            </div>
        </div>
    );
    const itemDialogFooter = (
        <React.Fragment>
            <Button label="??????" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="??????" icon="pi pi-check" className="p-button-text" onClick={saveItem} />
        </React.Fragment>
    );

    const checkDialogFooter = (
        <React.Fragment>
            <Button label="??????" className="p-button-text" onClick={hideViewDialog} />
        </React.Fragment>
    );

    const deleteItemDialogFooter = (
        <React.Fragment>
            <Button label="?????????" icon="pi pi-times" className="p-button-text" onClick={hideDeleteItemDialog} />
            <Button label="???" icon="pi pi-check" className="p-button-text" onClick={deleteItem} />
        </React.Fragment>
    );

    const renderHeader = () => {
        return (
            <span className="ql-formats">
            </span>
        );
    }

    const emptyMessage = () => {
        return (
            <span style={{ fontSize: '20px', display: 'block', textAlign:'center', paddingTop: '20%', paddingBottom: '20%' }}>????????? ?????? ????????????.</span>
        );
    };

    const head = renderHeader();

    return (
        <div className="datatable-crud">
            <Toast ref={toast} position="top-center"/>
            <div className="card" style={{ paddingBottom: '2%'}}>
                <span style={{ color: '#1C91FB', fontSize: '20px', display: 'block', textAlign:'center', marginTop: '35PX', marginBottom: '20px' }}>????????????</span>
                <DataTable ref={dt} value={items} selection={selectedItems} emptyMessage={emptyMessage} onSelectionChange={(e) => setSelectedItems(e.value)}
                    dataKey="boardNo" paginator rows={12}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column style={{ textAlign: 'center', width: '15%', padding: '10px' }} field="boardNo" header="No"></Column>
                    <Column style={{ textAlign: 'center', width: '35%', padding: '10px' }} field="title" header="??????" body={coltemplate}></Column>
                    <Column style={{ textAlign: 'center', width: '15%', padding: '10px' }} field="userId" header="?????????"></Column>
                    <Column style={{ textAlign: 'center', width: '15%', padding: '10px' }} field="boardDt" header="?????????"></Column>
                    <Column style={{ textAlign: 'center', width: '10%', padding: '10px' }} field="hit" header="??????"></Column>
                    {sessionStorage.getItem('role') == '?????????' && <Column style={{ textAlign: 'center', width: '10%', padding: '5px' }} body={actionBodyTemplate}></Column> }
                </DataTable>
            </div>

            <Dialog baseZIndex={9999} visible={itemDialog} style={{ width: '80%' }} header="?????? ??????" modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <label htmlFor="title">??????</label>
                    <InputText id="title" value={item.title} onChange={(e) => onInputChange(e, 'title')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.title })} />
                    {submitted && !item.title && <small className="p-error">Name is required.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="contents">??????</label>
                    <Editor style={{ height: '320px' }} value={item.contents} onTextChange={(e) => onInputTextChange(e, 'contents')} />
                </div>
                <div className="p-field">
                    <input id={"file-input"} type="file" name="imageFile" onChange={handleFileOnChange} />
                </div>
            </Dialog>

            <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {item && <span><b>{item.title}</b>??? ?????????????????????????</span>}
                </div>
            </Dialog>

            <Dialog baseZIndex={9999} visible={viewDialog} style={{ width: '80%' }} header="?????? ??????" footer={checkDialogFooter} modal className="p-fluid" onHide={hideViewDialog}>
                <div className="p-field">
                    <label htmlFor="title">??????</label>
                    <InputText id="title" value={item.title} onChange={(e) => onInputChange(e, 'title')} className={classNames({ 'p-invalid': submitted && !item.title })} readOnly={true} />
                    {submitted && !item.title && <small className="p-error">Name is required.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="contents">??????</label>
                    <Editor headerTemplate={head} style={{ height: '320px' }} value={item.contents} onTextChange={(e) => onInputTextChange(e, 'contents')} readOnly={true}/>
                </div>
                <div className="p-field">
                    ?????? ????????????: <a href={item.url} download={URLName}>{URLName}</a>
                </div>
            </Dialog>

        </div>
    );
});

export default Board;