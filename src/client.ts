import * as net from 'net';

const client = net.connect({ port: 60300 });
const object = {
  command: 'pwd',
};
client.write(JSON.stringify(object), () => {
  client.end();
});

let wholeData = '';
client.on('data', (dataChunk) => {
  wholeData += dataChunk;
});

client.on('end', () => {
  console.log(wholeData);
});

