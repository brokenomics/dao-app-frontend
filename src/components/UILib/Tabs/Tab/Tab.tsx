import React from 'react';
import cn from 'classnames';

import { TabOption } from '../types';

import { handleEnterKeyPress } from '../../../../utils/keyHandleUtils';

import s from './Tab.module.scss';

interface TabProps {
  tab: TabOption;
  active?: boolean;
  size?: 'sm' | 'md';
  onClick: (tab: TabOption) => void;
}

export const Tab: React.FC<TabProps> = ({ size, tab, active, onClick }) => {
  const { label, disabled } = tab;

  function changeTab() {
    onClick(tab);
  }

  const className = cn(s.tab, {
    [s.active]: active,
    [s.disabled]: disabled,
    [s.small]: size === 'sm',
  });

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={changeTab}
      className={className}
      onKeyPress={handleEnterKeyPress(changeTab)}
    >
      {label}
      {disabled && <div className={s.comingSoon}>Coming soon</div>}
    </div>
  );
};
