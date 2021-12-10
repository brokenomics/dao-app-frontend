import React from 'react';
import cn from 'classnames';

import { BaseAccordion } from '../BaseAccordion';

import { AccordionProps } from '../types';

import s from './RegularAccordion.module.scss';

export const RegularAccordion: React.FC<AccordionProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <BaseAccordion
      {...rest}
      bodyClassName={s.body}
      headerClassName={s.header}
      className={cn(s.accordion, className)}
    />
  );
};
