import React, { useRef, useState } from 'react';
import SockJsClient from 'react-stomp';

export default function Chat() { 
    const [prevState, setPrevState] = useState(null);
    const [item, setItem] = useState(null);
    
    const $websocket = useRef(null); 
    
    const handleMsg = msg => { 
        console.log(msg); 
    }; 
    
    const handleClickSendTo = () => { 
        $websocket.current.sendMessage('/sendTo'); 
    }; 
    
    const handleClickSendTemplate = () => { 
        $websocket.current.sendMessage('/Template'); 
    }; 
    
    onMessageReceive = (msg, topic) => {
        setItem(prevState => ({
          messages: [...prevState.messages, msg]
        }));
      }

    sendMessage = (msg, selfMsg) => {
        try {
          this.clientRef.sendMessage("/app/all", JSON.stringify(selfMsg));
          return true;
        } catch(e) {
          return false;
        }
      }
        

    return (
        <div> 
            <SockJsClient 
                url="http://localhost:8080/ucare_backend/start" 
                topics={['/topics/sendTo', '/topics/template', '/topics/api']} 
                onMessage={msg => { console.log(msg); }} 
                ref={$websocket} /> 
                
            <button onClick={handleClickSendTo}>SendTo</button> 
            <button onClick={handleClickSendTemplate}>SendTemplate</button> 
            </div>
    ); 
} 