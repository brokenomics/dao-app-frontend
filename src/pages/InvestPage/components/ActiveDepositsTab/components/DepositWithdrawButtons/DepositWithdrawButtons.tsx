import React from 'react';

import { Button, Icon } from '../../../../../../components/UILib';

import s from './DepositWithdrawButtons.module.scss';

export const DepositWithdrawButtons: React.FC = () => (
  <div className={s.actionButtons}>
    <Button
      variant="outline"
      className={s.button}
      leftElement={<Icon name="deposit" />}
    >
      Deposit
    </Button>
    <Button variant="monochrome" leftElement={<Icon name="withdraw" />}>
      Withdraw
    </Button>
  </div>
);
