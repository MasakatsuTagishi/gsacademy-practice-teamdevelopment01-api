//Webhookでメッセージを受信
function doPost(event) {

  //１．ApiTokenとメッセージ送信用のHTTPリクエストを設定
  const TOKEN = 'IzAKFYBb8tNZwaLG5l0g85wxqzRPNrSCgLIHytcIsafFWwvWCp6d77A4kR2vUNLTmNHX2ibfpM0eIZ3V1dJblQd+7mTeSVYOs+dtRbqEBCyncD7jUXC1Ub76wMQWM0uqRRnbA/abFYalDNS0z0o3JQdB04t89/1O/w1cDnyilFU=';
  const reply = "https://api.line.me/v2/bot/message/reply";

  //２．受け取ったメッセージから返信用のTokenを取得
  var json = JSON.parse(event.postData.contents).events[0];
  var replyToken = json.replyToken;

  //３．ユーザーメッセージの取得、メッセージタイプと内容を記述
  var userMessage = json.message.text;
  var payload = JSON.stringify({
      "replyToken": replyToken,
      "messages": [{
        "type": "text",
        "text": "は？「"+userMessage+"」？うっざby上薗"
      }]
  });

  //４．送信
  UrlFetchApp.fetch(reply, {
      "headers": {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + TOKEN,
      },
      "method": "post",
      "payload": payload
  });
}

// ここから下はおうむ返し
// var CHANNEL_ACCESS_TOKEN = 'IzAKFYBb8tNZwaLG5l0g85wxqzRPNrSCgLIHytcIsafFWwvWCp6d77A4kR2vUNLTmNHX2ibfpM0eIZ3V1dJblQd+7mTeSVYOs+dtRbqEBCyncD7jUXC1Ub76wMQWM0uqRRnbA/abFYalDNS0z0o3JQdB04t89/1O/w1cDnyilFU='; // Channel_access_tokenを登録

// function doPost(e) {
//     var event = JSON.parse(e.postData.contents).events[0];
//     var replyToken= event.replyToken;
//     if (typeof replyToken === 'undefined') {
//     return; // エラー処理
//     }
//     var userId = event.source.userId;
//     var nickname = getUserProfile(userId);
//     if(event.type == 'follow') {
//     // ユーザーにbotがフォローされた場合に起きる処理
//     }
//     if(event.type == 'message') {
//     var userMessage = event.message.text;
//     // 今回は鸚鵡返しなので届いたメッセージをそのまま返します。
//     var replyMessage = 'は？「'+userMessage+'」だって？どうでもええわ。by田岸'
//     // もし届いたユーザーからのメッセージによって他にやりたい処理
//     // (ex: spread sheetへの記入など)がある場合は、ここに入れて下さい。
//     var url = 'https://api.line.me/v2/bot/message/reply';
//     UrlFetchApp.fetch(url, {
//         'headers': {
//         'Content-Type': 'application/json; charset=UTF-8',
//         'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
//         },
//         'method': 'post',
//         'payload': JSON.stringify({
//         'replyToken': replyToken,
//         'messages': [{
//             'type': 'text',
//             'text': replyMessage,
//         }],
//         }),
//     });
//     return ContentService.createTextOutput(
//         JSON.stringify({'content': 'post ok'})
//     ).setMimeType(ContentService.MimeType.JSON);
//     }
// }
// // profileを取得してくる関数
// function getUserProfile(userId){
//     var url = 'https://api.line.me/v2/bot/profile/' + userId;
//     var userProfile = UrlFetchApp.fetch(url,{
//     'headers': {
//         'Authorization' :  'Bearer ' + CHANNEL_ACCESS_TOKEN,
//     },
//     })
//     return JSON.parse(userProfile).displayName;
// }