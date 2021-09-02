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

const AdminList = React.forwardRef((props, ref) => {
    return (
        <div>
            <ListItem button component={Link} to="/Home">
                <ListItemIcon>
                    <EventNoteIcon />
                </ListItemIcon>
                <ListItemText primary="공지 사항" />
            </ListItem>
            <ListItem button onClick={(e) => {  location.href='/#/admin/main'; 
                                                ref.current !== null && ref.current.scrollToSlide(0) }}>
                <ListItemIcon>
                    <PersonOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="권한 관리" />
            </ListItem>
            <ListItem button onClick={(e) => { location.href='/#/admin/main'; 
                                               ref.current !== null && ref.current.scrollToSlide(1) }}>
                <ListItemIcon>
                    <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="병원 정보" />
            </ListItem>
            <ListItem button onClick={(e) => { location.href='/#/admin/main'; 
                                               ref.current !== null && ref.current.scrollToSlide(2) }}>
                <ListItemIcon>
                    <BlurOnIcon />
                </ListItemIcon>
                <ListItemText primary="질병 정보" />
            </ListItem>
            <ListItem button onClick={(e) => { location.href='/#/admin/main'; 
                                               ref.current !== null && ref.current.scrollToSlide(3) }}>
                <ListItemIcon>
                    <ColorizeIcon />
                </ListItemIcon>
                <ListItemText primary="의약품 정보" />
            </ListItem>
        </div>
    );
});

export default AdminList;