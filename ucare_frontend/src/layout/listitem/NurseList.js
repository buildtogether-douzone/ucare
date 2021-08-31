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

const NurseList = React.forwardRef((props, ref) => {
    return (
        <div>
            <ListItem button component={Link} to="/Home">
                <ListItemIcon>
                    <EventNoteIcon />
                </ListItemIcon>
                <ListItemText primary="공지 사항" />
            </ListItem>
            <ListItem button onClick={(e) => {  location.href='/#/nurse/main'; ref.current.scrollToSlide(0) }}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="예약" />
            </ListItem>
            <ListItem button onClick={(e) => {  location.href='/#/nurse/main'; ref.current.scrollToSlide(1) }}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="환자 등록/접수" />
            </ListItem>
        </div>
    );
});

export default NurseList;