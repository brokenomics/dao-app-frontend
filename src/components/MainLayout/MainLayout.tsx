import React from 'react';
import SimpleBar from 'simplebar-react';

// import { ReactComponent as Logo } from 'images/logo.svg';

// import { Balance } from 'components/Balance';
import { SocialMediaBlock } from 'components/SocialMediaBlock';
import { WalletWidget } from 'components/WalletWidget';
import Logo from '../Logo/Logo';
import { NavMenuItem } from './components/NavMenuItem';
import { NavSection } from './components/NavSection';
import { CoverScreen } from './components/CoverScreen';

import { ROUTES } from '../../constants/routingConstants';
import { HEADER_ID, CONTENT_ID } from '../../constants/layoutConstants';

import s from './MainLayout.module.scss';

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div className={s.root}>
    <CoverScreen />
    <SimpleBar className={s.panelContainer}>
      <aside className={s.panel}>
        <div className={s.panelTop}>
          <div className={s.logoSection}>
            <a href="/" className={s.logoLink}>
              <Logo className={s.logo} />
            </a>
          </div>
          <nav>
            <NavSection header="DAO">
              <NavMenuItem iconName="home" to={ROUTES.HOME}>
                Home
              </NavMenuItem>
              <NavMenuItem
                iconName="voting"
                to={ROUTES.VOTING}
                altTo={[ROUTES.SINGLE_VOTE]}
              >
                Voting
              </NavMenuItem>
              {/* <NavMenuItem iconName="members">Members</NavMenuItem> */}
              {/* <NavMenuItem iconName="dao-token">DAO Token</NavMenuItem> */}
              <NavMenuItem iconName="airdrops" to={ROUTES.AIRDROPS}>
                Airdrops
              </NavMenuItem>
              {/* <NavMenuItem iconName="finance">Finance</NavMenuItem> */}
            </NavSection>

            <NavSection header="Marketplace">
              <NavMenuItem iconName="members" to={ROUTES.INVEST}>
                Vault
              </NavMenuItem>
            </NavSection>

            {/* <NavSection header="Settings"> */}
            {/*   <NavMenuItem iconName="permissions">Permissions</NavMenuItem> */}
            {/*   <NavMenuItem iconName="notifications">Notifications</NavMenuItem> */}
            {/*   <NavMenuItem iconName="labels">Labels</NavMenuItem> */}
            {/*   <NavMenuItem iconName="help">Help center</NavMenuItem> */}
            {/* </NavSection> */}
          </nav>
        </div>
        <footer>
          <SocialMediaBlock className={s.socialMedia} />
        </footer>
      </aside>
    </SimpleBar>
    <SimpleBar className={s.content} id={CONTENT_ID}>
      <header className={s.header} id={HEADER_ID}>
        {/* <Balance balanceAmount={1259.12} fillPercent={30} /> */}
        <WalletWidget />
      </header>
      <main className={s.main}>{children}</main>
    </SimpleBar>
  </div>
);

export default MainLayout;
