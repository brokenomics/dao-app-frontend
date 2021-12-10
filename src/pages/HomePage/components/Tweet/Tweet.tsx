import React from 'react';

import Image from './assets/Image.svg';
import ProfilePic from './assets/ProfilePic.svg';

import { Icon } from '../../../../components/UILib';

import s from './Tweet.module.scss';

export const Tweet: React.FC = () => (
  <div className={s.root}>
    <div>
      <img src={ProfilePic} alt="profile pic" className={s.profilePic} />
    </div>
    <div>
      <div className={s.tweetInfo}>
        <span className={s.username}>Annette Steward</span>
        <Icon name="cloud-check" className={s.icon} />
        <span>@SethCampbell • 14s</span>
      </div>
      <div className={s.tweet}>
        This is a tweet. It can be long, or short. Depends on what you have to
        say. It can have some hashtags too. #likethis
      </div>
      <img src={Image} alt="tweet img" />
    </div>
  </div>
);
