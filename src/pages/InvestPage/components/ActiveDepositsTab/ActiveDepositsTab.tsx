import React from 'react';
import { isEmpty } from 'lodash';

import { Deposits } from './components/Deposits';
import { DepositDetails } from './components/DepositDetails';

import s from './ActiveDepositsTab.module.scss';

export const ActiveDepositsTab: React.FC = () => {
  const [selectedDeposit, setSelectedDeposit] = React.useState('');

  function renderTable() {
    if (isEmpty(selectedDeposit)) {
      return <Deposits setSelectedDeposit={setSelectedDeposit} />;
    }

    return <DepositDetails setSelectedDeposit={setSelectedDeposit} />;
  }

  return <div className={s.root}>{renderTable()}</div>;
};
