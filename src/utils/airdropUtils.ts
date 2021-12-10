import { get, chain } from 'lodash';

import { logger } from '../services';
import { MERKLE_TREE } from '../constants/envVars';

interface AirdropInfo {
  index: number;
  amount: string;
  proof: string[];
}

export function getAirdropInfo(address: string): AirdropInfo | null {
  try {
    const tree = JSON.parse(MERKLE_TREE as string);

    const key = chain(tree)
      .get('claims')
      .keys()
      .find((k) => k.toLowerCase() === address.toLowerCase())
      .value();

    if (key) {
      return get(tree, `claims.${key}`);
    }
  } catch (e) {
    logger.error(
      'Merkle tree is not provided or contains error',
      e,
      MERKLE_TREE,
    );
  }

  return null;
}
