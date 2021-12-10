import React from 'react';

import { Icon } from '../../Icon';
import { Button } from '../../Button';
import { Dropdown } from '../../dropdowns/Dropdown';
import { NotificationsPopupContent } from './components/NotificationsPopupContent';

import { NotificationRawData } from '../types';
import { BaseDropdownProps } from '../../dropdowns/types';

import { notifications } from '../mock';

import s from './NotificationsPopup.module.scss';

export const NotificationsPopup: React.FC<BaseDropdownProps> = (props) => {
  const noties: NotificationRawData[] = notifications;

  const { isOpen } = props;

  function renderParent() {
    return (
      <div className={s.root}>
        <Icon name="bell" />
      </div>
    );
  }

  function renderPopup() {
    return (
      <div className={s.popup}>
        <div className={s.header}>
          <Button size="xs" variant="monochrome">
            Mark all as read
          </Button>
        </div>
        <div className={s.body}>
          <NotificationsPopupContent notifications={noties} />
        </div>
      </div>
    );
  }

  return (
    <Dropdown
      arrow
      arrowClassName={s.arrow}
      isOpen={isOpen}
      parent={renderParent()}
      options={{
        placement: 'bottom-start',
      }}
    >
      {renderPopup()}
    </Dropdown>
  );
};
