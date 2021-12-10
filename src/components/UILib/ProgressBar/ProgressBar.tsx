import cn from 'classnames';
import { isFinite } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import s from './ProgressBar.module.scss';

export interface ProgressBarProps {
  progress: number;
  className?: string;
  runningClassName?: string;
  minValue?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  minValue,
  className,
  runningClassName,
}) => {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);

  const [labelStyles, setLabelStyles] = useState({});

  const progressClassName = cn(s.progress, className, {
    [s.mivValue]: isFinite(minValue),
  });

  useEffect(() => {
    const rootEl = root.current;
    const labelEl = label.current;

    if (rootEl && labelEl) {
      const width = labelEl.offsetWidth || 0;
      let left: string | number =
        (rootEl.offsetWidth / 100) * (minValue || 0) - width / 2;

      left = left < 0 ? 0 : `calc(${minValue}% - ${width / 2}px)`;

      setLabelStyles({ left });
    }
  }, [minValue]);

  function renderLabel() {
    if (isFinite(minValue)) {
      return (
        <div className={s.labelLine}>
          <div ref={label} className={s.label} style={labelStyles}>
            {`>${minValue} needed`}
          </div>
        </div>
      );
    }

    return null;
  }

  return (
    <div className={s.root} ref={root}>
      <div className={progressClassName}>
        <div
          className={cn(
            s.runningLine,
            { [s.full]: progress >= 100 },
            runningClassName,
          )}
          style={{ width: `${progress}%` }}
        />
        {minValue && (
          <div className={s.minValueBorder} style={{ left: `${minValue}%` }} />
        )}
      </div>
      {renderLabel()}
    </div>
  );
};
