import { startOfDay } from 'date-fns';
import { createSelector } from 'reselect';
import { isNil, reduce, isEmpty, isFinite } from 'lodash';

import { RootState, ChoicesByProposals } from '../types';
import {
  Vote,
  FILTER_NAMES,
  FiltersInterface,
} from '../../features/voting/types';
import { FILTER_ALL } from '../../features/voting/constants';

export function selectVotingList(state: RootState): Vote[] {
  return state.voting.votingList || [];
}

function selectVoteChoices(state: RootState): ChoicesByProposals {
  return state.voting.choices || {};
}

const selectVoteChoicesEnrichedWithVotes = createSelector(
  selectVotingList,
  selectVoteChoices,
  (votes, choices) =>
    votes.map((item) => {
      const { id } = item;

      return {
        ...item,
        votes: choices[id],
      };
    }),
);

export const selectVotingListStatusesWithNumbers = createSelector(
  selectVotingList,
  (votingList) => {
    type accType = Record<string, number>;

    const result = reduce(
      votingList,
      (acc: accType, vote) => {
        acc[FILTER_ALL] += 1;
        acc[vote.status] = isFinite(acc[vote.status])
          ? acc[vote.status] + 1
          : 1;

        return acc;
      },
      {
        [FILTER_ALL]: 0,
      },
    );

    return result;
  },
);

export const selectFilteredVotingList = createSelector(
  selectVoteChoicesEnrichedWithVotes,
  (_: RootState, filters: FiltersInterface) => filters,
  (votingList, filters) => {
    let filteredList = votingList;

    const statusFilter = filters[FILTER_NAMES.STATUS];
    const searchFilter = filters[FILTER_NAMES.SEARCH];
    const { startDate, endDate } = filters[FILTER_NAMES.DATE];

    if (!isEmpty(searchFilter)) {
      filteredList = filteredList.filter(({ voteTitle }) =>
        voteTitle.toLowerCase().includes(searchFilter),
      );
    }

    if (statusFilter !== FILTER_ALL) {
      filteredList = filteredList.filter((item) => {
        const { status } = item;

        return statusFilter === status;
      });
    }

    if (!isNil(startDate)) {
      filteredList = filteredList.filter((item) => {
        const date = item.voteLaunch;

        return startOfDay(date).getTime() >= startOfDay(startDate).getTime();
      });
    }

    if (!isNil(endDate)) {
      filteredList = filteredList.filter((item) => {
        const date = item.voteLaunch;

        return startOfDay(date).getTime() <= startOfDay(endDate).getTime();
      });
    }

    return filteredList;
  },
);

export const selectVoteById = createSelector(
  selectVoteChoicesEnrichedWithVotes,
  (_: RootState, id: string) => id,
  (votes, id) => votes.find(({ id: voteId }) => voteId === id),
);
