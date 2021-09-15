import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import SiteLayout from '../../layout/SiteLayout';
import DoctorStatus from './DoctorStatus';
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

const DoctorMain = React.forwardRef((props, ref) => {
    const classes = useStyles();
    
    return(
        <SiteLayout >
            <FullPage ref={ref} scrollMode='normal'>
                <Slide className={classes.slide}>
                    <DoctorStatus />
                </Slide>
            </FullPage>
        </SiteLayout>
    );
});
export default DoctorMain;