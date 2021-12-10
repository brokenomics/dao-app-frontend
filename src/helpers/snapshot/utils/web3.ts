/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-buffer-constructor */
/* eslint-disable radix */
import { bufferToHex } from 'ethereumjs-util';

export async function signMessage(web3, msg, address) {
  const message = bufferToHex(new Buffer(msg, 'utf8'));

  const result = await web3.send('personal_sign', [message, address]);

  return result;
}

export async function getBlockNumber(provider) {
  try {
    const blockNumber: any = await provider.getBlockNumber();

    return parseInt(blockNumber);
  } catch (e) {
    return Promise.reject();
  }
}
