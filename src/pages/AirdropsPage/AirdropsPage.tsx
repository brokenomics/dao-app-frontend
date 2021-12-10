import cn from 'classnames';
import React, { useContext } from 'react';

import { PageTitle } from 'components/UILib/PageTitle';
import { AirDropItem } from 'components/AirDropItem';

import NoDrops from './assests/NoDrops.svg';
import MetamaskDisconnected from './assests/MetamaskDisconnected.svg';

import { Web3Context } from '../../components/Web3Provider';

import s from './AirdropsPage.module.scss';

export interface AirdropsPageProps {
  className?: string;
  hashSum?: string;
  balance?: number;
}

const AirdropsPage: React.FC<AirdropsPageProps> = ({ className }) => {
  const { isConnected, canClaimOdt } = useContext(Web3Context) || {};

  function renderContent() {
    if (!isConnected) {
      return (
        <img
          src={MetamaskDisconnected}
          alt="Metamask not connected"
          className={s.noMetamask}
        />
      );
    }

    if (canClaimOdt) {
      return <AirDropItem />;
    }

    return (
      <img src={NoDrops} alt="No Drops Available" className={s.noDropsImg} />
    );
  }

  function getTip() {
    if (!isConnected) {
      return 'Please connect Metamask to claim your aidrops.';
    }

    if (canClaimOdt) {
      return (
        <>
          As a member of the New Order DAO you may claim NEWO to be used
          <br />
          for voting and governance.
        </>
      );
    }

    return 'We are sorry, but it looks like there are no Airdrops available to you :(';
  }

  return (
    <div className={cn(s.root, className)}>
      <PageTitle className={s.header}>Airdrops</PageTitle>
      <p className={s.tip}>{getTip()}</p>
      {renderContent()}
    </div>
  );
};

export default AirdropsPage;
