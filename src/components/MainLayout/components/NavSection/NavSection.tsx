import React from 'react';

import { NavAccordion } from '../../../UILib';

import s from './NavSection.module.scss';

interface NavSectionProps {
  header: string;
}

export const NavSection: React.FC<NavSectionProps> = ({ header, children }) => (
  <NavAccordion header={header} className={s.root}>
    <ul className={s.menuSection}>{children}</ul>
  </NavAccordion>
);
