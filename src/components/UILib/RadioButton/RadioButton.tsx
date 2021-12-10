import React from 'react';
import cn from 'classnames';

import s from './RadioButton.module.scss';

export interface RadioButtonProps {
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  id?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  className,
  disabled = false,
  checked = false,
  onChange,
  name,
  value,
  id,
}: RadioButtonProps) => (
  <label
    htmlFor={id}
    className={cn(
      s.root,
      { [s.checked]: checked, [s.disabled]: disabled },
      className,
    )}
  >
    <div className={s.circle} />
    <input
      id={id}
      type="radio"
      className={cn(s.styledRadio, {
        [s.disabled]: disabled,
        [s.checked]: checked,
      })}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      name={name}
      value={value}
      tabIndex={0}
    />
    {checked ? <div className={s.checkMark} /> : null}
  </label>
);

export default RadioButton;
