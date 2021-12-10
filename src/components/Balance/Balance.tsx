import React from 'react';
import cn from 'classnames';

import { numberReduction, numberWithCommas } from 'utils';
import { Button, Tooltip } from 'components/UILib';

import s from './Balance.module.scss';

export interface BalanceProps {
  className?: string;
  balanceAmount: number;
  fillPercent: number;
}

const Balance: React.FC<BalanceProps> = ({
  balanceAmount,
  fillPercent,
  className,
}: BalanceProps) => {
  const claim = () => {
    // code to process on click of Claim button
  };

  const tooltipBody = (
    <div className={s.tooltipBody}>
      <span className={s.balanceAmount}>
        {numberWithCommas(balanceAmount)}
        &nbsp;NEWO
      </span>
      <Button
        variant="outline"
        size="xs"
        className={s.claimButton}
        onClick={claim}
      >
        <span>Claim</span>
      </Button>
    </div>
  );

  const balance = (
    <div className={cn(s.container, className)}>
      <div className={s.fill} style={{ height: `${fillPercent}%` }} />
      <span className={s.balanceAmount}>
        {numberReduction(balanceAmount)} OPTY
      </span>
    </div>
  );

  return <Tooltip parent={balance} tooltip={tooltipBody} showOnClick />;
};

export default Balance;
