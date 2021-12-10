import React from 'react';
import cn from 'classnames';

import { BaseAccordion } from '../BaseAccordion';

import { AccordionProps } from '../types';

import s from './NavAcordion.module.scss';

export const NavAccordion: React.FC<AccordionProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <BaseAccordion
      isOpen
      {...rest}
      arrowClassName={s.arrow}
      headerClassName={s.header}
      className={cn(s.accordion, className)}
      animated
    />
  );
};
