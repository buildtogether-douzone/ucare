import React, { useState } from 'react';
import SiteLayout from '../layout/SiteLayout';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LanguageIcon from '@material-ui/icons/Language';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PrintIcon from '@material-ui/icons/Print';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { InputText } from "primereact/inputtext";
import { InputTextarea } from 'primereact/inputtextarea';

const useStyles = makeStyles({
    textStyle: {
        float: 'left',
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
        float: 'left',
        width: '50px',
        height: '50px',
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
    }
})

export default function Hospital() {
    const classes = useStyles();
    const [value2, setValue2] = useState('');
    const [previewURL, setPreviewURL] = useState('');
    const [file, setFile] = useState('');

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

    return (
        <SiteLayout>
            <div style={{ marginTop: '100px'}} >
                <h2>병원 정보</h2>
                <div>
                    <div className={classes.addon}>
                        <BusinessIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText placeholder="병원명" className={classes.textStyle} />
                </div>
                <div>
                    <div className={classes.addon}>
                        <PersonIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText placeholder="병원장명" className={classes.textStyle} />
                </div>
                <div>
                    <div className={classes.addon}>
                        <HomeIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText placeholder="병원 주소" className={classes.textStyle} />
                </div>
                <div>
                    <div className={classes.addon}>
                        <PhoneIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText placeholder="병원 전화번호" className={classes.textStyle} />
                </div>
                <div>
                    <div className={classes.addon}>
                        <AttachMoneyIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText placeholder="기본 진료비" className={classes.textStyle} />
                </div>
                <div>
                    <div className={classes.addon}>
                        <LanguageIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText placeholder="사이트 주소" className={classes.textStyle} />
                </div>
                <div>
                    <div className={classes.addon}>
                        <AlternateEmailIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText placeholder="이메일 주소" className={classes.textStyle} />
                </div>
                <div>
                    <div className={classes.addon}>
                        <PrintIcon style={{ fontSize: "25px", color: "#616161" }} />
                    </div>
                    <InputText placeholder="팩스 번호" className={classes.textStyle} />
                </div>
            </div>
            <div style={{ marginTop: '100px', marginLeft: '40px'}}>
                <div style={{overflow:'hidden'}}>
                    <h2>병원장 사진</h2>
                    <div className={classes.image} >
                        <div className={classes.profile}
                            style={previewURL == null ?
                                { backgroundImage: `url(${require("../assets/image/profile.jpg")})` }
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
                    <InputTextarea value={value2} onChange={(e) => setValue2(e.target.value)} rows={5} cols={80} autoResize />
                </div>
            </div>
        </SiteLayout>
    );
}