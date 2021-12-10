/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-return-assign */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState, useContext } from 'react';
import { cloneDeep } from 'lodash';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import { logger } from 'services';
import snapshot from '@snapshot-labs/snapshot.js';
import { Proposal, Results } from 'features/voting/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useModal } from 'components/Modal/useModal';
import Modal from 'components/Modal';
import LoadingOverlay from 'react-loading-overlay';
import Staking from 'components/Staking';
import Client from '../../helpers/snapshot/client';
import { Web3Context } from '../../components/Web3Provider';
import { apolloClient } from '../../helpers/apollo';
import { RootState } from '../../store/types';
import { selectVoteById } from '../../store/voting';
import { ROUTES } from '../../constants/routingConstants';
import { SNAPSHOT_SPACE } from '../../constants/envVars';
import { VOTES_QUERY, PROPOSAL_QUERY } from '../../helpers/queries';
import voting from '../../helpers/voting';
import {
  BackButton,
  PageTitle,
  TagButton,
  TileContainer,
  MemberHash,
  Button,
  NOTIFICATION_TYPES,
  Icon,
} from '../../components/UILib';
import { VoteDate } from '../../components/VoteDate';
import { TileInfoBlock } from './components/TileInfoBlock';
import { showNotification } from '../../components/UILib/notifications/notificationUtils';

import s from './SingleVotePage.module.scss';

const hubUrl = process.env.REACT_APP_HUB_URL;

const stakingClient = new Staking();
export const SingleVotePage: React.FC = () => {
  const [proposal, setProposal] = useState<Proposal>();
  const [results, setResults] = useState<Results>();
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [votesOfChoice, setVotesOfChoice] = useState([]);
  const [votePending, setVotePending] = useState(false);
  const [voteIn, setVoteIn] = useState(0);
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { isConnected, address } = useContext(Web3Context) || {};
  const [votingPower, setVotingPower] = useState(0);
  const vote = useSelector((state: RootState) => selectVoteById(state, id));
  const voteHref = `https://snapshot.org/#/${SNAPSHOT_SPACE}/proposal/${id}`;

  function goBack() {
    history.push(ROUTES.VOTING);
  }

  async function getProposal(id) {
    try {
      const response = await Promise.all([
        apolloClient.query({
          query: PROPOSAL_QUERY,
          variables: {
            id,
          },
        }),
        apolloClient.query({
          query: VOTES_QUERY,
          variables: {
            id,
          },
        }),
      ]);

      let [proposalQueryResponse, votes] = cloneDeep(response);
      const { proposal } = proposalQueryResponse.data;

      if (proposal?.plugins?.daoModule) {
        // The Dao Module has been renamed to SafeSnap
        // Previous proposals have to be renamed
        proposal.plugins.safeSnap = proposal.plugins.daoModule;
        delete proposal.plugins.daoModule;
      }

      const voters = votes.data.votes.map((voter) => voter.voter);
      const provider = snapshot.utils.getProvider(proposal.network);

      const blockNumber = await snapshot.utils.getBlockNumber(provider);

      const blockTag =
        proposal.snapshot > blockNumber
          ? 'latest'
          : parseInt(proposal.snapshot);

      const scores = await snapshot.utils.getScores(
        `${SNAPSHOT_SPACE}`,
        proposal.strategies,
        proposal.network,
        provider,
        voters,
        blockTag,
      );

      // votes.map((vote) => (vote.profile = profiles[vote.voter]));

      const votesArr = votes.data.votes
        .map((vote) => {
          vote.scores = proposal.strategies.map(
            (strategy, i) => scores[i][vote.voter] || 0,
          );
          vote.balance = vote.scores.reduce((a, b) => a + b, 0);

          return vote;
        })
        .sort((a, b) => b.balance - a.balance)
        .filter((vote) => vote.balance > 0);

      const votesOfChoice =
        proposal.type === 'quadratic'
          ? votesArr.map((vote) => Object.keys(vote.choice)).flat()
          : votesArr.map((vote) => vote.choice).flat();

      setVotesOfChoice(votesOfChoice);

      // const votesOfChoice = votes
      /* Get results */
      const votingClass = new voting[proposal.type](
        proposal,
        votesArr,
        proposal.strategies,
      );
      const results = {
        resultsByVoteBalance: votingClass.resultsByVoteBalance(),
        resultsByStrategyScore: votingClass.resultsByStrategyScore(),
        sumBalanceAllVotes: votingClass.sumBalanceAllVotes(),
      };

      setProposal(proposal);
      setResults(results);

      return { votesArr, results };
    } catch (e) {
      return e;
    }
  }

  useEffect(() => {
    getProposal(id);
  }, [id, voteIn]);

  useEffect(() => {
    async function getStakedVotingPower(who: string) {
      const stakedVotingPower = await stakingClient.getTotalVotingPower(who);
      const converted = stakedVotingPower / 1e18;

      setVotingPower(converted);
    }

    if (address) {
      getStakedVotingPower(address);
    }
  }, [address]);

  useEffect(
    () => () => {
      logger.log('[CLEANUP]');
    },
    [],
  );

  const choices = proposal
    ? proposal.choices
        .map((choice, i) => ({ i, choice }))
        .sort((a, b) => a.i - b.i)
    : [];

  const votesbyChoiceObj = {};

  for (let k = 0; k < choices.length; k += 1) {
    votesbyChoiceObj[choices[k].choice] = 0;

    for (let j = 0; j < votesOfChoice.length; j += 1) {
      if (choices[k].i + 1 === parseInt(votesOfChoice[j])) {
        votesbyChoiceObj[choices[k].choice] += 1;
      }
    }
  }

  const sortedChoices =
    results && choices
      ? choices.sort(
          (a, b) =>
            results.resultsByVoteBalance[b.i] -
            results.resultsByVoteBalance[a.i],
        )
      : [];

  const scoreArr =
    results && choices
      ? sortedChoices.map((choice) =>
          !results.sumBalanceAllVotes
            ? 0
            : (100 / results.sumBalanceAllVotes) *
              results.resultsByVoteBalance[choice.i],
        )
      : [];

  let percentageObj = {};

  sortedChoices.map(
    (choice, index) =>
      (percentageObj[choice.choice] = parseFloat(scoreArr[index].toFixed(2))),
  );
  async function signingMessage(provider, account, space, type, payload) {
    try {
      const snapshotClient = new Client(hubUrl);
      const response = await snapshotClient.broadcast(
        provider,
        account,
        space,
        type,
        payload,
      );

      return response;
    } catch (e) {
      return e;
    }
  }

  async function handleSubmitVote() {
    const tag = 'vote';

    setVotePending(true);
    await window.ethereum.send('eth_requestAccounts');

    let choiceIndex;

    if (proposal && proposal.type === 'approval') {
      choiceIndex = [];
      selectedChoices.map((choice) =>
        choiceIndex.push(proposal.choices.indexOf(choice) + 1),
      );
    } else {
      choiceIndex =
        proposal && proposal.choices.indexOf(selectedChoices[0]) + 1;
    }

    let space = SNAPSHOT_SPACE;
    let msg = {
      proposal: proposal?.id,
      choice: choiceIndex,
      metadata: {},
    };
    let result = await signingMessage(
      window.ethereum,
      address,
      space,
      tag,
      msg,
    );

    setVotePending(false);

    if (result.ipfsHash) {
      hideModal();
      showNotification({
        type: NOTIFICATION_TYPES.SUCCESS,
        description: 'Your vote has been submitted successfully',
        lifetime: 3000,
        tag,
      });

      const newVote = voteIn + 1;

      setTimeout(() => {
        setVoteIn(newVote);
      }, 3000);
    } else {
      hideModal();
      showNotification({
        type: NOTIFICATION_TYPES.ERROR,
        description: 'Your vote submission failed, please try again later.',
        lifetime: 3000,
        tag,
      });
    }
  }

  const [showModal, hideModal] = useModal(() => (
    <Modal>
      <h1 className={s.modalTitle}>Confirmation</h1>
      <p>
        Are you sure you want to vote &ldquo;
        {selectedChoices.length > 2
          ? `${selectedChoices[0]}, ${selectedChoices[1]}...`
          : `${selectedChoices[0]}`}
        &rdquo;?
        <br /> This action cannot be undone.
      </p>
      <hr />
      <LoadingOverlay
        active={votePending}
        spinner
        // className={s.stakingContainer}
        text="Voting Pending ..."
      >
        <div className={s.confirmModal}>
          <div className={s.col}>
            <p>Choice(s)</p>
            <p>Block #</p>
            <p>Your voting power</p>
          </div>
          <div className={s.col}>
            <p>{selectedChoices.toString()}</p>
            <p>
              {proposal?.snapshot}{' '}
              <a
                rel="noreferrer"
                href={`https://rinkeby.etherscan.io/block/${proposal?.snapshot}`}
                target="_blank"
              >
                <Icon name="more-vert" />
              </a>
            </p>
            <p>{votingPower}</p>
          </div>
        </div>
      </LoadingOverlay>
      <hr />
      <div className={s.modalButton}>
        <Button
          variant="monochrome"
          onClick={() => {
            hideModal();
          }}
          disabled={votePending}
        >
          Cancel
        </Button>
        <Button
          danger
          variant="outline"
          onClick={handleSubmitVote}
          disabled={votingPower <= 0 || votePending}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  ));

  function renderStatusHeader() {
    const { status = '' } = vote || {};

    return (
      <div className={s.title}>
        Status
        <TagButton
          className={s.openClosed}
          color="green"
          uppercase
          badge
          active
        >
          {status}
        </TagButton>
      </div>
    );
  }

  function renderStatusTile() {
    return (
      <TileContainer title={renderStatusHeader()} className={s.statusTile}>
        <div className={s.row}>
          <div className={s.label}>Vote completion date</div>
          <div className={s.value}>
            <VoteDate voteLaunch={vote?.voteLaunch || 0} />
          </div>
        </div>
        <div className={s.row}>
          <div className={s.label}>Vote id</div>
          <div className={s.value}>
            <MemberHash
              className={s.hash}
              hashSum={id}
              size="sm"
              length="short"
              href={voteHref}
            />
          </div>
        </div>
      </TileContainer>
    );
  }

  function renderVotes() {
    return (
      <div className={s.allVotes}>
        {Object.keys(votesbyChoiceObj).map((key) => (
          <div key={key} className={s.voteContainer}>
            <div className={s.values}>
              <div className={s.percents}>
                {key}:{' '}
                <span className={s.votesPercentVal}>
                  {percentageObj[key] || 0}%
                </span>
              </div>
              <div>
                {votesbyChoiceObj[key]}{' '}
                {votesbyChoiceObj[key] === 1 ? 'vote' : 'votes'}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  function handleChoiceSelect(key) {
    let selected = [...selectedChoices];

    if (proposal?.type === 'single-choice') {
      if (selected.includes(key)) {
        selected = [];
        setSelectedChoices(selected);
      } else {
        selected = [key];
        setSelectedChoices(selected);
      }
    } else if (proposal?.type === 'approval') {
      const index = selected.indexOf(key);

      if (index > -1) {
        selected.splice(index, 1);
        setSelectedChoices(selected);
      } else {
        selected.push(key);
        setSelectedChoices(selected);
      }
    }
  }

  function renderVoteButtons() {
    return (
      <>
        {Object.keys(votesbyChoiceObj).map((key) => (
          <div key={key} className={s.voteButton}>
            {selectedChoices.includes(key) ? (
              <Button
                variant="regular"
                uppercase
                className={s.button}
                size="xl"
                onClick={() => handleChoiceSelect(key)}
              >
                {key}
              </Button>
            ) : (
              <Button
                variant="outline"
                uppercase
                className={s.button}
                size="xl"
                onClick={() => handleChoiceSelect(key)}
              >
                {key}
              </Button>
            )}
          </div>
        ))}
        <div className={s.submitButton}>
          <Button
            variant="monochrome"
            uppercase
            className={s.button}
            size="xl"
            disabled={selectedChoices.length === 0 || !isConnected}
            onClick={() => showModal()}
          >
            VOTE
          </Button>
        </div>
      </>
    );
  }

  function renderVoteDetails() {
    return (
      <TileContainer
        title={<div className={s.voteTitle}>{vote?.voteTitle}</div>}
        className={s.voteDetails}
      >
        <div className={s.generalInfo}>
          <TileInfoBlock title="Description" className={s.infoBlock}>
            {vote?.voteDescription}
          </TileInfoBlock>
          <TileInfoBlock title="Created by" className={s.infoBlock}>
            <MemberHash
              hashSum={vote?.author || ''}
              size="sm"
              length="short"
              href={`https://etherscan.io/address/${vote?.author}`}
            />
          </TileInfoBlock>
          <TileInfoBlock title="Vote launch" className={s.infoBlock}>
            <VoteDate voteLaunch={vote?.voteLaunch || 0} />
          </TileInfoBlock>
        </div>
        {proposal?.type !== 'quadratic' && proposal?.state === 'active' ? (
          <TileInfoBlock title="Vote" className={s.voteBlock}>
            {results ? (
              renderVoteButtons()
            ) : (
              <SkeletonTheme color="#202020" highlightColor="#444">
                <p>
                  <Skeleton count={2} />
                </p>
              </SkeletonTheme>
            )}
          </TileInfoBlock>
        ) : null}
        <TileInfoBlock title="Result" className={s.voteBlock}>
          {results ? (
            renderVotes()
          ) : (
            <SkeletonTheme color="#202020" highlightColor="#444">
              <p>
                <Skeleton count={2} />
              </p>
            </SkeletonTheme>
          )}
        </TileInfoBlock>
      </TileContainer>
    );
  }

  return (
    <div>
      <PageTitle className={s.header}>
        <div className={s.headerLeftPart}>
          <BackButton onClick={goBack} className={s.backButton}>
            Back
          </BackButton>
          Voting
        </div>
        <Button href={voteHref} target="_blank">
          Snapshot Proposal
        </Button>
      </PageTitle>
      <div className={s.content}>
        {renderStatusTile()}
        {renderVoteDetails()}
      </div>
    </div>
  );
};
