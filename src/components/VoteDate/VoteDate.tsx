import React from 'react';
import { format } from 'date-fns';

import s from './VoteDate.module.scss';

interface VoteDateProps {
  voteLaunch: number;
}

export const VoteDate: React.FC<VoteDateProps> = ({ voteLaunch }) => {
  const date = format(voteLaunch, 'dd.MM.yyyy');
  const time = format(voteLaunch, 'HH.mm');

  return (
    <div className={s.root}>
      <span className={(s.sectionTip, s.date)}>{date}</span>
      <span className={(s.sectionTip, s.time)}>{time}</span>
    </div>
  );
};
