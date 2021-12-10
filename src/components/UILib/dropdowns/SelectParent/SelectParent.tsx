import React from 'react';
import cn from 'classnames';
import { isString } from 'lodash';

import { Icon } from '../../Icon';

import s from './SelectParent.module.scss';

export interface SelectParentProps {
  className?: string;
  valueOnly?: boolean;
  value: string | number | React.ReactNode;
  label?: React.ReactNode;
  open: boolean | undefined;
  hideArrow?: boolean;
}

export const SelectParent = React.forwardRef(
  (props: SelectParentProps, ref) => {
    const divRef = ref as React.LegacyRef<HTMLDivElement>;

    const {
      open,
      value,
      label,
      valueOnly,
      className,
      hideArrow,
      ...rest
    } = props;

    const rootClassName = cn(s.root, className, {
      [s.valueOnly]: valueOnly,
    });

    const arrowClassName = cn({
      [s.closed]: !open,
      [s.hidden]: hideArrow,
    });

    let selectLabel = label;

    if (isString(label)) {
      selectLabel = label ? `${label}:` : '';
    }

    return (
      <div className={rootClassName} ref={divRef} {...rest}>
        <div className={s.label}>{selectLabel}</div>
        <div className={s.value}>{value}</div>
        <Icon name="arrow-up" className={arrowClassName} />
      </div>
    );
  },
);
