import React from 'react';
import cn from 'classnames';

import { Icon } from '../Icon';
import { handleEnterKeyPress } from '../../../utils/keyHandleUtils';

import s from './BackButton.module.scss';

interface BackButtonProps {
  className?: string;
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = (props) => {
  const { children, className, onClick } = props;

  return (
    <div
      tabIndex={0}
      role="button"
      onClick={onClick}
      className={cn(s.backButton, className)}
      onKeyPress={handleEnterKeyPress(onClick)}
    >
      <Icon name="arrow-up" className={s.backIcon} />
      {children}
    </div>
  );
};
