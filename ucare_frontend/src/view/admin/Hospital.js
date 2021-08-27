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
    const [file, setFile] = useState('');

    useEffect(() => {
        hospitalService.fetchHospitalInfo()
            .then(res => {
                setHospitalName(res.data.hospitalName);
                setHeadName(res.data.headName);
                setAddress(res.data.address);
                setTelNo(res.data.telNo);
                setBasicPrice(res.data.basicPrice);
                setSiteAddress(res.data.siteAddress);
                setEmail(res.data.email);
                setFaxNo(res.data.faxNo);
                setHeadSpeak(res.data.headSpeak);
                setPreviewURL(res.data.image);
            }).catch(err => {
                console.log('fetchHospitalInfo error', err);
            });
    }, []);

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
            headSpeak: headSpeak
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

    return (
        <React.Fragment>
            <div style={{ marginLeft:'10%', marginTop: '40px', display:'flex', flexDirection:'column', float:'left'}} >
                <h2>병원 정보</h2>
                <div className={classes.Line}>
                    <div className={classes.addon}>
                        <BusinessIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText 
                        placeholder="병원명" 
                        className={classes.textStyle} 
                        value={hospitalName || ''} 
                        onChange={(e) => setHospitalName(e.target.value)}  />
                </div>
                <div className={classes.Line}>
                    <div className={classes.addon}>
                        <PersonIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText 
                        placeholder="병원장명" 
                        className={classes.textStyle} 
                        value={headName || ''}
                        onChange={(e) => setHeadName(e.target.value)}/>
                </div>
                <div className={classes.Line}>
                    <div className={classes.addon}>
                        <HomeIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText 
                        placeholder="병원 주소" 
                        className={classes.textStyle} 
                        value={address || ''}
                        onChange={(e) => setAddress(e.target.value)}/>
                </div>
                <div className={classes.Line}>
                    <div className={classes.addon}>
                        <PhoneIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText 
                        placeholder="병원 전화번호" 
                        className={classes.textStyle}
                        value={telNo || ''} 
                        onChange={(e) => setTelNo(e.target.value)}/>
                </div>
                <div className={classes.Line}>
                    <div className={classes.addon}>
                        <AttachMoneyIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText 
                        placeholder="기본 진료비" 
                        className={classes.textStyle} 
                        value={ basicPrice || '' }
                        onChange={(e) => setBasicPrice(e.target.value)}/>
                </div>
                <div className={classes.Line}>
                    <div className={classes.addon}>
                        <LanguageIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText 
                        placeholder="사이트 주소" 
                        className={classes.textStyle} 
                        value={ siteAddress || '' }
                        onChange={(e) => setSiteAddress(e.target.value)}/>
                </div>
                <div className={classes.Line}>
                    <div className={classes.addon}>
                        <AlternateEmailIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText 
                        placeholder="이메일 주소" 
                        className={classes.textStyle} 
                        value={ email || '' }
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={classes.Line}>
                    <div className={classes.addon}>
                        <PrintIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText 
                        placeholder="팩스 번호" 
                        className={classes.textStyle} 
                        value={ faxNo || '' }
                        onChange={(e) => setFaxNo(e.target.value)}/>
                </div>
                <Button
                    style={{backgroundColor:'#616161' }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={saveInfo}
                >
                    등록하기
                </Button>
            </div>
            <div style={{ marginTop: '40px', marginLeft: '40px', float:'left' }}>
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
                    <h2>병원장 인사말</h2>
                    <TextField
                        className={classes.textfiled}
                        label="내용"
                        variant="outlined"
                        multiline
                        rows={7}
                        value={headSpeak || ''}
                        onChange={(e) => setHeadSpeak(e.target.value)} />
                </div>
            </div>
        </React.Fragment>
    );
}