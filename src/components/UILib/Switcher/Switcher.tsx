import React, { useState } from 'react';
import cn from 'classnames';

import s from './Switcher.module.scss';

export interface SwitcherProps {
  className?: string;
  name?: string;
  onCheck?: (value: boolean) => void;
  defaultState?: boolean;
  options: [string, string];
}

const Switcher: React.FC<SwitcherProps> = ({
  className,
  name,
  onCheck,
  defaultState,
  options,
}) => {
  const id = `switcher-${name}`;

  const [checked, setChecked] = useState(defaultState);

  const toggle = () => {
    const value = !checked;

    setChecked(!checked);

    if (onCheck) {
      onCheck(value);
    }
  };

  return (
    <button className={cn(s.root, className)} onClick={toggle}>
      <input
        className={s.checkbox}
        type="checkbox"
        id={id}
        hidden
        checked={checked}
        readOnly
      />
      <div className={s.options}>
        <div className={s.option}>{options[0]}</div>
        <div className={s.option}>{options[1]}</div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <div className={s.slider} />
    </button>
  );
};

export default Switcher;
