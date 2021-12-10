import metamaskLogo from 'images/metamask.svg';
import confluxLogo from 'images/conflux.svg';

import { WalletType } from './types';

interface WalletConfig {
  name: string;
  logo: string;
  tokenAbbr: string;
}

export const walletConfigs: { [key in WalletType]: WalletConfig } = {
  [WalletType.Metamask]: {
    name: 'metamask',
    logo: metamaskLogo,
    tokenAbbr: 'NEWO',
  },
  [WalletType.Conflux]: {
    name: 'conflux',
    logo: confluxLogo,
    tokenAbbr: 'cODT',
  },
};
