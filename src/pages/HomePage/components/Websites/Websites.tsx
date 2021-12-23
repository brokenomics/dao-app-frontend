import React from 'react';
import { orderBy } from 'lodash';
import { gql } from '@apollo/client';
import {
  useDispatch,
  // useSelector
} from 'react-redux';
// import { logger } from 'services';
// import mirrorApi from 'api/mirrorApi';
import dayjs from 'dayjs';
import { arweave } from '../../../../helpers/arweave/arweave';
import { arweaveClient } from '../../../../helpers/arweave/arweaveClient';
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

interface Section {
  label: string;
  type: NEWS_TYPES | null;
}

interface Article {
  id: string;
  mediaLink: string;
  type: NEWS_TYPES;
  refSource: string;
  dateTime: number;
  newsText: string;
  webLink: string;
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

const ARTICLES_QUERY = gql`
  query {
    transactions(
      sort: HEIGHT_DESC
      first: 10
      tags: [
        { name: "App-Name", values: "MirrorXYZ" }
        {
          name: "Contributor"
          values: "0x13c5432CfC12bA1f32B6090d1a09cf0Efe9C95Bd"
        }
      ]
    ) {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export const Websites: React.FC<WebsitesProps> = ({ className }) => {
  const dispatch = useDispatch();

  const [section, setSection] = React.useState(FILTERS_CONFIG[0].type);
  const [transactionList, setTransactionList] = React.useState<Article[]>([]);

  React.useEffect(() => {
    request<VideoResponse>(YOUTUBE_API_URL).then((data) => {
      if (data) {
        dispatch(setVideos(data));
      }
    });
  }, [dispatch]);

  const getArticles = async () => {
    // Fetch all the articles with the arweave graphql endpoint
    const { data } = await arweaveClient.query({
      query: ARTICLES_QUERY,
    });

    // Use arweave package to fetch all the transactions from the articles data
    const transactions: Article[] = await Promise.all(
      data.transactions.edges.map(async (transaction) => {
        try {
          const transactionDetail = await arweave.transactions
            .getData(transaction.node.id, { decode: true, string: true })
            .then((res) => JSON.parse(res.toString()));

          const mirrorPageUrl = `https://mirror.xyz/0x13c5432CfC12bA1f32B6090d1a09cf0Efe9C95Bd/${transactionDetail.originalDigest}`;

          // console.log(transactionDetail);

          // await mirrorApi
          //   .get(`link-preview?url=${mirrorPageUrl}`)
          //   .then((res) => console.log(res))
          //   .catch((err) => console.log(err));

          return {
            id: transaction.node.id,
            // @TODO, make the image dynamic
            mediaLink:
              'https://images.mirror-media.xyz/nft/nhDERm-5kNIjoty8I7gth.png',
            type: NEWS_TYPES.ARTICLE,
            refSource: 'Mirror',
            dateTime: transactionDetail.content.timestamp,
            newsText: transactionDetail.content.body,
            webLink: mirrorPageUrl,
          };
        } catch (err) {
          return false;
        }
      }),
    );

    setTransactionList(transactions);
  };

  React.useEffect(() => {
    getArticles();
  }, []);

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
    const convertedDate = dayjs.unix(Number(date));

    return convertedDate.format('DD.MM.YYYY HH:mm');
  }

  function renderNews() {
    const allNews = [...transactionList];
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
