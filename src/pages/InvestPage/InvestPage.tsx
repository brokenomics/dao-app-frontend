import React from 'react';

import { Tabs } from '../../components/UILib/Tabs';
import { DepositInfo } from './components/DepositInfo';
import { PageTitle } from '../../components/UILib/PageTitle';
import { ActiveDepositsTab } from './components/ActiveDepositsTab';

import s from './InvestPage.module.scss';

export const InvestPage: React.FC = () => {
  function renderDeposits() {
    return (
      <div className={s.deposits}>
        <DepositInfo />
      </div>
    );
  }

  return (
    <div className={s.root}>
      <PageTitle className={s.title}>Vault Assets</PageTitle>
      <Tabs
        tabs={[
          {
            id: 0,
            label: 'Deposit',
            content: renderDeposits(),
          },
          {
            id: 1,
            label: 'Active deposits',
            content: <ActiveDepositsTab />,
          },
        ]}
      />
    </div>
  );
};
