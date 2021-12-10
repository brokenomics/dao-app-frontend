import React from 'react';
import cn from 'classnames';

import { TagButton } from 'components/UILib';

import { SingleNewsItem } from '../../store/types';

import s from './NewsCard.module.scss';

export interface NewsCardProps extends Omit<SingleNewsItem, 'id' | 'dateTime'> {
  className?: string;
  heading?: string;
  dateTime: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  className,
  mediaLink,
  type,
  refSource,
  dateTime,
  newsText,
  webLink,
  heading,
}: NewsCardProps) => (
  <div className={cn(s.root, className)}>
    {type === 'video' ? (
      <iframe
        src={mediaLink}
        frameBorder="0"
        className={s.media}
        title="Video player"
        scrolling="no"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    ) : (
      <img src={mediaLink} className={s.media} alt={heading} />
    )}
    <div className={s.wrapper}>
      <div className={s.infoBlock}>
        <TagButton
          color="green"
          className={s.tag}
          size="sm"
          badge
          active
          uppercase
        >
          {type}
        </TagButton>
        <span className={s.infoText}>{refSource}</span>
        <span className={cn(s.infoText, s.dateTime)}>{dateTime}</span>
      </div>
      <a href={webLink} className={s.newsText} target="_blank" rel="noreferrer">
        {newsText}
      </a>
    </div>
  </div>
);

export default NewsCard;
