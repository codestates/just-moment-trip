import React, { useRef, useState, useEffect } from 'react';

function Socket2() {
  let a = `<html>
  <head>
    <meta charset="utf-8" />
    <title>Socket.io Chat Example</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
    />
  </head>
  <body>
    <div class="container">
      <h3>Socket.io Chat Example</h3>
      <form class="form-inline">
        <div class="form-group">
          <label for="msgForm">Message: </label>
          <input type="text" class="form-control" id="msgForm" />
        </div>
        <button type="submit" class="btn btn-primary">Send</button>
      </form>
      <div id="chatLogs"></div>
      <div id="abc"></div>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script>
      $(function () {
        // socket.io 서버에 접속한다
        var socket = io();

        // 서버로 자신의 정보를 전송한다.
        socket.emit('login', {
          // name: "ungmo2",
          name: makeRandomName(),
          userid: 'ungmo2@gmail.com',
        });

        // 서버로부터의 메시지가 수신되면
        socket.on('login', function (data) {
          $('#chatLogs').append(
            '<div><strong>' + data + '</strong> has joined</div>',
          );
        });

        // 서버로부터의 메시지가 수신되면
        socket.on('s2c chat', function (data) {
          $('#abc').append(
            '<div>' +
              data.msg +
              ' : from <strong>' +
              data.from.name +
              '</strong></div>',
          );
        });

        // Send 버튼이 클릭되면
        $('form').submit(function (e) {
          e.preventDefault();
          var $msgForm = $('#msgForm');

          // 서버로 메시지를 전송한다.
          socket.emit('chat', { msg: $msgForm.val() });
          $msgForm.val('');
        });

        function makeRandomName() {
          var name = '';
          var possible = 'abcdefghijklmnopqrstuvwxyz';
          for (var i = 0; i < 3; i++) {
            name += possible.charAt(
              Math.floor(Math.random() * possible.length),
            );
          }
          return name;
        }
      });
    </script>
  </body>
</html>
`;
  return <div dangerouslySetInnerHTML={{ __html: a }}></div>;
}
export default Socket2;
