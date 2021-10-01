import React, { useEffect, useState } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LanguageIcon from '@material-ui/icons/Language';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PrintIcon from '@material-ui/icons/Print';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { InputText } from "primereact/inputtext";
import { Card } from 'primereact/card';
import hospitalService from '../../service/hospitalService';

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
    }
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
        if (telNo.length === 10) {
            setTelNo(telNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
          }
        if (telNo.length === 13) {
            setTelNo(telNo.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
          }
    }, [telNo])

    const handleFileOnChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            setFile(file);
            setPreviewURL(reader.result);
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
            image: imageURL
        }

        const formData = new FormData();
        formData.append('data', new Blob([JSON.stringify(data)], {type: "application/json"}));
        formData.append('file', file);

        hospitalService.updateData(formData)
        .then(res => {
          console.log('정보가 성공적으로 전송 되었습니다.');
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
            <div className="p-grid" style={{ margin: '10px' }}>
                <div className="p-col-12">
                    <div className="card p-fluid">
                        <Card title="병원 정보">
                        <div className="p-col-12 p-lg-6">
                            <div className="p-field">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-home" />
                                    <InputText 
                                        placeholder="병원명" 
                                        value={hospitalName || ''} 
                                        onChange={(e) => setHospitalName(e.target.value)}  />
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-user" />
                                    <InputText 
                                        placeholder="병원장명" 
                                        value={headName || ''}
                                        onChange={(e) => setHeadName(e.target.value)}/>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-map-marker" />
                                    <InputText 
                                        placeholder="병원 주소" 
                                        value={address || ''}
                                        onChange={(e) => setAddress(e.target.value)}/>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-phone" />
                                    <InputText 
                                        placeholder="병원 전화번호" 
                                        value={telNo || ''} 
                                        onChange={telNoChange}/>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-dollar" />
                                    <InputText 
                                        placeholder="기본 진료비" 
                                        value={ basicPrice || '' }
                                        onChange={(e) => setBasicPrice(e.target.value)}/>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-globe" />
                                    <InputText 
                                        placeholder="사이트 주소" 
                                        value={ siteAddress || '' }
                                        onChange={(e) => setSiteAddress(e.target.value)}/>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left">
                                <i className="pi pi-envelope" />
                                    <InputText 
                                        placeholder="이메일 주소" 
                                        value={ email || '' }
                                        onChange={(e) => setEmail(e.target.value)}/>
                                </span>
                            </div>
                            <div className="p-field">
                                <span className="p-input-icon-left">
                                    <i className="pi pi-print" />
                                    <InputText 
                                        placeholder="팩스 번호" 
                                        value={ faxNo || '' }
                                        onChange={(e) => setFaxNo(e.target.value)}/>
                                </span>
                            </div>
                            <Button
                                style={{ backgroundColor:'#1C91FB', border: '1px solid #1C91FB' }}
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={saveInfo}>
                                등록
                            </Button>
                            </div>
                            <div className="p-col-12 p-lg-4">
                        <div style={{ overflow: 'hidden' }}>
                            <h2>병원장 사진</h2>
                            <div className={classes.image} >
                                <div className={classes.profile}
                                    style={previewURL == null ?
                                        { backgroundImage: `url(${require("../../assets/image/profile.jpg")})` }
                                        : { backgroundImage: `url(${previewURL})` }
                                    } />
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="default"
                                    component="label"
                                    startIcon={
                                        <span>
                                            <CloudUploadIcon style={{ padding: '5px 0 0 0' }} /><span style={{ padding: '0 0 0px 2px' }}>Upload</span>
                                        </span>
                                    }>
                                    <input id={"file-input"} style={{ display: 'none' }} type="file" name="imageFile" onChange={handleFileOnChange} />
                                </Button>
                            </div>
                        </div>
                        <div >
                            <TextField
                                label="내용"
                                variant="outlined"
                                multiline
                                rows={7}
                                value={headSpeak || ''}
                                onChange={(e) => setHeadSpeak(e.target.value)} />
                        </div>
                        </div>
                    </Card>
                </div>
                </div>
            </div>
        </React.Fragment>
    );
}