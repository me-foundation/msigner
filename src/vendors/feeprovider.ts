import { getFees } from './mempool';

export async function calculateTxBytesFee(
  vinsLength: number,
  voutsLength: number,
  feeRateTier: string,
  includeChangeOutput: 0 | 1 = 1,
) {
  const recommendedFeeRate = await getFees(feeRateTier);
  return calculateTxBytesFeeWithRate(
    vinsLength,
    voutsLength,
    recommendedFeeRate,
    includeChangeOutput,
  );
}

export function calculateTxBytesFeeWithRate(
  vinsLength: number,
  voutsLength: number,
  feeRate: number,
  includeChangeOutput: 0 | 1 = 1,
): number {
  const baseTxSize = 10;
  const inSize = 180;
  const outSize = 34;

  const txSize =
    baseTxSize +
    vinsLength * inSize +
    voutsLength * outSize +
    includeChangeOutput * outSize;
  const fee = txSize * feeRate;
  return fee;
}

export function getSellerOrdOutputValue(
  price: number,
  makerFeeBp: number,
  prevUtxoValue: number,
): number {
  return (
    price - // listing price
    Math.floor((price * makerFeeBp) / 10000) + // less maker fees, seller implicitly pays this
    prevUtxoValue // seller should get the rest of ord utxo back
  );
}
