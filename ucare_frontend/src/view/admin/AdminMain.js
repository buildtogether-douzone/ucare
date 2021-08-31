import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import SiteLayout from '../../layout/SiteLayout';
import Setting from './Setting';
import Hospital from './Hospital';
import Disease from './Disease';
import Medicine from './Medicine';

const AdminMain = React.forwardRef((props, ref) => {
    return (
      <SiteLayout>
      <FullPage ref={ref} scrollMode='normal'>
        <Slide>
          <Setting />
        </Slide>
        <Slide>
          <Hospital />
        </Slide>
        <Slide>
          <Disease />
        </Slide>
        <Slide>
          <Medicine />
        </Slide>
      </FullPage>
      </SiteLayout>
    );
});
export default AdminMain;