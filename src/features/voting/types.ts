export enum FILTER_NAMES {
  SEARCH = 'search',
  STATUS = 'status',
  DATE = 'date',
}

interface DateFilterInterface {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export interface FiltersInterface {
  search: string;
  status: string;
  date: DateFilterInterface;
}

export interface Strategy {
  name: string;
  params: Record<string, unknown>;
}
export interface Proposal {
  author: string;
  body: string;
  choices: string[];
  created: number;
  end: number;
  id: string;
  network: string;
  plugins: Record<string, unknown>;
  snapshot: string;
  space: {
    id: string;
    name: string;
  };
  start: number;
  state: string;
  strategies: Strategy[];
  title: string;
  type: string;
}

export interface Results {
  resultsByStrategyScore: any;
  resultsByVoteBalance: any;
  sumBalanceAllVotes: any;
}

export type VoteChoices = Record<number, number>;

export interface Vote {
  id: string;
  author: string;
  status: string;
  voteLaunch: number;
  voteTitle: string;
  voteDescription: string;
  supportPercent: number;
  againstPercent: number;
  choices: string[];
  votes?: VoteChoices;
}

export interface ApiVote {
  id: string;
  author: string;
  body: string;
  choices: string[];
  end: number;
  start: number;
  space: {
    id: string;
    name: string;
  };
  snapshot: string;
  state: string;
  title: string;
}

export interface VoteApiResponse {
  data: {
    proposals: ApiVote[];
  };
}

export interface ApiChoice {
  choice: number;
}

export interface VoteChoicesApiResponse {
  data: {
    votes: ApiChoice[];
  };
}
