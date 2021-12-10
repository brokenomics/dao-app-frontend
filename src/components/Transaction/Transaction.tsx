import React from 'react';
import cn from 'classnames';

import { MemberHash } from 'components/UILib/MemberHash';

import s from './Transaction.module.scss';

export interface TransactionProps {
  className?: string;
  transactionText: string;
  hashSum: string;
  transactionAmmount: number;
  dateTime: string;
}

const Transaction: React.FC<TransactionProps> = ({
  transactionText,
  hashSum,
  transactionAmmount,
  dateTime,
  className,
}: TransactionProps) => {
  const formatedTransactionAmmount =
    transactionAmmount < 0
      ? `- ${transactionAmmount}`.slice(1)
      : `+ ${transactionAmmount}`;

  return (
    <div className={cn(s.transactionBlock, className)}>
      <div className={s.descriptionHash}>
        <p className={s.transactionText}>{transactionText}</p>
        <MemberHash
          hashSum={`https://www.confluxscan.io/block/${hashSum}`}
          size="sm"
          length="short"
        />
      </div>
      <div className={s.ammountDate}>
        <p className={cn(s.summ, { [s.minus]: transactionAmmount <= 0 })}>
          {formatedTransactionAmmount} MUM
        </p>
        <p className={s.dateTime}>{dateTime}</p>
      </div>
    </div>
  );
};

export default Transaction;
