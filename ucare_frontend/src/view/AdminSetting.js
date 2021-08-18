import React, { useState, useEffect } from 'react';
import adminService from '../service/adminService';

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'
import SiteLayout from '../layout/SiteLayout'

export default function AdminSetting () {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

  useEffect(() => {
    loadUserList();
  }, []);

  const loadUserList = (e) => {
    adminService.loadUsers()
      .then( res => {
        console.log('success!!');
        console.log(res.data);
        setUsers(res.data.data);
      })
      .catch(err => {
        console.log('reloadUserList() Error!', err);
      });
  }
  
  const editUser = (ID) => {
    // window.localStorage.setItem("userID", ID);
    // this.props.history.push('/edit-user');
  }

    return(
      <SiteLayout >
      <div style={{ width: '100%'}}>
        <Typography variant="h4" style={style}>사용자 직책 및 권한관리</Typography>
        <Button variant="contained" color="primary"> 수정 </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>직책</TableCell>
              <TableCell>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map( (user, index) => 
              <TableRow key={index}>
                <TableCell>{index}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell onClick={()=> editUser(user.id)}>
                  <CreateIcon />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      </SiteLayout>
    );
};

const style = {
  display: 'flex',
  justifyContent: 'center'
}