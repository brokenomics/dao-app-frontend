import { Vote, VoteChoices } from '../features/voting/types';

export interface RootState {
  news: NewsSlice;
  voting: VotingSlice;
}

export enum NEWS_TYPES {
  UPDATES = 'updates',
  VIDEO = 'video',
  ARTICLE = 'article',
}

export interface SingleNewsItem {
  id: string;
  mediaLink: string;
  type: NEWS_TYPES;
  refSource: string;
  dateTime: number;
  newsText: string;
  webLink: string;
}

export interface NewsSlice {
  videos: SingleNewsItem[];
  articles: SingleNewsItem[];
}

export type ChoicesByProposals = Record<string, VoteChoices>;

export interface VotingSlice {
  votingList: Vote[];
  choices: ChoicesByProposals;
}
