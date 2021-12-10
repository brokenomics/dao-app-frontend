import React from 'react';

import { Websites } from '../Websites';
import { TwitterFeed } from '../TwitterFeed';

import s from './NewsTab.module.scss';

export const NewsTab: React.FC = () => (
  <div className={s.root}>
    <Websites className={s.websites} />
    <TwitterFeed className={s.twitter} />
  </div>
);
