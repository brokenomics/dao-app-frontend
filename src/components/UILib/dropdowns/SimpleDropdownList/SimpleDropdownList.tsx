import React from 'react';
import cn from 'classnames';

import { SimpleDropdownItem } from '../SimpleDropdownItem';

import { onChangeType, OptionProps } from '../types';

import s from './SimpleDropdownList.module.scss';

export interface SimpleDropdownList {
  className?: string;
  options: OptionProps[];
  onChange: onChangeType;
  value: OptionProps;
}

export const SimpleDropdownList: React.FC<SimpleDropdownList> = React.forwardRef(
  ({ className, options, onChange, value, ...rest }, ref) => {
    const divRef = ref as React.LegacyRef<HTMLDivElement>;

    return (
      <div className={cn(s.root, className)} ref={divRef} {...rest}>
        {options.map((opt) => (
          <SimpleDropdownItem
            {...opt}
            onChange={onChange}
            key={opt.id}
            selected={opt.id === value.id}
          />
        ))}
      </div>
    );
  },
);
