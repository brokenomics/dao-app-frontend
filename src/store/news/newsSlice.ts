/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { VideoResponse, MediumResponse } from './types';
import { NEWS_TYPES, NewsSlice, SingleNewsItem } from '../types';

const initialState: NewsSlice = {
  videos: [],
  articles: [],
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<VideoResponse>) => {
      const videos = action.payload.items.reduce(
        (acc: SingleNewsItem[], item) => {
          const { videoId } = item.id;

          if (videoId) {
            const { publishTime, description } = item.snippet;

            acc.push({
              id: videoId,
              mediaLink: `https://www.youtube.com/embed/${videoId}`,
              webLink: `https://www.youtube.com/watch?v=${videoId}`,
              type: NEWS_TYPES.VIDEO,
              refSource: 'Youtube.com',
              newsText: description,
              dateTime: new Date(publishTime).getTime(),
            });
          }

          return acc;
        },
        [],
      );

      state.videos = videos;
    },
    setArticles: (state, actions: PayloadAction<MediumResponse>) => {
      const articles = actions.payload.items.map(
        ({ title, guid, pubDate, thumbnail }) => ({
          id: guid,
          mediaLink: thumbnail,
          type: NEWS_TYPES.ARTICLE,
          refSource: 'Medium.com',
          newsText: title,
          dateTime: new Date(pubDate).getTime(),
          webLink: guid,
        }),
      );

      state.articles = articles;
    },
  },
});

export const { setVideos, setArticles } = newsSlice.actions;
