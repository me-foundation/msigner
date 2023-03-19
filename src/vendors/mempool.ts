import mempoolJS from '@mempool/mempool.js';
import { BTC_NETWORK } from '../constant';

const { bitcoin } = mempoolJS({
  hostname: 'mempool.space',
  network: BTC_NETWORK,
});

export const mempoolBitcoin = bitcoin;

export async function getFeesRecommended() {
  return await mempoolBitcoin.fees.getFeesRecommended();
}

export async function getUtxosByAddress(address: string) {
  return await mempoolBitcoin.addresses.getAddressTxsUtxo({ address });
}

export async function getMempoolTxIds() {
  return await mempoolBitcoin.mempool.getMempoolTxids();
}

export async function getFees(feeRateTier: string) {
  const res = await mempoolBitcoin.fees.getFeesRecommended();
  switch (feeRateTier) {
    case 'fastestFee':
      return res.fastestFee;
    case 'halfHourFee':
      return res.halfHourFee;
    case 'hourFee':
      return res.hourFee;
    case 'minimumFee':
      return res.minimumFee;
    default:
      return res.hourFee;
  }
}
