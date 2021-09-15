import React, { Fragment, useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import userService from '../service/userService';
import Typography from '@material-ui/core/Typography';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Badge from '@material-ui/core/Badge';
import SockJsClient from 'react-stomp';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar } from 'primereact/avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { drawerManage } from '../redux/drawerManagement/actions';
import { OverlayPanel } from 'primereact/overlaypanel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import UserService from '../service/userService';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    position: 'fixed',
    display: 'flex',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "linear-gradient(to right, #1C91FB, #07BDF4)"
  },
  appBarShift: {
    position: 'fixed',
    display: 'flex',
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  image: {
    float: 'left',
    width: '200px',
    height: '179px'
  }
}));

let emptyItem = {
  userNo: null,
  id: '',
  name: ''
};

let empty = {
  to: '',
  title: '',
  contents: ''
}

const Header = ({ open, drawerManage }) => {
  const classes = useStyles();
  const [displayModal, setDisplayModal] = useState(false);
  const [position, setPosition] = useState('center');
  const [name, setName] = useState('');
  const [URL, setURL] = useState('');
  const [email, setEmail] = useState('');
  const [userID, setUserID] = useState('');
  const [badge, setBadge] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [itemDialog, setItemDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(emptyItem);
  const [item, setItem] = useState(empty);
  const [view, setView] = useState(true);

  const $websocket = useRef(null);
  const op = useRef(null);
  const isMounted = useRef(false);

  const dialogFuncMap = {
    'displayModal': setDisplayModal
  }

  const retrieveAll = (e) => {
    UserService.retrieveAll()
      .then(res => {
        console.log('success!!');
        setUsers(res.data);
      })
      .catch(err => {
        console.log('retrieveAll() Error!', err);
      });
  }

  useEffect(() => {
    retrieveAll();
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      op.current.hide();
    }
  }, [selectedProduct]);

  useEffect(() => {
    let user = {
      id: sessionStorage.getItem('user')
    };

    isMounted.current = true;
    setUserID(sessionStorage.getItem('user'));

    userService.fetchUserByID(user)
      .then(res => {
        setName(res.data.name);
        setURL(res.data.image);
        setEmail(res.data.emailId + '@' + res.data.email)
      })
      .catch(err => {
        console.log('fetchUser() 에러', err);
      });
  }, []);

  const onProductSelect = (e) => {
    setSelectedProduct(e.value);
  }

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const logout = (e) => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    localStorage.removeItem('authorization');
    sessionStorage.clear();
  }

  const onMessage = () => {
    document.body.style.position = "relative";
    document.body.style.overflow = "hidden";
    setItemDialog(true);
  };

  const hideDialog = () => {
    document.body.style.position = "";
    document.body.style.overflow = "";
    setItemDialog(false);
  };

  const itemDialogFooter = (
    <React.Fragment>
      <Button onClick={hideDialog} color="primary">보내기</Button>
      <Button onClick={hideDialog} color="primary">닫기</Button>
    </React.Fragment>
  );

  const messageFooter = (
    <div>
      <Button onClick={onMessage}>쪽지 쓰기</Button>
    </div>
  );

  const onUserChange = (e) => {
    setSelectedUser(e.value);
  };

  const selectedUserTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          <div>{option.name}</div>
        </div>
      );
    }

    return (
      <span>
        {props.placeholder}
      </span>
    );
  };

  const userOptionTemplate = (option) => {
    return (
      <div className="country-item">
        <div>{option.name}({option.id})</div>
      </div>
    );
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _item = { ...item };
    _item[`${name}`] = val;

    setItem(_item);
  };

  const onClick = (name) => {
    document.body.style.position = "relative";
    document.body.style.overflow = "hidden";
    dialogFuncMap[`${name}`](true);
  }

  const onHide = (name) => {
    document.body.style.position = "";
    document.body.style.overflow = "";
    dialogFuncMap[`${name}`](false);
  }

  return (
    <Fragment>
      <SockJsClient
        url="http://localhost:8080/ucare_backend/start"
        topics={['/topics/template' + userID]}
        onMessage={msg => { setBadge(msg) }}
        ref={$websocket} />

      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => { drawerManage() }}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ flexGrow: 1 }}>
            <Button
              href="/Home"
              style={{ padding: '0px', width: '100px', fontSize: '20px', color: '#FFFFFF' }} >U-Care</Button>
          </div>
          <Typography style={{ fontSize: '20px' }}>
            {name}님
          </Typography>

          <Button onClick={() => onClick('displayModal') }>
            <Badge badgeContent={badge} color="secondary">
              <MailOutlineIcon style={{ fontSize: '30px', color: '#FFFFFF' }} />
            </Badge>
          </Button>

          <Dialog header="Header" visible={displayModal} modal={false} style={{ width: '50vw' }} footer={messageFooter} onHide={() => onHide('displayModal')}>
            <DataTable value={products} selectionMode="single" paginator rows={5}
              selection={selectedProduct} onSelectionChange={onProductSelect}>
              <Column field="보낸사람" header="보낸사람" />
              <Column header="제목" />
              <Column field="날짜" header="날짜" />
              <Column header="상태" />
            </DataTable>
          </Dialog>

          <Dialog baseZIndex={9999} visible={itemDialog} style={{ width: '40%' }} header="접수" footer={itemDialogFooter} modal className="p-fluid" onHide={hideDialog}>
            <div className="p-field">
              <label htmlFor="name">To</label>
              <Dropdown value={selectedUser} options={users} onChange={onUserChange} optionLabel="name" filter filterBy="name" placeholder="이름"
                valueTemplate={selectedUserTemplate} itemTemplate={userOptionTemplate} />
            </div>
            <div className="p-field" style={{ fontWeight: 'bold' }}>
              <label htmlFor="title">제목</label>
              <InputText value={item.title || ''} onChange={(e) => onInputChange(e, 'title')} />
            </div>
            <div className="p-field" style={{ fontWeight: 'bold' }}>
              <label htmlFor="remark">내용</label>
              <InputTextarea value={item.contents || ''} onChange={(e) => onInputChange(e, 'contents')} rows={5} cols={30} autoResize />
            </div>
          </Dialog>

          <Avatar
            className="p-mr-2"
            style={URL == null ?
              { backgroundImage: `url(${require("../assets/image/profile.jpg")})`, backgroundSize: 'cover' } :
              { backgroundImage: `url(${URL})`, backgroundSize: 'cover' }}
            size="large"
            shape="circle"
            onClick={handleClick}
          />

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
          >
            <div className={classes.image} style={URL == null ?
              { backgroundImage: `url(${require("../assets/image/profile.jpg")})`, backgroundSize: '100% 100%' } :
              { backgroundImage: `url(${URL})`, backgroundSize: '100% 100%' }}>
            </div>
            <Typography style={{ fontSize: '20px' }}>
              {name}님
            </Typography>
            <Typography style={{ fontSize: '20px' }}>
              {email}
            </Typography>
            <MenuItem onClick={() => { location.href = '/#/profile' }}>회원정보 수정</MenuItem>
          </Menu>

          <Button
            href="/"
            onClick={logout}
            style={{ padding: '0px', fontSize: '16px', color: '#FFFFFF' }} >
            <ExitToAppIcon style={{ fontSize: '35px' }} />
          </Button>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    open: state.drawerManageReducer.open
  }
}

const mapDispatchToProps = {
  drawerManage
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);