import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ColorizeIcon from '@material-ui/icons/Colorize';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import BlurOnIcon from '@material-ui/icons/BlurOn';
import EventNoteIcon from '@material-ui/icons/EventNote';
import HowToRegIcon from '@material-ui/icons/HowToReg';

const AdminList = React.forwardRef((props, ref) => {
    return (
        <div>
            <ListItem button component={Link} to="/Home">
                <ListItemIcon>
                    <EventNoteIcon />
                </ListItemIcon>
                <ListItemText primary="공지사항" />
            </ListItem>
            <ListItem button onClick={(e) => {  location.href='/#/admin/main'; 
                                                ref.current !== null && ref.current.scrollToSlide(0) }}>
                <ListItemIcon>
                    <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="권한관리" />
            </ListItem>
            <ListItem button onClick={(e) => { location.href='/#/admin/main'; 
                                               ref.current !== null && ref.current.scrollToSlide(1) }}>
                <ListItemIcon>
                    <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="병원정보" />
            </ListItem>
            <ListItem button onClick={(e) => { location.href='/#/admin/main'; 
                                               ref.current !== null && ref.current.scrollToSlide(2) }}>
                <ListItemIcon>
                    <HowToRegIcon />
                </ListItemIcon>
                <ListItemText primary="회원등록" />
            </ListItem>
            <ListItem button onClick={(e) => { location.href='/#/admin/main'; 
                                               ref.current !== null && ref.current.scrollToSlide(3) }}>
                <ListItemIcon>
                    <BlurOnIcon />
                </ListItemIcon>
                <ListItemText primary="질병정보" />
            </ListItem>
            <ListItem button onClick={(e) => { location.href='/#/admin/main'; 
                                               ref.current !== null && ref.current.scrollToSlide(4) }}>
                <ListItemIcon>
                    <ColorizeIcon />
                </ListItemIcon>
                <ListItemText primary="의약품정보" />
            </ListItem>
        </div>
    );
});

export default AdminList;