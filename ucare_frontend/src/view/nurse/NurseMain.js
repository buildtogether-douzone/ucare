import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import SiteLayout from '../../layout/SiteLayout';
import PatientList from './PatientList';
import Reservation from './Reservation';
import NurseStatus from './NurseStatus';
import Chatting from '../Chatting';

const NurseMain = React.forwardRef((props, ref) => {
    return(
        <SiteLayout >
            <FullPage ref={ref} scrollMode='normal'>
                <Slide>
                    <NurseStatus />
                </Slide>
                <Slide>
                    <Reservation />
                </Slide>
                <Slide>
                    <PatientList />
                </Slide>
                <Slide>
                    <Chatting />
                </Slide>
            </FullPage>
        </SiteLayout>
    );
});
export default NurseMain;