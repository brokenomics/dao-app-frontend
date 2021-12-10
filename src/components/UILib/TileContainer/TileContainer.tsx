import React from 'react';
import SimpleBar from 'simplebar-react';
import cn from 'classnames';

import s from './TileContainer.module.scss';

interface LayoutTileProps {
  className?: string;
  bodyClassName?: string;
  contentClassName?: string;
  title: React.ReactNode;
  size?: 'sm' | 'md';
}

export const TileContainer: React.FC<LayoutTileProps> = ({
  title,
  children,
  className,
  bodyClassName,
  contentClassName,
  size = 'sm',
}) => {
  const rootClassName = cn(s.root, className, {
    [s.md]: size === 'md',
  });

  return (
    <div className={rootClassName}>
      <div className={s.header}>{title}</div>
      <div className={cn(s.body, bodyClassName)}>
        <SimpleBar className={cn(s.content, bodyClassName, contentClassName)}>
          {children}
        </SimpleBar>
      </div>
    </div>
  );
};
