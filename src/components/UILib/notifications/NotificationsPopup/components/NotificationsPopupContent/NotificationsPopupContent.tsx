import React from 'react';
import { isEmpty } from 'lodash';

import { Icon } from '../../../../Icon';

import { NotificationRawData } from '../../../types';

import s from './NotificationsPopupContent.module.scss';
import { Notification } from '../../../Notification';

interface NotificationsPopupContentProps {
  notifications: NotificationRawData[];
}

export const NotificationsPopupContent: React.FC<NotificationsPopupContentProps> = ({
  notifications,
}) => {
  if (isEmpty(notifications)) {
    return (
      <div className={s.noDataBody}>
        <Icon name="bell-dotted" className={s.bell} />
        No new notifications
      </div>
    );
  }

  return (
    <div>
      {notifications.map((noty, index) => {
        const props = {
          id: index.toString(),
          ...noty,
          flat: true,
          timestamp: new Date().getTime(),
        };

        return <Notification {...props} />;
      })}
    </div>
  );
};
