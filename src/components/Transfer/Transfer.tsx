import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { Button, Icon } from 'components/UILib';
import { shortedHash } from 'utils';
import { usePrevious } from 'hooks';

import { ReactComponent as TransferArrow } from 'images/transfer-arrow.svg';
import { ReactComponent as ArrowEllipse } from 'images/arrow-ellipse-dotted.svg';
import confluxIcon from 'images/conflux.svg';
import metamaskIcon from 'images/metamask.svg';

import s from './Transfer.module.scss';

const INPUT_FONT_SIZE = 2.625;
const INPUT_FONT_STEP = 0.25;
const MAX_SYMBOL_WIDTH = 11;

enum Position {
  Left,
  Right,
}

interface Account {
  hash: string;
  currency: string;
}

export interface TransferProps {
  className?: string;
  confluxConnected: boolean;
  metamaskConnected: boolean;
  conflux: Account;
  metamask: Account;
  connectConflux?: () => void;
  connectMetamask?: () => void;
}

const Transfer: React.FC<TransferProps> = ({
  className,
  metamask,
  conflux,
  metamaskConnected,
  confluxConnected,
  connectConflux,
  connectMetamask,
}: TransferProps) => {
  const [inputValue, handleInputValue] = useState('');
  const [transferDirection, setTransferDirection] = useState(Position.Right);
  const [animation, triggerAnimation] = useState(false);
  const [inputFontSize, setInputFontSize] = useState(INPUT_FONT_SIZE);

  const validateAndFormatInput = (value: string) => {
    if (+value >= 0) handleInputValue(value);
    else if (+value < 0 || Number.isNaN(value)) handleInputValue('0.00');
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const fakeInputRef = useRef<HTMLDivElement>(null);

  const toggleTransferDirection = () => {
    setTransferDirection(
      transferDirection === Position.Right ? Position.Left : Position.Right,
    );
    inputRef?.current?.focus();
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const prevInputValue = usePrevious(inputValue) || '';

  useEffect(() => {
    const fakeInputWidth = fakeInputRef?.current?.offsetWidth || 0;
    const inputWidth = inputRef?.current?.offsetWidth || 0;

    if (!fakeInputWidth && !inputWidth) {
      return;
    }

    if (fakeInputWidth === 0) {
      setInputFontSize(INPUT_FONT_SIZE);

      return;
    }

    const isGrows = prevInputValue.length < inputValue.length;
    const isFull =
      fakeInputWidth + MAX_SYMBOL_WIDTH * inputFontSize > inputWidth;

    if (isGrows && isFull && inputFontSize - INPUT_FONT_STEP > 1) {
      setInputFontSize(inputFontSize - INPUT_FONT_STEP);

      return;
    }

    const isShrinks = prevInputValue.length > inputValue.length;
    const isEnoughSpace =
      fakeInputWidth * (1 + INPUT_FONT_STEP / inputFontSize) < inputWidth;

    if (isShrinks && isEnoughSpace && inputFontSize < INPUT_FONT_SIZE) {
      setInputFontSize(inputFontSize + INPUT_FONT_STEP);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const transferToLeft = transferDirection === Position.Left;

  const renderCurrency = (position: Position, account: Account) => {
    const mapWallets = {
      [Position.Left]: {
        iconSrc: metamaskIcon,
        name: 'metamask',
        connected: metamaskConnected,
        connectClassName: s.connectMetamask,
        handleConnect: connectMetamask,
      },
      [Position.Right]: {
        iconSrc: confluxIcon,
        name: 'conflux',
        connected: confluxConnected,
        connectClassName: s.connectConflux,
        handleConnect: connectConflux,
      },
    };

    return (
      <div className={s.column}>
        <span className={s.actionDescription}>
          Swap
          <span className={s.swapDirection}>
            &nbsp;
            {position === transferDirection ? 'to' : 'from'}
          </span>
        </span>
        <img
          src={mapWallets[position].iconSrc}
          alt={mapWallets[position].name}
          className={cn(s.currencyLogo, {
            [s.currencyLogoSmall]: position === transferDirection,
          })}
        />
        <div className={s.hashContainer}>
          <span className={s.hash}>
            {mapWallets[position].connected ? (
              shortedHash(account.hash)
            ) : (
              <Button
                variant="outline"
                size="xs"
                className={mapWallets[position].connectClassName}
                onClick={mapWallets[position].handleConnect}
              >
                <span>Connect</span>
              </Button>
            )}
          </span>
        </div>
        <div className={s.currencyName}>{account.currency}</div>
      </div>
    );
  };

  const inputStyle = { fontSize: `${inputFontSize}rem` };

  return (
    <div className={cn(s.root, className)}>
      {renderCurrency(Position.Left, metamask)}

      <div className={cn(s.column, s.center)}>
        <span className={s.enterAmount}>Enter amount</span>
        <div className={s.amountHolder}>
          <div className={s.amount}>
            <input
              type="text"
              className={s.amountInput}
              value={inputValue}
              ref={inputRef}
              style={inputStyle}
              onChange={(e) => validateAndFormatInput(e.target.value.trim())}
            />
            <div
              ref={fakeInputRef}
              className={s.fakeAmountInput}
              style={inputStyle}
            >
              {inputValue}
            </div>
            <div className={s.amountPlaceholder}>
              <div>0</div>
              <div>.00</div>
            </div>
          </div>
        </div>
        <div className={s.transferWrapper}>
          <Button size="md">Transfer to Ethereum</Button>
          <TransferArrow
            className={cn(s.transferDirection, {
              [s.left]: transferToLeft,
            })}
          />
        </div>
        <div>
          <Button
            variant="clear"
            size="custom"
            className={s.reverseButton}
            onClick={() => {
              toggleTransferDirection();
              triggerAnimation(true);
            }}
          >
            <>
              <Icon name="reverse" className={s.reverseIcon} />
              <div className={s.reverseText}>Reverse wallets</div>
            </>
          </Button>
        </div>
        <ArrowEllipse
          onAnimationEnd={() => triggerAnimation(false)}
          className={cn(s.arrowEllipse, transferToLeft ? s.left : s.right, {
            [s.active]: animation,
          })}
        />
      </div>

      {renderCurrency(Position.Right, conflux)}
    </div>
  );
};

export default Transfer;
