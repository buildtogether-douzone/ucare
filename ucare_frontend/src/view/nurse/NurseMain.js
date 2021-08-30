import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import SiteLayout from '../../layout/SiteLayout';
import PatientList from './PatientList';
import Reservation from './Reservation';

const NurseMain = React.forwardRef((props, ref) => {
    return(
        <SiteLayout >
            <FullPage ref={ref} scrollMode='normal'>
                <Slide>
                    <Reservation />
                </Slide>
                <Slide>
                    <PatientList />
                </Slide>
            </FullPage>
        </SiteLayout>
    );
});

export default NurseMain;