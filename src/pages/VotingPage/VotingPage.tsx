/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import cn from 'classnames';
import { debounce } from 'lodash';
import { useSelector } from 'react-redux';
import { generatePath, useHistory } from 'react-router';

import LoadingOverlay from 'react-loading-overlay';
import { MAX_INTEGER } from 'ethereumjs-util';

import Staking from 'components/Staking';
import { numberReduction } from 'utils';
import { ROUTES } from '../../constants/routingConstants';
import { FilterBlock } from './FilterBlock';
import { VotingCard } from '../../components/VotingCard';
import {
  Icon,
  PageTitle,
  TextField,
  Button,
  // TagButton,
  LabelButton,
  IconButton,
  Switcher,
  NOTIFICATION_TYPES,
} from '../../components/UILib';

import { selectFilteredVotingList } from '../../store/voting';
import { Web3Context } from '../../components/Web3Provider'; // TODO: need to check if user have enough token to stake
import { RootState } from '../../store/types';
import { FILTER_NAMES, FiltersInterface } from '../../features/voting/types';
import { FILTER_ALL } from '../../features/voting/constants';
import { showNotification } from '../../components/UILib/notifications/notificationUtils';
import s from './VotingPage.module.scss';

interface VotingPageProps {
  className?: string;
}

const stakingClient = new Staking();
const votingPowerContract = process.env.REACT_APP_STAKING_ADDRESS;

export const VotingPage: React.FC<VotingPageProps> = ({ className }) => {
  const history = useHistory();
  const [search, setSearch] = React.useState('');
  const [stakeValue, setStakeValue] = React.useState('');
  const [votingPower, setVotingPower] = React.useState(0);
  const [totalVotingPower, setTotalVotingPower] = React.useState(0);
  const [updateFlag, setUpdateFlag] = React.useState(0);
  const [openStake, setOpenStake] = React.useState(false);
  const [approvalPending, setApprovalPending] = React.useState(false);
  const [stakingPending, setStakingPending] = React.useState(false);
  const [unstakingPending, setUnstakingPending] = React.useState(false);
  const { address, updateTokenBalance } = React.useContext(Web3Context) || {};

  const [stakingOn, setStakingOn] = React.useState(true);
  const [filters, setFilters] = React.useState<FiltersInterface>({
    [FILTER_NAMES.SEARCH]: '',
    [FILTER_NAMES.STATUS]: FILTER_ALL,
    [FILTER_NAMES.DATE]: {
      startDate: undefined,
      endDate: undefined,
    },
  });

  const votingList = useSelector((state: RootState) =>
    selectFilteredVotingList(state, filters),
  );

  function updateFilter(key: FILTER_NAMES, val: unknown) {
    setFilters({
      ...filters,
      [key]: val,
    });
  }

  const updateSearchFilter = () => updateFilter(FILTER_NAMES.SEARCH, search);

  // eslint-disable-next-line
  const delayedUpdateSearchFilter = React.useCallback(
    debounce(() => {
      updateSearchFilter();
    }, 500),
    [search],
  );

  React.useEffect(() => {
    delayedUpdateSearchFilter();

    return delayedUpdateSearchFilter.cancel;
  }, [search, delayedUpdateSearchFilter]);

  async function getTotalVotingPower(who: string) {
    const power = await stakingClient.getTotalVotingPower(who);
    const converted = power / 1e18;

    setTotalVotingPower(converted);
  }

  async function getStakedVotingPower(who: string) {
    const stakedVotingPower = await stakingClient.getStakedVotingPower(who);
    const converted = stakedVotingPower / 1e18;

    setVotingPower(converted);
  }

  React.useEffect(() => {
    if (address) {
      getStakedVotingPower(address);
      getTotalVotingPower(address);
    }
  }, [address, updateFlag]);

  async function handleStakingToken() {
    const tag = 'staking';
    const amount = Number(stakeValue);

    const allowance =
      address &&
      votingPowerContract &&
      (await stakingClient.getAllowance(address, votingPowerContract));

    let tx;

    if (parseFloat(allowance) <= 0) {
      setApprovalPending(true);

      tx =
        address &&
        votingPowerContract &&
        (await stakingClient.getApproval(
          votingPowerContract,
          MAX_INTEGER,
          address,
        ));

      setApprovalPending(false);

      if (!tx) return;
    }

    setStakingPending(true);
    tx = address && (await stakingClient.stakeToken(amount, address));

    setStakingPending(false);

    if (tx) {
      // hideModal();
      if (updateTokenBalance) await updateTokenBalance();

      showNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        description: `Successfully Staking ${amount} Tokens`,
        lifetime: 5000,
        tag,
      });

      const flag = updateFlag + 1;

      setUpdateFlag(flag);
    } else {
      showNotification({
        type: NOTIFICATION_TYPES.ERROR,
        description: 'Staking failed, please try again later.',
        lifetime: 5000,
        tag,
      });
    }
  }

  async function handleUnstaking() {
    setUnstakingPending(true);

    const tag = 'withdraw';
    const amount = Number(stakeValue);

    const tx = address && (await stakingClient.unstakeToken(amount, address));

    setUnstakingPending(false);

    if (tx) {
      // hideModal();
      if (updateTokenBalance) await updateTokenBalance();

      showNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        description: 'Withdrawing token successfully',
        lifetime: 5000,
        tag,
      });

      const flag = updateFlag + 1;

      setUpdateFlag(flag);
    } else {
      showNotification({
        type: NOTIFICATION_TYPES.ERROR,
        description: 'Withdrawing failed, please try again later.',
        lifetime: 5000,
        tag,
      });
    }
  }

  function renderStakingSection() {
    return (
      <>
        <div style={{ float: 'right' }}>
          <IconButton
            icon="close"
            variant="clear"
            size="xs"
            onClick={() => setOpenStake(false)}
          />
        </div>
        <div className={s.stakeSwitch}>
          <Switcher
            defaultState={stakingOn}
            options={['Staking', 'Unstaking']}
            onCheck={setStakingOn}
            className={s.switch}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '10px',
          }}
        >
          <TextField
            label={stakingOn ? 'Staking Amount' : 'Withdraw Amount'}
            name="textfield"
            value={stakeValue}
            onChange={setStakeValue}
            variant="xs"
            className={s.stakingInput}
            type="number"
          />
          {stakingOn ? (
            <Button
              variant="outline"
              size="xs"
              leftElement={<Icon className={s.buttonIcon} name="deposit" />}
              onClick={handleStakingToken}
              disabled={stakeValue === ''}
              className={s.stakingButton}
            >
              Stake
            </Button>
          ) : (
            <Button
              variant="outline"
              size="xs"
              danger
              leftElement={<Icon className={s.buttonIcon} name="withdraw" />}
              onClick={handleUnstaking}
              disabled={
                votingPower === 0 ||
                stakeValue === '' ||
                Number(stakeValue) > votingPower
              }
              className={s.unstakingButton}
            >
              Unstake
            </Button>
          )}
        </div>
      </>
    );
  }
  function renderCards() {
    return (
      <div className={s.cards}>
        {votingList.map((vote) => {
          const { id } = vote;

          function onClick() {
            history.push(generatePath(ROUTES.SINGLE_VOTE, { id }));
          }

          return (
            <VotingCard
              key={id}
              className={s.card}
              {...vote}
              onClick={onClick}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn(s.root, className)}>
      {openStake ? (
        <>
          <LoadingOverlay
            active={approvalPending || stakingPending || unstakingPending}
            spinner
            className={s.stakingContainer}
            text={
              approvalPending
                ? 'Approval Pending ...'
                : stakingPending
                ? 'Staking Transaction Pending ...'
                : 'Unstaking Transaction Pending ...'
            }
          >
            <div>{renderStakingSection()}</div>
          </LoadingOverlay>
          <div className={s.labelContainer}>
            <LabelButton className={s.votingPowerLabel}>
              Staked Tokens: {numberReduction(Number(votingPower))} sNEWO
            </LabelButton>
            <LabelButton className={s.votingPowerLabel}>
              Voting Power: {numberReduction(Number(totalVotingPower))}
            </LabelButton>
          </div>
        </>
      ) : (
        <>
          <Button
            className={s.openStakeButton}
            size="md"
            onClick={() => setOpenStake(true)}
            disabled={!address}
          >
            Staking
          </Button>
          <div className={s.labelContainer}>
            <LabelButton className={s.votingPowerLabel}>
              Staked Tokens: {numberReduction(Number(votingPower))} sNEWO
            </LabelButton>
            <LabelButton className={s.votingPowerLabel}>
              Voting Power: {numberReduction(Number(totalVotingPower))}
            </LabelButton>
          </div>
        </>
      )}
      <PageTitle className={s.header}>
        Voting
        {/* <Button
          className={s.openStakeButton}
          size="md"
          onClick={() => setOpenStake(true)}
          disabled={!address}
        >
          Staking
        </Button> */}
      </PageTitle>
      <div className={s.content}>
        <TextField
          variant="sm"
          name="search"
          value={search}
          label="Search"
          onChange={setSearch}
          className={s.search}
          labelClassName={s.label}
          focusClassName={s.focused}
          leftElementClassName={s.iconContainer}
          leftElement={<Icon name="search" className={s.icon} />}
        />
        <FilterBlock filters={filters} updateFilter={updateFilter} />
        {renderCards()}
      </div>
    </div>
  );
};
