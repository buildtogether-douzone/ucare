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
import EventNoteIcon from '@material-ui/icons/EventNote';

const NurseList = () => {
    return (
        <div>
            <ListItem button component={Link} to="/Home">
                <ListItemIcon>
                    <EventNoteIcon />
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
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="현황" />
            </ListItem>
            <ListItem button component={Link} to="/reservation">
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="예약" />
            </ListItem>
        </div>
    );
}

export default NurseList;