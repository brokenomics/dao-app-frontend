import { RootState, SingleNewsItem } from '../types';

export function selectVideos(state: RootState): SingleNewsItem[] {
  return state.news.videos;
}

export function selectArticles(state: RootState): SingleNewsItem[] {
  return state.news.articles;
}
