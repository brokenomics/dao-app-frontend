import React from 'react';
import { orderBy } from 'lodash';
import { format } from 'date-fns';
import {
  useDispatch,
  // useSelector
} from 'react-redux';

import { GOOGLE_API_KEY } from '../../../../constants/envVars';

import { NewsTileTitle } from '../NewsTileTitle';
import { NewsCard } from '../../../../components/NewsCard';
import { TagButton, TileContainer } from '../../../../components/UILib';

import {
  setVideos,
  // selectVideos,
  // selectArticles,
} from '../../../../store/news';

import { NEWS_TYPES } from '../../../../store/types';
import { VideoResponse } from '../../../../store/news/types';

import { request } from '../../../../utils/apiUtils';

import s from './Websites.module.scss';
import { newsFeed } from './Websites.data';

interface Section {
  label: string;
  type: NEWS_TYPES | null;
}

const FILTERS_CONFIG: Section[] = [
  {
    label: 'All',
    type: null,
  },
  // {
  //   label: 'UPDATES',
  //   type: NEWS_TYPES.UPDATES,
  // },
  {
    label: 'Articles',
    type: NEWS_TYPES.ARTICLE,
  },
  {
    label: 'Videos',
    type: NEWS_TYPES.VIDEO,
  },
];

interface WebsitesProps {
  className?: string;
}

const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search/?part=snippet&channelId=UCoNxg5l_2Gujke_Spm41F8Q&videoCaption=any&key=${GOOGLE_API_KEY}`;

export const Websites: React.FC<WebsitesProps> = ({ className }) => {
  const dispatch = useDispatch();

  // const videos = useSelector(selectVideos);
  const articles = newsFeed;

  const [section, setSection] = React.useState(FILTERS_CONFIG[0].type);

  React.useEffect(() => {
    request<VideoResponse>(YOUTUBE_API_URL).then((data) => {
      if (data) {
        dispatch(setVideos(data));
      }
    });
  }, [dispatch]);

  function renderTags() {
    return FILTERS_CONFIG.map((item) => {
      const { label, type } = item;

      return (
        <TagButton
          key={label}
          active={section === type}
          onClick={() => setSection(type)}
          color="green"
        >
          {label}
        </TagButton>
      );
    });
  }

  function renderTitle() {
    return (
      <NewsTileTitle icon="square-rss" title="Updates">
        {renderTags()}
      </NewsTileTitle>
    );
  }

  function formatData(date: number | string) {
    return format(new Date(date), 'dd.MM.yyyy HH:mm');
  }

  function renderNews() {
    const allNews = [...articles];
    const sortedByDate = orderBy(allNews, 'dateTime', 'desc');
    const filteredNew = sortedByDate.filter((newsItem) => {
      if (section === null) {
        return true;
      }

      return newsItem.type === section;
    });

    return filteredNew.map((newsItem) => {
      const { id, dateTime } = newsItem;
      const formattedDate = formatData(dateTime);

      return (
        <NewsCard
          key={id}
          className={s.newsCard}
          {...newsItem}
          dateTime={formattedDate}
        />
      );
    });
  }

  return (
    <TileContainer title={renderTitle()} size="md" className={className}>
      {renderNews()}
    </TileContainer>
  );
};
