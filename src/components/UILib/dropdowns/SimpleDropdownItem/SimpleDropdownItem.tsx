import React from 'react';
import cn from 'classnames';

import { onChangeType, OptionProps } from '../types';

import { handleEnterKeyPress } from '../../../../utils/keyHandleUtils';

import s from './SimpleDropdownItem.module.scss';

export interface SimpleDropdownItem extends OptionProps {
  className?: string;
  selected?: boolean;
  onChange: onChangeType;
}

export const SimpleDropdownItem: React.FC<SimpleDropdownItem> = ({
  className,
  onChange,
  id,
  value,
  label,
  selected,
}) => {
  function onClick() {
    onChange({ id, value, label });
  }

  const itemClassName = cn(s.root, className, {
    [s.selected]: selected,
  });

  return (
    <div
      role="button"
      className={itemClassName}
      tabIndex={0}
      onClick={onClick}
      onKeyPress={handleEnterKeyPress(onClick)}
    >
      {label}
    </div>
  );
};
