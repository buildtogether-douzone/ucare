const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const port = 4000;
const app = express();

app.use(cors());

const server = http.createServer(app);
// socketio 생성후 서버 인스턴스 사용
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

/* 
본격적인 소켓 로직
아래 보면 기본 연결을 제외하고 설정해놓은 연결이 총 6개가 있다
- newUser / enter : 접속했을 때(닉네임을 입력하고 확인을 클릭했을 때)
- message / upload : 채팅 업로드(채팅을 입력하고 엔터 혹은 확인을 눌렀을 때)
- leaveUser / out : 브라우저를 닫았을때(채팅방을 나갔을 때)
*/

io.on('connection', (socket) => { // 기본 연결

  socket.on('newUser', (data) => { // on 데이터를 받을때
    io.emit('enter', data); // emit 데이터를 보낼때

  /* 주의! 여기서 emit 은 socket과 연결된 내부 함수의 메서드가 아닌
  처음에 서버와 연결된 소켓 변수(여기서는 io)에서 해주어야한다*/
  });

  socket.on('message', (data) => {
    console.log('client가 보낸 데이터: ', data);
    io.emit('upload', data);
  });

  socket.on('leaveUser', (nick) => {
    io.emit('out', nick);
  });


});

server.listen(port, () => console.log(`Listening on port ${port}`));