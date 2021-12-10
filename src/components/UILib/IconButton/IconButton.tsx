import React from 'react';
import cn from 'classnames';

import icons from 'icons';
import { Icon } from '../Icon';
import Button, { ButtonProps } from '../Button/Button';

import s from './IconButton.module.scss';

export interface IconButtonProps
  extends Omit<ButtonProps, 'children' | 'leftElement' | 'rightElement'> {
  iconClassName?: string;
  icon: keyof typeof icons;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconClassName,
  icon,
  className,
  size = 'md',
  ...props
}: IconButtonProps) => (
  <Button className={cn(s.button, s[size], className)} size={size} {...props}>
    <Icon className={cn(s.icon, iconClassName)} name={icon} />
  </Button>
);

export default IconButton;
