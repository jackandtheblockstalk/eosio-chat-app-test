const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

async function sendMsg (msg) {
  const buffer = Buffer.from(msg.toString())

  // console.log('adding to ifps', msg)
  let res
  try {
    res = await ipfs.add(buffer);
  } catch (err) {
    console.log('Failed to add to ipfs', err)
  }
  console.log(res)
  return res[0].hash
}

export { sendMsg };
