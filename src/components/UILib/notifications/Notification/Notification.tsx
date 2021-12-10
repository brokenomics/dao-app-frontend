import React from 'react';
import cn from 'classnames';

import { HIDE_NOTIFICATION_EVENT } from '../notificationConstants';

import { Icon } from '../../Icon';

import { NOTIFICATION_TYPES, NotificationProps } from '../types';

import { dispatchCustomEvent } from '../../../../utils/eventUtils';

import s from './Notification.module.scss';

export const Notification: React.FC<NotificationProps> = (props) => {
  const { id, tag, flat, type, description } = props;

  const className = cn(s.body, {
    [s.success]: type === NOTIFICATION_TYPES.SUCCESS,
    [s.error]: type === NOTIFICATION_TYPES.ERROR,
    [s.warning]: type === NOTIFICATION_TYPES.WARNING,
    [s.info]: type === NOTIFICATION_TYPES.INFO,
    [s.flat]: flat,
  });

  function getIconName() {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return 'success';
      case NOTIFICATION_TYPES.ERROR:
        return 'error';
      case NOTIFICATION_TYPES.WARNING:
        return 'warning';
      case NOTIFICATION_TYPES.INFO:
        return 'info';
      default:
        return 'info';
    }
  }

  function onCloseClick() {
    dispatchCustomEvent(HIDE_NOTIFICATION_EVENT, { id });
  }

  function renderTag() {
    return tag ? <div className={s.tag}>{tag}</div> : null;
  }

  return (
    <div className={className}>
      <div className={s.header}>
        <div className={s.mainBlock}>
          <Icon name={getIconName()} />
          <div className={s.title}>{type}</div>
          {renderTag()}
        </div>
        <Icon name="close" className={s.closeIcon} onClick={onCloseClick} />
      </div>
      <div className={s.content}>{description}</div>
    </div>
  );
};
