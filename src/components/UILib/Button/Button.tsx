import React from 'react';
import cn from 'classnames';

import s from './Button.module.scss';

export type ButtonAvailableElements = 'a' | 'button' | 'div';

export interface ButtonProps {
  children: React.ReactChild;
  variant?: 'regular' | 'outline' | 'monochrome' | 'clear';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  danger?: boolean;
  className?: string;
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
  leftElement?: React.ReactChild | null;
  rightElement?: React.ReactChild | null;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  tagElement?: ButtonAvailableElements;
  uppercase?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  danger = false,
  className,
  children,
  variant = 'regular',
  size = 'md',
  leftElement,
  rightElement,
  onClick,
  type = 'button',
  disabled = false,
  uppercase = false,
  href,
  tagElement,
  ...other
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
  };

  const Element = tagElement || href ? 'a' : 'button';

  const classNames = cn(
    s.root,
    {
      [s.danger]: danger,
      [s.xs]: size === 'xs',
      [s.sm]: size === 'sm',
      [s.md]: size === 'md',
      [s.lg]: size === 'lg',
      [s.xl]: size === 'xl',
      [s.customSize]: size === 'custom',
      [s.variantRegular]: variant === 'regular',
      [s.variantOutline]: variant === 'outline',
      [s.variantMonochrome]: variant === 'monochrome',
      [s.variantClear]: variant === 'clear',
      [s.disabled]: disabled,
      [s.uppercase]: uppercase,
    },
    className,
  );

  return (
    <Element
      className={classNames}
      onClick={handleClick}
      type={!href ? type : undefined}
      disabled={disabled}
      href={href}
      {...other}
    >
      {leftElement && (
        <>
          <div className={s.leftElement}>{leftElement}</div>
          &nbsp;
        </>
      )}
      <div className={s.content}>{children}</div>
      {rightElement && (
        <>
          &nbsp;
          <div className={s.rightElement}>{rightElement}</div>
        </>
      )}
    </Element>
  );
};

export default Button;
