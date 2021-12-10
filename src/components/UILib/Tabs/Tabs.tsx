import React from 'react';
import cn from 'classnames';

import { Tab } from './Tab';

import { TabOption } from './types';

import s from './Tabs.module.scss';

export interface TabsProps {
  className?: string;
  tabs: TabOption[];
  size?: 'sm' | 'md';
}

const Tabs: React.FC<TabsProps> = ({ tabs, size = 'md', className }) => {
  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  return (
    <div className={cn(s.root, className)}>
      <div className={s.tabs}>
        {tabs.map((tab) => {
          const { id } = tab;

          return (
            <Tab
              size={size}
              onClick={setActiveTab}
              tab={tab}
              key={id}
              active={activeTab.id === id}
            />
          );
        })}
      </div>
      <div className={s.content}>{activeTab.content}</div>
    </div>
  );
};

export default Tabs;
