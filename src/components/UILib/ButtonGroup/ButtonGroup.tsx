import React from 'react';
import cn from 'classnames';

import { Button, ButtonProps } from '../Button';

import s from './ButtonGroup.module.scss';

export interface LabelProps {
  text: string;
  color?: 'green' | 'red';
}

export interface ButtonElementProps {
  onClick?: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
  className?: string;
  text: string;
  label?: LabelProps;
}

export interface ButtonGroupProps {
  className?: string;
  buttons: ButtonElementProps[];
  inactive?: boolean;
  disabled?: boolean;
  uppercase?: boolean;
  size?: ButtonProps['size'];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  className,
  buttons,
  inactive = false,
  disabled = false,
  size = 'sm',
  uppercase = false,
}) => {
  const renderButton = (index: number) => {
    const { className: buttonClassName, text, label, onClick } = buttons[index];

    const labelElement = label ? (
      <span
        className={cn(s.label, {
          [s.labelGreen]: label.color === 'green',
          [s.labelRed]: label.color === 'red',
        })}
      >
        {label.text}
      </span>
    ) : null;

    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      if (onClick) {
        onClick(e);
      }
    };

    const buttonClassNames = cn(s.button, buttonClassName);

    return (
      <Button
        size={size}
        variant="outline"
        onClick={handleClick}
        className={buttonClassNames}
        uppercase={uppercase}
        rightElement={labelElement}
        disabled={disabled || inactive}
      >
        {text}
      </Button>
    );
  };

  const classNames = cn(
    s.root,
    { [s.inactive]: inactive, [s.disabled]: disabled },
    className,
  );

  return (
    <div className={classNames}>
      {buttons.map((key, index) => renderButton(index))}
      {/* {renderButton(0)}
      {renderButton(1)} */}
    </div>
  );
};

export default ButtonGroup;
