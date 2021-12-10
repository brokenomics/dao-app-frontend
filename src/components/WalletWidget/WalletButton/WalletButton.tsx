import React from 'react';
import cn from 'classnames';

import { Button, ButtonProps } from 'components/UILib';

import s from './WalletButton.module.scss';

export interface WalletButtonProps
  extends Pick<ButtonProps, 'onClick' | 'children' | 'disabled'> {
  className?: string;
  logo: string;
  name: string;
}

const WalletButton: React.FC<WalletButtonProps> = ({
  className,
  logo,
  name,
  children,
  ...buttonProps
}) => (
  <Button size="lg" className={cn(s.root, className)} {...buttonProps}>
    <div className={s.container}>
      <img className={s.logo} src={logo} alt={name} />
      <span className={s.label}>{children}</span>
    </div>
  </Button>
);

export default WalletButton;
