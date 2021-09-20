import React from 'react';
import { FullPage, Slide } from 'react-full-page';
import SiteLayout from '../../layout/SiteLayout';
import Setting from './Setting';
import Hospital from './Hospital';
import Disease from './Disease';
import Medicine from './Medicine';
import SignUp from './SignUp';
import styles from '../../assets/scss/Slide.scss'

const AdminMain = React.forwardRef((props, ref) => {
  
    return (
      <SiteLayout>
      <FullPage ref={ref} scrollMode='normal'>
        <Slide className={styles.PageSlide}>
          <Setting />
        </Slide>
        <Slide className={styles.PageSlide}>
          <Hospital />
        </Slide>
        <Slide className={styles.PageSlide}>
          <SignUp />
        </Slide>
        <Slide className={styles.PageSlide}>
          <Disease />
        </Slide>
        <Slide className={styles.PageSlide} style={{ paddingBottom: '5%' }}>
          <Medicine />
        </Slide>
      </FullPage>
      </SiteLayout>
    );
});
export default AdminMain;