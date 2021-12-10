import React from 'react';
import cn from 'classnames';

import { ReactComponent as SpinnerComplete } from 'images/loader.svg';
import s from './Spinner.module.scss';

export interface SpinnerProps {
  className?: string;
  complete?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ className, complete = false }) => (
  <div className={cn(s.root, className)}>
    <div
      className={cn(s.spinner, {
        [s.complete]: complete,
      })}
    >
      <SpinnerComplete className={cn(s.circle, s.left)} />
      <SpinnerComplete
        className={cn(s.circle, s.right, {
          [s.complete]: complete,
        })}
      />
    </div>
    <div
      className={cn(s.checkMark, {
        [s.draw]: complete,
      })}
    />
  </div>
);

export default Spinner;
