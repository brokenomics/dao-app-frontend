import React from 'react';
import cn from 'classnames';
import { format } from 'date-fns';
import { CellProps } from 'react-table';
import { times, isDate, isEmpty } from 'lodash';

import {
  Icon,
  Table,
  TagButton,
  BackButton,
  TileContainer,
} from '../../../../../../components/UILib';
import EthIcon from '../assets/EthIcon.svg';
import { DepositWithdrawButtons } from '../DepositWithdrawButtons';

import { TransactionType } from '../../../../types';

import s from './DepositDetails.module.scss';

interface ActiveDepositsDetailsProps {
  setSelectedDeposit: (id: string) => void;
}

export const DepositDetails: React.FC<ActiveDepositsDetailsProps> = ({
  setSelectedDeposit,
}) => {
  const [selectedTransactionType, setSelectedTransactionType] = React.useState(
    '',
  );

  function renderStrategyTileHeader() {
    return (
      <>
        <span className={s.title}>Current Strategy</span>
        <TagButton size="sm" color="silver">
          <>
            Rank
            <span className={s.rank}> #1</span>
          </>
        </TagButton>
      </>
    );
  }

  function renderDataTiles() {
    return (
      <div className={s.tiles}>
        <TileContainer className={s.tile} title="Your balance">
          <div className={s.balance}>500.8</div>
          <div className={s.balanceDiff}>+1.2%</div>
        </TileContainer>
        <TileContainer className={s.tile} title={renderStrategyTileHeader()}>
          <div className={cn(s.balance, s.green)}>+0.38%</div>
        </TileContainer>
      </div>
    );
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ cell }: CellProps<{ value: Date }>) => {
          const { value } = cell;

          if (isDate(value)) {
            const formattedDate = format(value, 'dd.MM.yyyy');
            const formattedTime = format(value, 'HH.mm');

            return (
              <span className={s.dateTime}>
                <span>{formattedDate} </span>
                <span className={s.time}>{formattedTime}</span>
              </span>
            );
          }

          return null;
        },
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: ({ cell }: CellProps<{ type: TransactionType }>) => {
          const { value } = cell;
          const isDeposit = value === TransactionType.DEPOSIT;

          const color = isDeposit ? 'green' : 'red';
          const icon = isDeposit ? 'deposit' : 'withdraw';
          const label = isDeposit ? 'Deposit' : 'Withdraw';

          return (
            <TagButton active color={color} icon={icon}>
              {label}
            </TagButton>
          );
        },
      },
      {
        Header: (
          <div className={s.tokenAmount}>
            Token amount
            <div className={s.tokenVal}>Tokens value</div>
          </div>
        ),
        accessor: 'tokenAmount',
        Cell: ({ cell }: CellProps<{ eth: number; usd: number }>) => {
          const { eth, usd } = cell.value;

          const isPositive = eth >= 0;
          const ethClassName = cn(s.amount, {
            [s.negative]: !isPositive,
          });

          return (
            <div className={s.amount}>
              <div className={ethClassName}>
                {isPositive ? '+' : ''}
                {eth} ETH
              </div>
              <div className={s.usd}>${usd}</div>
            </div>
          );
        },
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        cellClassName: s.actionCell,
        Cell: () => <Icon name="action" className={s.actionIcon} />,
      },
    ],
    [],
  );

  const data = React.useMemo(() => {
    const tableData = times(1000, (i) => {
      const even = i % 2 === 0;

      return {
        date: new Date(),
        type: even ? TransactionType.WITHDRAW : TransactionType.DEPOSIT,
        tokenAmount: {
          eth: 50 * (even ? -1 : 1),
          usd: 300000,
        },
      };
    }).filter(({ type }) => {
      if (isEmpty(selectedTransactionType)) {
        return true;
      }

      return type === selectedTransactionType;
    });

    return tableData;
  }, [selectedTransactionType]);

  function backButtonClick() {
    setSelectedDeposit('');
  }

  function makeHandleFilterChange(type: string) {
    return () => {
      setSelectedTransactionType(type);
    };
  }

  function renderFiltersBlock() {
    return (
      <div className={s.filters}>
        Type
        <TagButton
          color="gold"
          className={s.tagFilter}
          onClick={makeHandleFilterChange('')}
          active={selectedTransactionType === ''}
        >
          All
        </TagButton>
        <TagButton
          color="green"
          icon="deposit"
          className={s.tagFilter}
          onClick={makeHandleFilterChange(TransactionType.DEPOSIT)}
          active={selectedTransactionType === TransactionType.DEPOSIT}
        >
          Deposit
        </TagButton>
        <TagButton
          color="red"
          icon="withdraw"
          className={s.tagFilter}
          onClick={makeHandleFilterChange(TransactionType.WITHDRAW)}
          active={selectedTransactionType === TransactionType.WITHDRAW}
        >
          Withdraw
        </TagButton>
      </div>
    );
  }

  return (
    <>
      <BackButton onClick={backButtonClick}>Back to active deposits</BackButton>
      <div className={s.header}>
        <div className={s.leftPart}>
          <img src={EthIcon} alt="Eth icon" />
          <span className={s.ether}>Ethereum</span>
          <span>ETH</span>
        </div>
        <DepositWithdrawButtons />
      </div>
      {renderDataTiles()}
      <div className={s.transactions}>Transactions</div>
      {renderFiltersBlock()}
      <Table
        columns={columns}
        data={data}
        rowHeight={76}
        tableHeight={456}
        className={s.table}
      />
    </>
  );
};
