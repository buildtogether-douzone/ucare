import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import MaterialTable from "material-table";
import { Paper } from '@material-ui/core';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Alert from '@material-ui/lab/Alert';
import adminService from '../../service/adminService';

import { useRecoilState } from 'recoil';
import { reloadState } from '../../recoil/atom/adminAtom';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function Setting() {

  var columns = [
    {title: "UserNo", field: "userNo", hidden: true},
    {title: "No.", field: "rowNo", editable: 'never'},
    {title: "ID", field: "id", editable: 'never'},
    {title: "??????", field: "name", editable: 'never'},
    {title: "??????", field: "role", lookup: { ?????????: '?????????', ??????: '??????', ?????????: '?????????' }},
    {title: "??????", field: "status", lookup: { true: '??????', false: '?????????' }}
  ]
  const [data, setData] = useState([]); //table data

  const [reload, setReload] = useRecoilState(reloadState);

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => { 
    retrieveAll();
  }, [])

  useEffect(() => { 
    retrieveAll();
  }, [reload])

  const retrieveAll = (e) => {
    adminService.retrieveAll()
      .then( res => {
        console.log('success!!');
        setData(res.data);
      })
      .catch(err => {
        console.log('retrieveAll() Error!', err);
      });
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if(newData.role === ""){
      errorList.push("Please enter role")
    }
    if(newData.status === ""){
      errorList.push("Please enter status")
    }

    if(errorList.length < 1){
      adminService.update(newData)
      .then(res => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve()
        setIserror(false)
        setErrorMessages([])
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()
        
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
  }

  return (
      <div style={{ height: '87%',  margin: '20px' }}>
        <Card style={{ height: '100%' }}>
          <span style={{ color: '#1C91FB', fontSize: '20px', display: 'block', textAlign:'center' }}>????????? ?????? ??? ?????? ??????</span>
          <Divider />
            <Grid item xs={12}>
            <div>
              {iserror && 
                <Alert severity="error">
                    {errorMessages.map((msg, i) => {
                        return <div key={i}>{msg}</div>
                    })}
                </Alert>
              }       
            </div>
              <MaterialTable
                title=""
                columns={columns}
                data={data}
                icons={tableIcons}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        handleRowUpdate(newData, oldData, resolve);
                        
                    }),
                }}
                components={{
                  Container: props => <Paper {...props} elevation={0}/>
                }}
              />
            </Grid>
        </Card>
      </div>
  );
}