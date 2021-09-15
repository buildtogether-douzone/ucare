import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import SiteLayout from '../../layout/SiteLayout';
import PatientList from './PatientList';
import Reservation from './Reservation';
import NurseStatus from './NurseStatus';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  slide:{
    position:'relative', 
    overflow:'scroll',
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
}));

const NurseMain = React.forwardRef((props, ref) => {
    const classes = useStyles();
    
    return(
        <SiteLayout >
            <FullPage ref={ref} scrollMode='normal'>
                <Slide className={classes.slide}>
                    <NurseStatus />
                </Slide>
                <Slide className={classes.slide}>
                    <Reservation />
                </Slide>
                <Slide className={classes.slide}>
                    <PatientList />
                </Slide>
            </FullPage>
        </SiteLayout>
    );
});
export default NurseMain;