import React from 'react';

import { Icon, IconNamesType } from '../../../../components/UILib';

import s from './NewsTileTitle.module.scss';

interface NewsTileTitleProps {
  title: string;
  icon: IconNamesType;
}

export const NewsTileTitle: React.FC<NewsTileTitleProps> = ({
  icon,
  title,
  children,
}) => (
  <div className={s.title}>
    <Icon name={icon} className={s.icon} />
    <span>{title}</span>
    <div className={s.tags}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          className: s.tag,
        }),
      )}
    </div>
  </div>
);
