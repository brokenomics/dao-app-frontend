import cn from 'classnames';
import { isEmpty } from 'lodash';
import React, { useContext, useState } from 'react';

import { getAirdropInfo, numberWithCommas } from 'utils';

import { Button, Icon, showNotification, NOTIFICATION_TYPES } from '../UILib';

import { Web3Context } from '../Web3Provider';

import s from './AirDropItem.module.scss';

export interface AirDropItemProps {
  className?: string;
}

const AirDropItem: React.FC<AirDropItemProps> = ({ className }) => {
  const web3Context = useContext(Web3Context);
  const { updateTokenBalance } = useContext(Web3Context) || {};
  const [isClaimed, setIsClaimed] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);

  const [claimAmount, setClaimAmount] = useState(numberWithCommas(0));

  const [transactionAddr, setTransactionAddr] = useState('');

  const walletAddress = web3Context?.address;
  const web3 = web3Context?.web3;

  React.useEffect(() => {
    if (walletAddress) {
      const info = getAirdropInfo(walletAddress);

      if (info) {
        let amount = parseInt(info.amount, 16) / 1e18;

        if (info.amount.includes('0x') && web3) {
          amount = +web3?.utils.hexToNumberString(info.amount) / 1e18;
        }

        setClaimAmount(numberWithCommas(amount));
      }
    }
  }, [walletAddress, web3]);

  function showErrorNoty() {
    showNotification({
      type: NOTIFICATION_TYPES.ERROR,
      description: 'Claim attempt was unsuccessful.',
      lifetime: 3000,
    });
  }

  async function handleClaim() {
    if (walletAddress) {
      const info = getAirdropInfo(walletAddress);
      const distributorInstance = web3Context?.getMerkleDistributorInstance();

      if (info && distributorInstance) {
        setIsClaiming(true);

        const { index, amount, proof } = info;

        try {
          const tx = await distributorInstance.methods
            .claim(index, walletAddress, amount, proof)
            .send(
              { from: walletAddress },
              (error: unknown, transactionHash: string) => {
                if (error) {
                  return false;
                }

                setTransactionAddr(transactionHash);

                return transactionHash;

                // const subscription = web3Context?.web3?.eth
                //   .subscribe('logs', {}, (err) => {
                //     if (err) {
                //       logger.error('Subscription error:', err);
                //     }
                //   })
                //   .on('data', (log) => {
                //     if (log.transactionHash === transactionHash) {
                //       setIsClaiming(false);
                //       setIsClaimed(true);

                //       web3Context?.getTokenAmount();
                //       subscription?.unsubscribe();

                //       showNotification({
                //         type: NOTIFICATION_TYPES.SUCCESS,
                //         description: 'Claim attempt was successful.',
                //         lifetime: 3000,
                //       });
                //     }
                //   });
              },
            );

          if (tx) {
            setIsClaiming(false);
            setIsClaimed(true);

            if (updateTokenBalance) {
              updateTokenBalance();
            }

            showNotification({
              type: NOTIFICATION_TYPES.SUCCESS,
              description: 'Claim attempt was successful.',
              lifetime: 3000,
            });
          } else {
            setIsClaiming(false);
            // setIsClaimed(true);
            showErrorNoty();
          }
        } catch (e) {
          setIsClaiming(false);
          showErrorNoty();
        }
      }
    }
  }

  function renderIcon() {
    if (isClaiming) {
      return <Icon name="claiming" className={s.claimingIcon} />;
    }

    if (isClaimed) {
      return <Icon name="claimed" className={s.claimedIcon} />;
    }

    return null;
  }

  function renderViewOnEtherButton() {
    if (!isEmpty(transactionAddr)) {
      return (
        <Button
          className={s.etherLink}
          size="lg"
          variant="monochrome"
          tagElement="a"
          // href={`https://www.confluxscan.io/block/${transactionAddr}`}
          href={`https://rinkeby.etherscan.io/tx/${transactionAddr}`}
          target="_blank"
          rel="noreferrer"
        >
          View on Etherscan
        </Button>
      );
    }

    return null;
  }

  function renderActionButton() {
    if (!web3Context?.isInstalled) {
      return (
        <Button onClick={web3Context?.getBrowserPlugin}>
          Install Metamask
        </Button>
      );
    }

    if (!web3Context?.isConnected) {
      return <Button onClick={web3Context?.connect}>Connect Metamask</Button>;
    }

    return (
      <div className={s.buttonsHolder}>
        {renderViewOnEtherButton()}
        <Button
          className={cn(s.claimBtn, {
            [s.disabled]: isClaimed || isClaiming,
            [s.claimed]: isClaimed,
          })}
          leftElement={renderIcon()}
          size="lg"
          onClick={handleClaim}
          disabled={isClaiming || isClaimed}
        >
          <span>
            {isClaiming || isClaimed ? null : 'Claim'}
            {isClaiming ? 'Claiming' : null}
            {isClaimed ? 'Claimed' : null}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(s.root, { [s.claimed]: isClaimed }, className)}>
      <div className={s.balanceWrapper}>
        <span className={s.tip}>Available Airdrops</span>
        <span className={s.balance}>{claimAmount} NEWO</span>
      </div>
      {renderActionButton()}
    </div>
  );
};

export default AirDropItem;
