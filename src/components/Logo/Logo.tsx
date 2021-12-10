import React from 'react';
import classNames from 'classnames';
import styles from './Logo.module.scss';
import logo from '../../images/logo.svg';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => (
  <img
    src={logo}
    alt="New Order Logo"
    className={classNames(styles.logo, className)}
  />
);

export default Logo;
