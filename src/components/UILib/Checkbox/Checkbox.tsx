import React from 'react';
import cn from 'classnames';

import { Icon } from '../Icon';

import s from './Checkbox.module.scss';

export interface CheckboxProps {
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  id?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox: React.FC<CheckboxProps> = ({
  className,
  disabled = false,
  checked = false,
  id,
  value,
  onChange,
}: CheckboxProps) => (
  <div>
    <div className={cn(s.checkboxContainer, className)}>
      <label htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          className={s.hiddenCheckbox}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          value={value}
          tabIndex={0}
        />
        <div
          className={cn(s.styledCheckbox, {
            [s.checked]: checked,
            [s.disabled]: disabled,
          })}
          role="checkbox"
          aria-checked={checked}
          aria-disabled={disabled}
        >
          {checked ? <Icon name="check-mark" className={s.checkMark} /> : null}
          <div className={s.circle} />
        </div>
      </label>
    </div>
  </div>
);

export default Checkbox;
