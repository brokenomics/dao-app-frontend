import React from 'react';
import cn from 'classnames';
import { some } from 'lodash';
import { Link, matchPath, useLocation } from 'react-router-dom';

import { ReactComponent as Marker } from '../../../../icons/marker.svg';

import { IconNamesType } from '../../../UILib/Icon/Icon';

import { Icon } from '../../../UILib';

import s from './NavMenuItem.module.scss';

interface NavMenuItemProps {
  to: string;
  disabled?: boolean;
  iconName: IconNamesType;
  altTo?: string[];
}

export const NavMenuItem: React.FC<NavMenuItemProps> = ({
  to,
  altTo,
  disabled,
  children,
  iconName,
}) => {
  const location = useLocation();

  function isActive() {
    function pathMatches(path: string) {
      return (matchPath(location.pathname, { path }) || {}).isExact;
    }

    return pathMatches(to) || some(altTo, pathMatches);
  }

  const rootClassName = cn(s.menuItem, {
    [s.active]: isActive(),
    [s.disabled]: disabled,
  });

  return (
    <li className={rootClassName}>
      {isActive() && <Marker className={s.marker} />}
      <Link to={to || '/'} className={s.link}>
        <Icon name={iconName} className={s.menuIcon} />
        <span className={s.menuElement}>{children}</span>
      </Link>
    </li>
  );
};
