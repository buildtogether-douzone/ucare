import React from 'react';
import SiteLayout from '../layout/SiteLayout';
import { withRouter } from 'react-router-dom';
import Board from './admin/Board';

const Home = () => {
  return (
    <SiteLayout>
      <Board />
    </SiteLayout>
  );
}

export default withRouter(Home);