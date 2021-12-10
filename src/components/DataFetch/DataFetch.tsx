/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';

import gql from 'graphql-tag';
import { setVotingList, setChoicesForProposal } from '../../store/voting';

// import { request } from '../../utils/apiUtils';
import { apolloClient } from '../../helpers/apollo';

import {
  VoteApiResponse,
  VoteChoicesApiResponse,
} from '../../features/voting/types';

import { SNAPSHOT_SPACE } from '../../constants/envVars';

export const DataFetch: React.FC = () => {
  const dispatch = useDispatch();

  function getProposalQuery() {
    return gql`
      query Proposals {
        proposals (
          first: 10000,
          skip: 0,
          where: {
            space_in: ["${SNAPSHOT_SPACE}"],
          },
          orderBy: "created",
          orderDirection: desc
        ) {
          id
          title
          body
          choices
          start
          end
          snapshot
          state
          author
          space {
            id
            name
          }
        }
      }
    `;
  }
  function getVotesQuery(id: string) {
    return gql`
        query Votes {
          votes (
            first: 10000
            where: {
              proposal: "${id}"
            }
            orderBy: "created",
            orderDirection: desc
          ) {
            choice
          }
        }
    `;
  }

  function sendRequestToSnapshotApi<T>(operationName: string, query) {
    if (operationName === 'Proposals') {
      return apolloClient.query({
        query,
      });
    }

    return apolloClient.query({
      query,
    });

    // return request<T>('/query/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    //   body: JSON.stringify({
    //     operationName,
    //     query,
    //   }),
    // });
  }

  React.useEffect(() => {
    sendRequestToSnapshotApi<VoteApiResponse>('Proposals', getProposalQuery())
      .then((data) => {
        if (data) {
          dispatch(setVotingList(data));
        }

        return data;
      })
      .then((data) => {
        if (data) {
          data.data.proposals.forEach(({ id }) => {
            sendRequestToSnapshotApi<VoteChoicesApiResponse>(
              'Votes',
              getVotesQuery(id),
            ).then((voteData) => {
              if (voteData) {
                dispatch(
                  setChoicesForProposal({
                    id,
                    data: voteData,
                  }),
                );
              }
            });
          });
        }
      });
  }, [dispatch]);

  return null;
};
