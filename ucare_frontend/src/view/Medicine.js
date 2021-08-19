import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SiteLayout from '../layout/SiteLayout';
import { TextField, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    input: {
        width: '30%',
        fontSize: '16px',
        fontWeight: '600',
    }
}));

export default function Medicine() {
    const classes = useStyles();
    const [medicineName, setMedicineName] = useState('');
    const [symptom, setSymptom] = useState('');
    const [generic, setGeneric] = useState('');
    const [price, setPrice] = useState('');
    const [maker, setMaker] = useState('');

    return (
        <SiteLayout>
            <div className={classes.root} >
                <div className={classes.input} >
                    <p style={{ marginTop: '10px', marginBottom: '8px', marginLeft: '10px' }}>약품명</p>
                    <TextField
                        variant="outlined"
                        style={{ backgroundColor: '#F2F2F2' }}
                        required
                        fullWidth
                        id="name"
                        label="name"
                        name="name"
                        autoComplete="name"
                        value={medicineName}
                        onChange={(e) => { setMedicineName(e.target.value) }}
                        autoFocus
                    />
                    <p style={{ marginTop: '10px', marginBottom: '8px', marginLeft: '10px' }}>증상</p>
                    <TextField
                        variant="outlined"
                        style={{ backgroundColor: '#F2F2F2' }}
                        required
                        fullWidth
                        id="symptom"
                        label="symptom"
                        name="symptom"
                        autoComplete="symptom"
                        value={symptom}
                        onChange={(e) => { setSymptom(e.target.value) }}
                    />

                    <p style={{ marginTop: '10px', marginBottom: '8px', marginLeft: '10px' }}>복제약</p>
                    <TextField
                        variant="outlined"
                        style={{ backgroundColor: '#F2F2F2' }}
                        required
                        fullWidth
                        id="generic"
                        label="generic"
                        name="generic"
                        autoComplete="generic"
                        value={generic}
                        onChange={(e) => { setGeneric(e.target.value) }}
                    />

                    <p style={{ marginTop: '10px', marginBottom: '8px', marginLeft: '10px' }}>가격</p>
                    <TextField
                        variant="outlined"
                        style={{ backgroundColor: '#F2F2F2' }}
                        required
                        fullWidth
                        id="price"
                        label="price"
                        name="price"
                        autoComplete="price"
                        value={price}
                        onChange={(e) => { setPrice(e.target.value) }}
                    />

                    <p style={{ marginTop: '10px', marginBottom: '8px', marginLeft: '10px' }}>제조사</p>
                    <TextField
                        variant="outlined"
                        style={{ backgroundColor: '#F2F2F2' }}
                        required
                        fullWidth
                        id="maker"
                        label="maker"
                        name="maker"
                        autoComplete="maker"
                        value={maker}
                        onChange={(e) => { setMaker(e.target.value) }}
                    />
                    
                    <Button
                        href="/medicine"
                        type="submit"
                        style={{ width: '100%', marginTop: '20px' }}
                        variant="contained"
                        color="primary"
                        disableElevation
                    >
                        등록하기
                    </Button>
                </div>
            </div>
        </SiteLayout>
    );
}
