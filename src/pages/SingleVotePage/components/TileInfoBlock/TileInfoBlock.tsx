import React from 'react';
import cn from 'classnames';

import s from './TileInfoBlock.module.scss';

interface TileInfoBlockProps {
  title: string;
  className?: string;
}

export const TileInfoBlock: React.FC<TileInfoBlockProps> = (props) => {
  const { title, className, children } = props;

  return (
    <div className={cn(s.root, className)}>
      <div className={s.title}>{title}</div>
      <div>{children}</div>
    </div>
  );
};
