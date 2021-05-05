import { spawn } from 'child_process';
import * as net from 'net';

net.createServer({ allowHalfOpen: true }, (connection) => {
  console.log('A client has connected.');
  let wholeData = '';
  connection.on('data', (data) => {
    wholeData += data;
  });

  connection.on('end', () => {
    const serialized = JSON.parse(wholeData);
    const pwd = spawn(serialized.command);
    let commandOut = '';
    pwd.stdout.on('data', (data) => {
      commandOut += data;
    });
    pwd.on('close', () => {
      connection.write(commandOut);
      connection.end();
    });
  });
  connection.on('close', () => {
    console.log('A client has disconnected.');
  });
}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
