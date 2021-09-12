import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import SiteLayout from '../../layout/SiteLayout';
import DoctorStatus from './DoctorStatus';
import ChatMain from '../Chatting/Main';

const DoctorMain = React.forwardRef((props, ref) => {
    return(
        <SiteLayout >
            <FullPage ref={ref} scrollMode='normal'>
                <Slide>
                    <DoctorStatus />
                </Slide>
                <Slide>
                    <ChatMain />
                </Slide>
            </FullPage>
        </SiteLayout>
    );
});
export default DoctorMain;