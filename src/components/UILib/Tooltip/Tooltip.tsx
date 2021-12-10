import React from 'react';

import { Dropdown } from '../dropdowns/Dropdown';

import s from './Tooltip.module.scss';

export interface TooltipProps {
  parent: React.ReactElement;
  tooltip: React.ReactNode;
  showOnClick?: boolean;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const { parent, tooltip, showOnClick } = props;

  return (
    <Dropdown
      arrow
      parent={parent}
      arrowClassName={s.arrow}
      showOnHover={!showOnClick}
    >
      <div className={s.tooltipBody}>{tooltip}</div>
    </Dropdown>
  );
};

export default Tooltip;
