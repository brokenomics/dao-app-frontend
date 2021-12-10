import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';

import { HEADER_ID, CONTENT_ID } from 'constants/layoutConstants';
import { getScrollElementById } from 'utils';
import {
  SHOW_NOTIFICATION_EVENT,
  HIDE_NOTIFICATION_EVENT,
  HIDE_NOTIFICATION_EVENT_BY_TAG,
} from '../notificationConstants';
import { Notification } from '../Notification';

import {
  HideNotificationEvent,
  HideNotificationByTagEvent,
  NotificationProps,
  ShowNotificationEvent,
} from '../types';

import s from './NotificationContainer.module.scss';

export const NotificationContainer: React.FC = () => {
  const noties = React.useRef<NotificationProps[]>([]);
  const idStorage = React.useRef<number>(0);

  const [styles, setStyles] = useState({});
  const [notifications, setNotifications] = React.useState<NotificationProps[]>(
    [],
  );

  useEffect(() => {
    function addNotification(e: ShowNotificationEvent) {
      const noty = {
        ...e.detail,
        id: idStorage.current.toString(),
        timestamp: new Date().getTime(),
      };

      idStorage.current += 1;

      noties.current = noties.current.concat(noty);
    }

    document.addEventListener(
      SHOW_NOTIFICATION_EVENT,
      addNotification as EventListener,
    );

    return () =>
      document.removeEventListener(
        SHOW_NOTIFICATION_EVENT,
        addNotification as EventListener,
      );
  }, []);

  useEffect(() => {
    function removeNotification(e: HideNotificationEvent) {
      const { id } = e.detail;

      noties.current = noties.current.filter((noty) => noty.id !== id);
    }

    function removeNotificationByTag(e: HideNotificationByTagEvent) {
      const { tag } = e.detail;

      noties.current = noties.current.filter((noty) => noty.tag !== tag);
    }

    document.addEventListener(
      HIDE_NOTIFICATION_EVENT,
      removeNotification as EventListener,
    );

    document.addEventListener(
      HIDE_NOTIFICATION_EVENT_BY_TAG,
      removeNotificationByTag as EventListener,
    );

    return () => {
      document.removeEventListener(
        HIDE_NOTIFICATION_EVENT,
        removeNotification as EventListener,
      );

      document.removeEventListener(
        HIDE_NOTIFICATION_EVENT_BY_TAG,
        removeNotificationByTag as EventListener,
      );
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      noties.current = noties.current.filter((noty) => {
        const { lifetime, timestamp } = noty;

        return !lifetime || new Date().getTime() - timestamp < lifetime;
      });
      setNotifications(noties.current);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const scrollableEl = getScrollElementById(CONTENT_ID);
    const headerEl = document.getElementById(HEADER_ID);

    function onScroll() {
      const headerHeight = headerEl?.offsetHeight || 0;
      const scrollTop = scrollableEl?.scrollTop || 0;
      const topOffset = scrollTop > headerHeight ? 0 : headerHeight - scrollTop;

      setStyles({
        top: topOffset,
        maxHeight: `calc(100vh - ${topOffset}px)`,
      });
    }

    onScroll();

    const debouncedOnScroll = debounce(onScroll, 10);

    scrollableEl?.addEventListener('scroll', debouncedOnScroll);

    return () => scrollableEl?.removeEventListener('scroll', debouncedOnScroll);
  }, []);

  function renderNotifications() {
    return notifications.map((noty) => {
      const { id } = noty;

      return <Notification {...noty} key={id} />;
    });
  }

  return (
    <div className={s.body} style={styles}>
      {renderNotifications()}
    </div>
  );
};
