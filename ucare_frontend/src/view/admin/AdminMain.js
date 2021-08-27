import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import SiteLayout from '../../layout/SiteLayout';
import Setting from './Setting';
import Hospital from './Hospital';
import Disease from './Disease';
import Medicine from './Medicine';

export default function AdminMain() {
    return (
      <SiteLayout>
      <FullPage controls>
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
}