import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RemoveTwoToneIcon from '@material-ui/icons/RemoveTwoTone';;


const AdminList = React.forwardRef((props, ref) => {
    return (
        <div>
            <ListItem button component={Link} to="/Home">
                <ListItemIcon>
                    <RemoveTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="공지 사항" />
            </ListItem>
            <ListItem button onClick={(e) => {  ref.current.scrollToSlide(0) }}>
                <ListItemIcon>
                    <RemoveTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="권한 관리" />
            </ListItem>
            <ListItem button onClick={(e) => { ref.current.scrollToSlide(1) }}>
                <ListItemIcon>
                    <RemoveTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="병원 정보" />
            </ListItem>
            <ListItem button onClick={(e) => { ref.current.scrollToSlide(2) }}>
                <ListItemIcon>
                    <RemoveTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="질병 정보" />
            </ListItem>
            <ListItem button onClick={(e) => { ref.current.scrollToSlide(3) }}>
                <ListItemIcon>
                    <RemoveTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="의약품 정보" />
            </ListItem>
        </div>
    );
});

export default AdminList;