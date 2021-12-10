import React from 'react';
import cn from 'classnames';

import { tabsConfig } from './module/tabsConfig';

import { Tabs } from '../../components/UILib/Tabs';

import s from './HomePage.module.scss';

export interface HomePageProps {
  className?: string;
}

const HomePage: React.FC<HomePageProps> = (props) => {
  const { className } = props;

  return (
    <div className={cn(s.root, className)}>
      <Tabs tabs={tabsConfig} className={s.tabs} />
    </div>
  );
};

export default HomePage;
