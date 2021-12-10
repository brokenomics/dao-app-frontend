/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get, map, chain, reduce, isObject, isFinite } from 'lodash';

import {
  VoteApiResponse,
  VoteChoicesApiResponse,
} from '../../features/voting/types';
import { VotingSlice } from '../types';

const initialState: VotingSlice = {
  votingList: [],
  choices: {},
};

export const votingSlice = createSlice({
  name: 'voting',
  initialState,
  reducers: {
    setVotingList: (state, action: PayloadAction<VoteApiResponse>) => {
      const votingList = map(action.payload.data.proposals, (vote) => {
        const {
          id,
          state: voteState,
          start,
          title,
          body,
          choices,
          author,
        } = vote;

        return {
          id,
          author,
          status: voteState,
          voteLaunch: start * 1000,
          voteTitle: title,
          voteDescription: body,
          supportPercent: 0,
          againstPercent: 0,
          choices,
        };
      });

      state.votingList = votingList;
    },
    setChoicesForProposal: (
      state,
      action: PayloadAction<{ id: string; data: VoteChoicesApiResponse }>,
    ) => {
      const { id, data } = action.payload;
      const choices = data.data.votes;

      const calculatedChoices = reduce(
        choices,
        (acc: Record<number, number>, item) => {
          const { choice } = item;

          // in some rare cases choice might be an object like choice: {1: 2}
          if (isObject(choice)) {
            const key = chain(choice).keys().first().parseInt().value();
            const val = get(choice, key);

            acc[key] += val;
          } else {
            acc[choice] = isFinite(acc[choice]) ? acc[choice] + 1 : 1;
          }

          return acc;
        },
        {},
      );

      state.choices[id] = calculatedChoices;
    },
  },
});

export const { setVotingList, setChoicesForProposal } = votingSlice.actions;
