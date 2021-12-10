import React from 'react';
import Logo from 'components/Logo/Logo';

import Dots from './assets/Dots.svg';
import Reload from './assets/Reload.svg';
import AA from './assets/AA.svg';

import s from './CoverScreen.module.scss';

export const CoverScreen: React.FC = () => (
  <div className={s.root}>
    <Logo className={s.logo} />
    <div className={s.header}>
      At present our service works only on a desktop.
    </div>
    <div className={s.infoLine}>
      You can display our service as on a desktop in your browser settings:
    </div>

    <div className={s.message}>
      <span className={s.browser}>Google Chrome:&nbsp;</span> check “Desktop
      site” in the browser menu
      <img src={Dots} alt="dots" className={s.icon} />
    </div>

    <div className={s.message}>
      <span className={s.browser}>Safari:&nbsp;</span> tap and hold on the icon
      <img src={Reload} alt="reload" className={s.icon} />
      for iOS 12 and below or tap icon
      <img src={AA} alt="aA" className={s.icon} />
      for iOS 13 and above.
    </div>

    <div className={s.message}>Then select “Request Desktop Site/Website”.</div>
  </div>
);
