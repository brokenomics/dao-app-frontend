import React from 'react';
import cn from 'classnames';

import { TWITTER_IFRAME_SIZE_UPDATE } from '../../../../constants/eventConstants';

import { NewsTileTitle } from '../NewsTileTitle';
import { TagButton, TileContainer } from '../../../../components/UILib';

import s from './TwitterFeed.module.scss';

enum SECTIONS {
  DEFI,
  OTHER,
}

interface TwitterFeedProps {
  className?: string;
}

interface TwitterResizeEvent extends CustomEvent {
  detail: number;
}

const TIMELINE_EL_ID = 'timeline';

export const TwitterFeed: React.FC<TwitterFeedProps> = ({ className }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [section, setSection] = React.useState(SECTIONS.DEFI);

  function twitterResize(e: TwitterResizeEvent) {
    const twitterIframe = document.querySelector('[id*=twitter-widget]');

    if (twitterIframe) {
      const style = twitterIframe.getAttribute('style');

      twitterIframe.setAttribute('style', `${style} height: ${e.detail}px;`);
      twitterIframe.setAttribute('crossorigin', 'anonymous');
    }
  }

  React.useEffect(() => {
    if (!loaded) {
      window.twttr.widgets
        .createTimeline(
          {
            sourceType: 'profile',
            screenName: 'neworderdao',
          },
          document.getElementById(TIMELINE_EL_ID),
          {
            theme: 'dark',
          },
        )
        .then(() => {
          const options = {
            url: '/twitter.css',
          };

          window.CustomizeTwitterWidget(options);
          setLoaded(true);
        });

      document.addEventListener(
        TWITTER_IFRAME_SIZE_UPDATE,
        twitterResize as EventListener,
        false,
      );
    }
  }, [loaded]);

  function renderTitle() {
    return (
      <NewsTileTitle icon="square-twitter" title="Twitter Feed">
        <TagButton
          badge
          uppercase
          color="green"
          active={section === SECTIONS.DEFI}
          onClick={() => setSection(SECTIONS.DEFI)}
        >
          New Order
        </TagButton>
      </NewsTileTitle>
    );
  }

  return (
    <TileContainer
      title={renderTitle()}
      size="md"
      contentClassName={s.body}
      className={className}
    >
      <div id={TIMELINE_EL_ID} className={cn({ [s.hidden]: !loaded })} />
    </TileContainer>
  );
};
