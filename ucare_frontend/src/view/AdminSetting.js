import React, { useState, useEffect } from 'react';
import userService from '../service/userService';

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

export default function AdminSetting () {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

  useEffect(() => {
    // loadUserList();
  }, []);

  const loadUserList = (e) => {
    e.preventDefault(); // 아무 동작 안하고 버튼만 눌러도 리프레시 되는 것을 막는다.
    userService.loadUsers()
      .then( res => {
        setUsers(res.data);
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
      <div>
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
            {users.map( user => 
              <TableRow key={user.no}>
                <TableCell component="th" scope="user">{user.id}</TableCell>
                <TableCell align="right">{user.name}</TableCell>
                <TableCell align="right">{user.role}</TableCell>
                <TableCell align="right">{user.status}</TableCell>
                <TableCell align="right" onClick={()=> editUser(user.id)}>
                  <CreateIcon />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
};

const style = {
  display: 'flex',
  justifyContent: 'center'
}