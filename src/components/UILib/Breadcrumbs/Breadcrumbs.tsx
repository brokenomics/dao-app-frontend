import React, { useRef, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { Icon } from '../Icon';

import s from './Breadcrumbs.module.scss';

interface BreadcrumbElement {
  name: string;
  url?: string;
}

export interface BreadcrumbsProps {
  className?: string;
  size?: 'sm' | 'md';
  element: BreadcrumbElement[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  className,
  size = 'sm',
  element,
}: BreadcrumbsProps) => {
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const [isOverflowed, setOverflowed] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('transparent');

  const openCloseTooltip = () => {
    if (isOverflowed) setExpanded(!isExpanded);
  };

  useOnClickOutside(
    [{ current: breadcrumbRef.current } as React.RefObject<HTMLElement>],
    () => setExpanded(false),
  );

  const breadcrumbsElements = element.map((item, i) => (
    <div key={JSON.stringify(item)} className={s.wrapper}>
      {!item.url ? (
        <span className={cn(s.elementName, s[size])}>{item.name}</span>
      ) : (
        <Link
          to={item.url}
          className={cn(s.elementName, s.navElement, s[size])}
        >
          {item.name}
        </Link>
      )}
      {i === element.length - 1 ? null : (
        <Icon name="chevron-right" className={s.chevron} />
      )}
    </div>
  ));

  const backgroundGradient = {
    background: `linear-gradient(90deg, transparent 20%, ${backgroundColor} 84%, ${backgroundColor} 100%)`,
  };

  useLayoutEffect(() => {
    if (breadcrumbRef.current) {
      setOverflowed(
        breadcrumbRef.current.scrollWidth > breadcrumbRef.current.clientWidth,
      );
    }
  }, [element]);

  function setGradientColorToParent(node: HTMLElement) {
    const parent = node.parentNode;
    const parentBackgroundColor = window.getComputedStyle(parent as HTMLElement)
      .backgroundColor;

    if (
      parentBackgroundColor !== 'rgba(0, 0, 0, 0)' &&
      parentBackgroundColor !== 'transparent'
    ) {
      setBackgroundColor(parentBackgroundColor);

      return parentBackgroundColor;
    }

    setGradientColorToParent(parent as HTMLElement);

    return parentBackgroundColor;
  }

  useLayoutEffect(() => {
    setGradientColorToParent(breadcrumbRef.current as HTMLElement);
  });

  return (
    <div
      className={cn(
        s.root,
        {
          [s.sm]: size === 'sm',
          [s.md]: size === 'md',
        },
        className,
      )}
    >
      <div
        className={cn(s.container, {
          [s.expanded]: isExpanded,
        })}
        ref={breadcrumbRef}
      >
        {breadcrumbsElements}
        {isOverflowed && !isExpanded ? (
          <div className={s.gradient} style={backgroundGradient} />
        ) : null}
        {isOverflowed && (
          <Icon
            name="arrow-downward"
            className={cn(s.expandIcon, { [s.upward]: isExpanded })}
            onClick={openCloseTooltip}
          />
        )}
      </div>
    </div>
  );
};

export default Breadcrumbs;
