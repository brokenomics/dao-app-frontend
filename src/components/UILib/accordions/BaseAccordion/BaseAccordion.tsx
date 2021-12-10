import React, { useRef, useEffect } from 'react';
import cn from 'classnames';

import { handleEnterKeyPress } from 'utils/keyHandleUtils';
import { Icon } from '../../Icon';

import { AccordionBaseProps } from '../types';

import s from './BaseAccordion.module.scss';

export const BaseAccordion: React.FC<AccordionBaseProps> = (props) => {
  const {
    header,
    isOpen,
    children,
    className,
    bodyClassName,
    arrowClassName,
    headerClassName,
    animated = false,
    tabIndex = 0,
    animationDuration = 300,
  } = props;

  const [open, setOpen] = React.useState(isOpen);
  const [height, setHeight] = React.useState<number | null>(null);

  const contentEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentEl) {
      setHeight(contentEl.current?.offsetHeight || null);
    }
  }, [contentEl]);

  function handleClick() {
    setOpen(!open);

    if (contentEl) {
      setHeight(contentEl.current?.offsetHeight || null);
    }
  }

  return (
    <div
      className={cn(s.accordion, className)}
      aria-expanded={open}
      style={animated ? { transitionDuration: `${animationDuration}ms` } : {}}
    >
      <div
        tabIndex={tabIndex}
        role="button"
        onKeyPress={handleEnterKeyPress(handleClick)}
        onClick={handleClick}
        className={cn(s.header, headerClassName)}
      >
        {header}
        <Icon
          name="arrow-up"
          aria-hidden="true"
          className={cn(s.arrow, arrowClassName)}
        />
      </div>
      <div
        className={cn(s.body, bodyClassName)}
        style={open && height ? { maxHeight: `${height}px` } : {}}
      >
        <div className={s.content} ref={animated ? contentEl : null}>
          {children}
        </div>
      </div>
    </div>
  );
};
