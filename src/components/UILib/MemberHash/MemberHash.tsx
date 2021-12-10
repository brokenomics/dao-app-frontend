import React from 'react';
import cn from 'classnames';

import s from './MemberHash.module.scss';

export interface MemberHashProps {
  className?: string;
  size?: 'sm' | 'md';
  length?: 'short' | 'long';
  hashSum: string;
  href?: string;
}

const MemberHash: React.FC<MemberHashProps> = ({
  href,
  hashSum,
  size = 'md',
  length = 'long',
  className,
}: MemberHashProps) => {
  const classNames = cn(s.root, s[size], s[length], className);
  const shortHash = `${hashSum.slice(0, 6)}...${hashSum.slice(-4)}`;

  return (
    <a
      href={href}
      target="_blank"
      referrerPolicy="no-referrer"
      className={classNames}
      rel="noreferrer"
    >
      <div className={cn(s.dot, s[size])} />
      <p className={s.hashNum}>{length === 'short' ? shortHash : hashSum}</p>
    </a>
  );
};

export default MemberHash;
