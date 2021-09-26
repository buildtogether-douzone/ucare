import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import SiteLayout from '../../layout/SiteLayout';
import DoctorStatus from './DoctorStatus';
import Prescription from './Prescription';

import styles from '../../assets/scss/Slide.scss'

const DoctorMain = React.forwardRef((props, ref) => {
    
    return(
        <SiteLayout >
            <FullPage ref={ref} scrollMode='normal'>
                <Slide className={styles.PageSlide}>
                    <DoctorStatus />
                </Slide>
                <Slide className={styles.PageSlide}>
                    <Prescription />
                </Slide>
            </FullPage>
        </SiteLayout>
    );
});
export default DoctorMain;