const IPFS = require('ipfs-api');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export async function sendMsg (msg) {
  const buffer = Buffer.from(msg.toString())

  // console.log('adding to ifps', msg)
  let res
  try {
    res = await ipfs.add(buffer);
    console.log(res)
  } catch (err) {
    console.log('Failed to add to ipfs', err)
  }

  return res[0].hash
}
