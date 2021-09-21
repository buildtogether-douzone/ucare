import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import SiteLayout from '../../layout/SiteLayout';
import PatientList from './PatientList';
import Reservation from './Reservation';
import NurseStatus from './NurseStatus';
import CalHoliday from './CalHoliday';
import styles from '../../assets/scss/Slide.scss'

const NurseMain = React.forwardRef((props, ref) => {
    
    return(
        <SiteLayout >
            <FullPage ref={ref} scrollMode='normal'>
                <Slide className={styles.PageSlide}>
                    <NurseStatus />
                </Slide>
                <Slide className={styles.PageSlide}>
                    <Reservation />
                </Slide>
                <Slide className={styles.PageSlide}>
                    <PatientList />
                </Slide>
                <Slide className={styles.PageSlide}>
                    <CalHoliday />
                </Slide>
            </FullPage>
        </SiteLayout>
    );
});
export default NurseMain;