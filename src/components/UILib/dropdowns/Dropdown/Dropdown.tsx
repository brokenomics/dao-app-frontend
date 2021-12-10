import React from 'react';
import cn from 'classnames';
import { merge } from 'lodash';
import { usePopper } from 'react-popper';

import { useOnClickOutside } from 'hooks';
import { BaseDropdownProps } from '../types';

import s from './Dropdown.module.scss';

export interface DropdownProps extends BaseDropdownProps {
  parent: React.ReactElement;
  children: React.ReactElement;
  onOpenUpdate?: (open: boolean) => void;
  forceState?: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any;
  arrow?: boolean;
  arrowClassName?: string;
  showOnHover?: boolean;
  preventOpenThroughParent?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  arrow,
  parent,
  isOpen,
  children,
  options,
  onOpenUpdate,
  arrowClassName,
  showOnHover,
  preventOpenThroughParent,
}) => {
  const [open, setOpen] = React.useState(isOpen);
  const [popperElement, setPopperElement] = React.useState<HTMLElement>();
  const [referenceElement, setReferenceElement] = React.useState<HTMLElement>();

  function openCloseDropdown(e: unknown, isClickOutside: boolean) {
    if (preventOpenThroughParent && !isClickOutside) {
      return;
    }

    setOpen(!open);

    if (onOpenUpdate) {
      onOpenUpdate(!open);
    }
  }

  useOnClickOutside(
    [
      { current: popperElement } as React.RefObject<HTMLElement>,
      { current: referenceElement } as React.RefObject<HTMLElement>,
    ],
    openCloseDropdown,
  );

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    function mouseMoveListener(e: MouseEvent) {
      const path = e.composedPath();

      setOpen(
        path.includes(referenceElement as EventTarget) ||
          path.includes(popperElement as EventTarget),
      );
    }

    if (showOnHover) {
      document.addEventListener('mousemove', mouseMoveListener);
    }

    return () => document.removeEventListener('mousemove', mouseMoveListener);
  }, [showOnHover, popperElement, referenceElement]);

  const opts = merge(
    {
      strategy: 'fixed',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, arrow ? 16 : 8],
          },
        },
      ],
    },
    options,
  );

  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement,
    opts,
  );

  const parentEl = React.cloneElement(parent, {
    ref: setReferenceElement as React.LegacyRef<unknown>,
    onClick: openCloseDropdown,
  });

  function getDropdown() {
    const arrowEl = arrow && (
      <div
        data-popper-arrow
        style={styles.arrow}
        className={cn(s.arrow, arrowClassName)}
        key="arrow"
      />
    );

    return (
      <div
        ref={setPopperElement as React.LegacyRef<HTMLDivElement>}
        style={styles.popper}
        {...attributes.popper}
        className={s.dropdown}
      >
        {arrowEl}
        {children}
      </div>
    );
  }

  return (
    <>
      {parentEl}
      {open && getDropdown()}
    </>
  );
};
