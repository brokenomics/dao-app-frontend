import React from 'react';
import cx from 'classnames';
import s from './Modal.module.scss';

type ModalProps = {
  className?: string;
  children: JSX.Element | JSX.Element[];
};

const Modal: React.FC<ModalProps> = ({ className, children }: ModalProps) => (
  <div className={cx(s.root)}>
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={cx(s.modal, className)}>{children}</div>
      </div>
    </div>
  </div>
);

export default Modal;
