import React, { useState } from 'react';
import socketio from 'socket.io-client';
import Chatting from './Chatting';
import Modal from './Modal';

const SOCKET_SERVER_URL = "http://localhost:4000";

/* 소켓 연결은 컴포넌트와 동등한 위치에서 선언되어야 한다.
왜냐하면 지속적으로 연결이 유지되어야 하기 때문이다*/
const socket = socketio.connect(SOCKET_SERVER_URL);

export default function Main() {
/* 함수 안에 socket 선언하면 컴포넌트 렌더링 끝나면
연결이 끊기기 때문에 여기에 socket 선언하면 안됨 */

  const [nick, setNick] = useState('');

  const handleKeyup = (e) => {
    setNick(e.target.value);
  };

  return (
    <>
      <Chatting nick={sessionStorage.getItem('user')} socket={socket} />
      {/*<Modal nick={nick} handleKeyup={handleKeyup} socket={socket} />*/}
    </>
  );
};
