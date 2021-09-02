import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
    foot: { 
        position: 'fixed',
        bottom: '0',
        width: '100%',
        paddingTop: '6px',
        backgroundColor: '#F2F2F2',
        height: '30px'
    }
}));

export default function Footer(){
    const classes = useStyles();
    return(
        <Box className={classes.foot}>
            <Typography variant="body2" color="initial" align="center">
                {'Copyright © '}
                <Link color="inherit" href="/">
                    Build Together
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}