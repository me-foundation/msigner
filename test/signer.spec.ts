import * as bitcoin from 'bitcoinjs-lib';
import * as chai from 'chai';
import { IOrdItem, utxo } from '../src';
import {
  ORDINALS_API_URL,
} from '../src/constant';
import { FullnodeRPC } from '../src/vendors/fullnoderpc';

const expect = chai.expect;

const genIOrdItemFixture = (): IOrdItem => {
  return {
    id: '8322f05bdcbf42b54ff7ee27db85d37a34e78c79232a530f70b96629b6542896i0',
    contentURI: `${ORDINALS_API_URL}/content/8322f05bdcbf42b54ff7ee27db85d37a34e78c79232a530f70b96629b6542896i0`,
    contentType: 'text/plain;charset=utf-8',
    contentPreviewURI: `${ORDINALS_API_URL}/preview/8322f05bdcbf42b54ff7ee27db85d37a34e78c79232a530f70b96629b6542896i0`,
    sat: -1,
    genesisTransaction:
      '8322f05bdcbf42b54ff7ee27db85d37a34e78c79232a530f70b96629b6542896',
    genesisTransactionBlockTime: 'Thu, 16 Feb 2023 08:01:44 GMT',
    inscriptionNumber: 528,
    chain: 'btc-signet',
    location:
      '8322f05bdcbf42b54ff7ee27db85d37a34e78c79232a530f70b96629b6542896:0:0',
    output:
      '8322f05bdcbf42b54ff7ee27db85d37a34e78c79232a530f70b96629b6542896:0',
    outputValue: 10000,
    owner: 'tb1p65gd97dj3eqz83n4ehder6pdq9pyv0alqd6nqthhassdca40wzssqaamkl',
    listed: false,
    satName: 'satname',
  };
};

let buyerFixtureTx: bitcoin.Transaction | undefined;

const getBuyerFixtureTx = async (): Promise<bitcoin.Transaction> => {
  if (buyerFixtureTx) {
    return buyerFixtureTx;
  }
  buyerFixtureTx = bitcoin.Transaction.fromHex(
    await FullnodeRPC.getrawtransaction(
      '9da61adf626de2654f5def2b4dde8fbec72a3f3a4bab769c0541eeacbb0c20c5',
    ),
  );
  for (
    let outputIndex = 0;
    outputIndex < buyerFixtureTx.outs.length;
    outputIndex++
  ) {
    try {
      buyerFixtureTx.setWitness(outputIndex, []);
    } catch {}
  }
  return buyerFixtureTx;
};

const genbuyerFixture = async () => {
  const tx = await getBuyerFixtureTx();
  return {
    buyerAddress:
      'tb1pwywl7pcx7f7dqm5lssycwtalst8th79564aj6t4cz325kkcpcxkswlshpz',
    buyerTokenReceiveAddress:
      'tb1pwywl7pcx7f7dqm5lssycwtalst8th79564aj6t4cz325kkcpcxkswlshpz',
    buyerDummyUTXO: {
      txid: '9da61adf626de2654f5def2b4dde8fbec72a3f3a4bab769c0541eeacbb0c20c5',
      address: 'tb1pwywl7pcx7f7dqm5lssycwtalst8th79564aj6t4cz325kkcpcxkswlshpz',
      vout: 2,
      value: 1000,
      status: {
        confirmed: true,
        block_height: 0,
        block_hash: '',
        block_time: 0,
      },
      tx,
    } as utxo,
    buyerPaymentUTXOs: [
      {
        txid: '9da61adf626de2654f5def2b4dde8fbec72a3f3a4bab769c0541eeacbb0c20c5',
        address:
          'tb1pwywl7pcx7f7dqm5lssycwtalst8th79564aj6t4cz325kkcpcxkswlshpz',
        vout: 3,
        value: 916372,
        status: {
          confirmed: true,
          block_height: 0,
          block_hash: '',
          block_time: 0,
        },
        tx,
      } as utxo,
    ],
  };
};

describe('SellerSigner', () => {
  describe('PSBT', () => {
    it('should generate an unsigned PSBT', async () => {
      true;
    });
  });
});
