import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import chroma from 'chroma-js';


export default function Chatting({ nick, socket }) {
    const color = chroma.random()._rgb;
    
    const [inputMessage, setInputMessage] = useState({
        nickName: '',
        color: color,
        content: '',
    });
    const [chatMonitor, setChatMonitor] = useState([]);
    const [recentChat, setRecentChat] = useState('');
    const [enterMsg, setEnterMsg] = useState('');
    const [outMsg, setOutMsg] = useState('');

    const handleInput = (e) => {
        setInputMessage({
        ...inputMessage,
        nickName: nick,
        content: e.target.value,
        });
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
        socket.emit('message', { inputMessage });
        setInputMessage({ ...inputMessage, content: '' });
        }
    };

    const handleClick = (e) => {
        socket.emit('message', { inputMessage });
        setInputMessage({ ...inputMessage, content: '' });
    };

    const scrollToBottom = () => {
        document.getElementById('chatMonitor').scrollBy({ top: 100 });
    };

    useEffect(() => {
        socket.on('enter', (data) => {
        setEnterMsg({
            color: [255, 255, 255],
            content: `${data.nick} 님이 입장하셨습니다`,
        });
        });

        socket.on('upload', (data) => {
        setRecentChat(data.inputMessage);
        });

        socket.on('out', (data) => {
        if (data.nick.length > 0) {
            setOutMsg({
            color: [255, 255, 255],
            content: `${data.nick} 님이 퇴장하셨습니다`,
            });
        }
        });
    }, []);

    useEffect(async () => {
        (await recentChat.content?.length) > 0 &&
        setChatMonitor([...chatMonitor, recentChat]);
        scrollToBottom();
        setRecentChat('');
    }, [recentChat]);

    useEffect(async () => {
        (await enterMsg.content?.length) > 0 &&
        setChatMonitor([...chatMonitor, enterMsg]);
        scrollToBottom();
        setEnterMsg('');
    }, [enterMsg]);

    useEffect(async () => {
        (await outMsg.content?.length) > 0 &&
        setChatMonitor([...chatMonitor, outMsg]);
        scrollToBottom();
        setOutMsg('');
    }, [outMsg]);

    return (
        <ChattingWrap>
        <ChattingBox>
            <ChatNav>
            <span>U-CARE</span>
            </ChatNav>
            <Monitor id="chatMonitor">
            <ChatContent>
                {chatMonitor.map((el, idx) => (
                <div key={idx}>
                    <p>{el.nickName}</p>
                    <div
                    style={{
                        border: '3px solid black',
                        borderRadius: '5px',
                        borderColor: `rgb(${el.color[0]},${el.color[1]},${el.color[2]})`,
                    }}
                    >
                    <span>{el.content}</span>
                    </div>
                </div>
                ))}
            </ChatContent>
            </Monitor>
            <SendMessageBox>
            <input
                type="text"
                onKeyUp={handleEnter}
                onChange={handleInput}
                value={inputMessage.content}
                placeholder="메세지 입력"
            />
            <button onClick={handleClick}>전송</button>
            </SendMessageBox>
        </ChattingBox>
        </ChattingWrap>
    );
};


const ChattingWrap = styled.div`
  max-width: 500px;
  width: 100%;
  height: 600px;
`;

const ChattingBox = styled.div`
  width: 100%;
  height: 80%;
`;

const Monitor = styled.div`
  height: 80%;
  overflow-y: scroll;
  border-bottom: 1px solid lightgray;
`;

const ChatContent = styled.div`
  height: 80%;
  padding: 10px;
  div {
    font-family: 'Nanum Myeongjo', serif;
    p {
      font-size: 13px;
      font-weight:700;
    }
    div {
      margin: 5px 0 15px 0;
      padding: 5px 5px;
      width: fit-content;
      }
    }
  }
`;

const ChatNav = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px;
  background-color: rgb(111, 211, 139);
  border-bottom: 1px solid lightgray;
  span {
    color: white;
    font-weight: 700;
  }
  img {
    width: 120px;
  }
`;

const SendMessageBox = styled.div`
  border-bottom: 1px solid lightgray;
  input {
    width: 60%;
    height: 30px;
    padding: 5px;
    font-size: 15px;
  }
  button {
    cursor: pointer;
    width: 20%;
    height: 30px;
    font-size: 15px;
    :hover {
      background-color: lightgray;
    }
  }
`;