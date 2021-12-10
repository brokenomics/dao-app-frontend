import React from 'react';
import cn from 'classnames';

import icons from 'icons';

import s from './Icon.module.scss';

export type IconNamesType = keyof typeof icons;

export interface IconProps extends React.HTMLAttributes<SVGElement> {
  className?: string;
  name: IconNamesType;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const Icon: React.FC<IconProps> = ({ className, name, onClick, ...other }) => (
  <svg className={cn(s.root, className)} onClick={onClick} {...other}>
    <use
      xlinkHref={`${process.env.PUBLIC_URL}/sprite-icons.svg#${String(name)}`}
    />
  </svg>
);

export default Icon;
