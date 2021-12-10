import React from 'react';
import cn from 'classnames';

import s from './LabelButton.module.scss';

export interface LabelButtonProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const LabelButton: React.FC<LabelButtonProps> = ({
  onClick,
  className,
  children,
  disabled = false,
}) => (
  <button
    className={cn(s.root, { [s.disabled]: disabled }, className)}
    onClick={onClick}
  >
    <span className={s.content}>{children}</span>
  </button>
);

export default LabelButton;
