import React, { useRef } from 'react';
import SockJsClient from 'react-stomp';

function App() { 
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

export default App;