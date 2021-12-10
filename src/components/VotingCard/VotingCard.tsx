import React from 'react';
import cn from 'classnames';

import { VoteDate } from '../VoteDate';
import { TagButton } from '../UILib';

import { handleEnterKeyPress } from '../../utils/keyHandleUtils';

import s from './VotingCard.module.scss';

export interface VotingCardProps {
  className?: string;
  status: string;
  voteLaunch: number;
  voteTitle: string;
  voteDescription: string;
  onClick?: () => void;
}

const VotingCard: React.FC<VotingCardProps> = ({
  className,
  status,
  voteLaunch,
  voteTitle,
  voteDescription,
  onClick,
}: VotingCardProps) => (
  <div
    className={cn(s.root, { [s.clickable]: onClick }, className)}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyPress={handleEnterKeyPress(onClick)}
  >
    <div className={cn(s.container, s.status)}>
      <span className={s.sectionTip}>Status</span>
      <TagButton className={s.openClosed} color="green" uppercase badge active>
        {status}
      </TagButton>
    </div>
    <div className={cn(s.container, s.voteLaunch)}>
      <span className={s.sectionTip}>Vote launch</span>
      <VoteDate voteLaunch={voteLaunch} />
    </div>
    <h1 className={s.votingTitle}>{voteTitle}</h1>
    <span className={s.sectionTip}>Description</span>
    <p className={s.descriptionBody}>{voteDescription}</p>
  </div>
);

export default VotingCard;
