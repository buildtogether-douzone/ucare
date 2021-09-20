import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import SiteLayout from '../../layout/SiteLayout';
import DoctorStatus from './DoctorStatus';
import styles from '../../assets/scss/Slide.scss'

const DoctorMain = React.forwardRef((props, ref) => {
    
    return(
        <SiteLayout >
            <FullPage ref={ref} scrollMode='normal'>
                <Slide className={styles.PageSlide}>
                    <DoctorStatus />
                </Slide>
            </FullPage>
        </SiteLayout>
    );
});
export default DoctorMain;