import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import SiteLayout from '../../layout/SiteLayout';
import DoctorStatus from './DoctorStatus';
import Chatting from '../Chatting';

const DoctorMain = React.forwardRef((props, ref) => {
    return(
        <SiteLayout >
            <FullPage ref={ref} scrollMode='normal'>
                <Slide>
                    <DoctorStatus />
                </Slide>
                <Slide>
                    <Chatting />
                </Slide>
            </FullPage>
        </SiteLayout>
    );
});
export default DoctorMain;