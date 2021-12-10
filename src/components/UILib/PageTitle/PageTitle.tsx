import React from 'react';
import cn from 'classnames';

import s from './PageTitle.module.scss';

interface PageTitleProps {
  className?: string;
  preEl?: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = (props) => {
  const { preEl, children, className } = props;

  return (
    <div className={cn(s.title, className)}>
      {preEl}
      {children}
    </div>
  );
};
