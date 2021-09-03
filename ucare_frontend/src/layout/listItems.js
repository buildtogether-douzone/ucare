import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveTwoToneIcon from '@material-ui/icons/RemoveTwoTone';;
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

export const nurseListItems = (
  <div>
    <ListItem button component={Link} to="/Home">
      <ListItemIcon>
        <RemoveTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="공지 사항" />
    </ListItem>
    <ListItem button component={Link} to="/nurse/patientList">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="환자 검색" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="수납" />
    </ListItem>
    <ListItem button component={Link} to="/nurse/status">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="진료현황" />
    </ListItem>
    <ListItem button component={Link} to="/reservation">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="예약" />
    </ListItem>
  </div>
);

export const doctorListItems = (
  <div>
    <ListItem button component={Link} to="/Home">
      <ListItemIcon>
        <RemoveTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="공지 사항" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="진료현황" />
    </ListItem>
    <ListItem button component={Link} to="/doctor/status">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="처방" />
    </ListItem>
  </div>
);

export const adminListItems = (
  <div>
    <ListItem button component={Link} to="/Home">
      <ListItemIcon>
        <RemoveTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="공지 사항" />
    </ListItem>
    <ListItem button component={Link} to="/admin/setting">
      <ListItemIcon>
        <RemoveTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="권한 관리" />
    </ListItem>
    <ListItem button component={Link} to="/admin/hospital">
      <ListItemIcon>
        <RemoveTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="병원 정보" />
    </ListItem>
    <ListItem button component={Link} to="/admin/disease">
      <ListItemIcon>
        <RemoveTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="질병 정보" />
    </ListItem>
    <ListItem button component={Link} to="/admin/medicine">
      <ListItemIcon>
        <RemoveTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="의약품 정보" />
    </ListItem>
  </div>
);