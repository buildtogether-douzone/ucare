import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveTwoToneIcon from '@material-ui/icons/RemoveTwoTone';;
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import EventNoteIcon from '@material-ui/icons/EventNote';

const DoctorList = React.forwardRef((props, ref) => {
    return (
        <div>
            <ListItem button component={Link} to="/Home">
                <ListItemIcon>
                    <EventNoteIcon />
                </ListItemIcon>
                <ListItemText primary="공지 사항" />
            </ListItem>
            <ListItem button onClick={(e) => {  location.href='/#/doctor/main' ;
                                                ref.current !== null && ref.current.scrollToSlide(0); }}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="진료현황" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="처방" />
            </ListItem>
        </div>
    );
});

export default DoctorList;