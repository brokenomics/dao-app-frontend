import React from 'react';
import cn from 'classnames';

import Icon, { IconProps } from '../Icon/Icon';

import s from './TagButton.module.scss';

export interface TagButtonProps {
  children: React.ReactChild;
  color?: 'gold' | 'grape' | 'silver' | 'red' | 'green';
  size?: 'sm' | 'md';
  className?: string;
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
  tail?: string;
  icon?: IconProps['name'];
  uppercase?: boolean;
  href?: string;
  badge?: boolean;
  active?: boolean;
}

interface Attributes {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
  href?: string;
}

const TagButton: React.FC<TagButtonProps> = ({
  className,
  children,
  onClick,
  size = 'md',
  uppercase = false,
  tail,
  color = 'grape',
  icon,
  href,
  badge,
  active,
}) => {
  const attrs: Attributes = {};
  let Element: 'button' | 'div' | 'a' = 'button';

  if (onClick) {
    attrs.onClick = onClick;
  }

  if (badge) {
    Element = 'div';
  }

  if (href) {
    Element = 'a';
    attrs.href = href;
  }

  if (Element === 'button') {
    attrs.type = 'button';
  }

  const classNames = cn(
    s.root,
    s[size],
    s[color],
    { [s.uppercase]: uppercase, [s.active]: active, [s.badge]: badge },
    className,
  );

  const iconElement = icon && <Icon className={s.icon} name={icon} />;

  const tailElement = tail && (
    <>
      &nbsp;
      <span className={s.tail}>{tail}</span>
    </>
  );

  return (
    <Element className={classNames} {...attrs}>
      {iconElement}
      <span>
        {children}
        {tailElement}
      </span>
    </Element>
  );
};

export default TagButton;
