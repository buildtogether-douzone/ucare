import React, { useEffect, useState, useRef } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Button, TextField } from '@material-ui/core';
import { Button as Buttons } from 'primereact/button';
import { makeStyles } from '@material-ui/styles';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';
import { Card } from 'primereact/card';
import hospitalService from '../../service/hospitalService';
import styles from  '../../assets/scss/Hospital.scss';
import basicImg from '../../assets/image/basicImg.jpg';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';

const useStyles = makeStyles({
    textStyle: {
        height: '50px',
        width: '300px',
        marginBottom: '20px'
    },
    addon: {
        backgroundColor: "#DFDFDF",
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        textAlign: 'center',
        paddingTop: '12px',
        width: '15%',
        marginBottom: '20px'
    },
    image: {
        display: 'block',
        top: 80,
        right: 80,
        float: 'left',
        marginBottom: '40px',
        marginRight: '80px'
    },
    profile: {
        display: 'block',
        width: '200px',
        height: '230px',
        border: '1px solid #AAAAAA',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%, 100%',
        backgroundPosition: 'center',
        overflow: 'hidden',
    },
    textfiled: {
        width: '100%'
    },
    Line:{
        display:'flex',
        flexDirection:'row'
    },
})

export default function Hospital() {
    const classes = useStyles();
    const [hospitalName, setHospitalName] = useState('');
    const [headName, setHeadName] = useState('');
    const [address, setAddress] = useState('');
    const [telNo, setTelNo] = useState('');
    const [basicPrice, setBasicPrice] = useState('');
    const [siteAddress, setSiteAddress] = useState('');
    const [email, setEmail] = useState('');
    const [faxNo, setFaxNo] = useState('');
    const [headSpeak, setHeadSpeak] = useState('');
    const [previewURL, setPreviewURL] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [file, setFile] = useState('');
    const [changeFile, setChangeFile] = useState('X');

    const toast = useRef(null);

    const regex = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;

    useEffect(() => {
        hospitalService.fetchHospitalInfo()
            .then(res => {
                setHospitalName(res.data.hospitalName);
                setHeadName(res.data.headName);
                setAddress(res.data.address);
                setBasicPrice(res.data.basicPrice);
                setSiteAddress(res.data.siteAddress);
                setTelNo(res.data.telNo);
                setEmail(res.data.email);
                setFaxNo(res.data.faxNo);
                setHeadSpeak(res.data.headSpeak);
                setPreviewURL(res.data.image);
                setImageURL(res.data.image);
            }).catch(err => {
                console.log('fetchHospitalInfo error', err);
            });
    }, []);

    useEffect(() => {
        if(typeof telNo === "string") {
            if (telNo.length === 10) {
                setTelNo(telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
            }
            if (telNo.length === 13) {
                setTelNo(telNo.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
            }
        }
    }, [telNo])

    const handleFileOnChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setFile(file);
            setPreviewURL(reader.result);
            setChangeFile("O");
        }
        reader.readAsDataURL(file);
    }

    const saveInfo = (e) => {
        e.preventDefault();
        let data = {
            hospitalName: hospitalName,
            headName: headName,
            address: address,
            telNo: telNo,
            basicPrice: basicPrice,
            siteAddress: siteAddress,
            email: email,
            faxNo: faxNo,
            headSpeak: headSpeak,
            image: imageURL,
            changeFile: changeFile
        }

        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(data)], {type: "application/json"}));
        formData.append('file', file);

        hospitalService.updateData(formData)
        .then(res => {
          console.log('success!!');
          setChangeFile("X");
          toast.current.show({ severity: 'success', summary: '알림', detail: '등록 완료되었습니다.', life: 3000 });
        })
        .catch(err => {
          console.log('save hospital data() 에러', err);
        });
    };

    const telNoChange = (e) => {
        const regex = /^[0-9\b -]{0,13}$/;
        if (regex.test(e.target.value)) {
          setTelNo(e.target.value);
        }
      }

    return (
        <React.Fragment>
            <Toast ref={toast} position="top-center" />
            <div className="p-grid" style={{ margin: '10px' }}>
                <div className="p-col-12">
                    <div className="card p-fluid">
                        <Card>
                            <span style={{ color: '#1C91FB', fontSize: '20px', display: 'block', textAlign:'center' }}>병원 정보</span>
                            <Divider />
                        <div className="p-grid">
                        <div className="p-col-12 p-lg-6">
                            <div className="p-field">
                                <span className="p-input-icon-left" style={{ marginTop: '1.2rem' }}>
                                    <i className="pi pi-home" />
                                    <InputText 
                                        style={{ height: '50px' }}
                                        placeholder="병원명" 
                                        value={hospitalName || ''} 
                                        onChange={(e) => setHospitalName(e.target.value)}  />
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left" style={{ marginTop: '1.2rem' }}>
                                    <i className="pi pi-user" />
                                    <InputText 
                                        style={{ height: '50px' }}
                                        placeholder="병원장명" 
                                        value={headName || ''}
                                        onChange={(e) => setHeadName(e.target.value)}/>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left" style={{ marginTop: '1.2rem' }}>
                                    <i className="pi pi-map-marker" />
                                    <InputText 
                                        style={{ height: '50px' }}
                                        placeholder="병원 주소" 
                                        value={address || ''}
                                        onChange={(e) => setAddress(e.target.value)}/>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left" style={{ marginTop: '1.2rem' }}>
                                    <i className="pi pi-phone" />
                                    <InputText 
                                        style={{ height: '50px' }}
                                        placeholder="병원 전화번호" 
                                        value={telNo || ''} 
                                        onChange={telNoChange}/>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left" style={{ marginTop: '1.2rem' }}>
                                    <i className="pi pi-dollar" />
                                    <InputText 
                                        style={{ height: '50px' }}
                                        placeholder="기본 진료비" 
                                        value={ basicPrice || '' }
                                        onChange={(e) => setBasicPrice(e.target.value)}/>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left" style={{ marginTop: '1.2rem' }}>
                                    <i className="pi pi-globe" />
                                    <InputText 
                                        style={{ height: '50px' }}
                                        placeholder="사이트 주소" 
                                        value={ siteAddress || '' }
                                        onChange={(e) => setSiteAddress(e.target.value)}/>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left" style={{ marginTop: '1.2rem' }}>
                                <i className="pi pi-envelope" />
                                    <InputText 
                                        style={{ height: '50px' }}
                                        placeholder="이메일 주소" 
                                        value={ email || '' }
                                        onChange={(e) => setEmail(e.target.value)}/>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left" style={{ marginTop: '1.2rem' }}>
                                    <i className="pi pi-print" />
                                    <InputText 
                                        style={{ height: '50px' }}
                                        placeholder="팩스 번호" 
                                        value={ faxNo || '' }
                                        onChange={(e) => setFaxNo(e.target.value)}/>
                                </span>
                            </div>
                            </div>
                            <div className="p-col-12 p-lg-6">
                            <div style={{ display: 'block', textAlign:'center', marginTop: '1.2rem' }}>
                                <div className={styles.profile_img} style={{ margin: '0 auto'}}>
                                {previewURL != null ? 
                                <img className={styles.profile_img_img} src={previewURL} />
                                : <img className={styles.profile_img_img} src={basicImg} />}
                                </div>
                                <Button
                                    style={{ border: '1px solid #1C91FB', marginTop: '15px', height: '35px' }}
                                    variant="outlined"
                                    size="small"
                                    component="label"
                                    startIcon={ 
                                        <span style={{ padding: 0 }}>
                                            <CloudUploadIcon style={{ padding: '8px 0 0 0', color: '#1C91FB' }} /><span style={{ padding: '0 0 0px 2px', color: '#1C91FB', fontSize: '16px' }}>병원장 사진</span>
                                        </span>
                                    }>
                                    <input id={"file-input"} style={{ display: 'none' }} type="file" name="imageFile" onChange={handleFileOnChange} />
                                </Button>
                                </div>
                                    <div className="p-field" style={{ marginTop: '2%' }} style={{ marginTop: '1.6rem' }}>
                                        <InputTextarea
                                            placeholder="병원장 인사말" 
                                            autoResize
                                            rows={13}
                                            cols={30} 
                                            value={headSpeak || ''}
                                            onChange={(e) => setHeadSpeak(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'block', textAlign:'center' }}>
                                <Buttons
                                style={{ width: '50%', backgroundColor: '#1C91FB', color: 'white', marginTop: '1rem', marginBottom: '1rem' }} 
                                label="등록" 
                                className="p-button-outlined" 
                                type="submit" 
                                onClick={saveInfo} />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}