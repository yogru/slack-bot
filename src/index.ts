import express from 'express';
import { createEventAdapter } from '@slack/events-api';
import { createServer } from 'http';
import { WebClient } from '@slack/web-api';

// 생성한 슬랙봇에 대한 키값들
import CONFIG from '../config/bot.json';


const port = 6969

// 슬랙에서 슬랙봇에게 접근가능한 엔드포인트를 만들기 위해 웹서버(express)를 사용
const app = express();

const slackEvents = createEventAdapter(CONFIG.SIGNING_SECRET);
const webClient = new WebClient(CONFIG.BOT_USER_OAUTH_ACCESS_TOKEN);
// 메시지 이벤트 구독하기
slackEvents.on('message', async (event) => {
  console.log(event);
  
  if(event.text==="#멈춰"){
    webClient.chat.postMessage({
      text: '멈춰!!!!!!!!!',
      channel: event.channel,
    });
  }

});

// 메시지 이벤트 엔드포인트를 express 에 등록하기
app.use('/bot/slack/events', slackEvents.requestListener());

// express 웹 서버 실행
createServer(app).listen(port, () => {
  console.log('run slack bot');
});
