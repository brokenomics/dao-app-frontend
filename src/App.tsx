import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Redirect,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';

import { ModalProvider } from 'components/Modal';
import { Web3Provider } from 'components/Web3Provider';
import { ROUTES } from './constants/routingConstants';
import { TWITTER_IFRAME_SIZE_UPDATE } from './constants/eventConstants';

import {
  HomePage,
  // UILibPage,
  VotingPage,
  // InvestPage,
  SingleVotePage,
  AirdropsPage,
} from './pages';
import { DataFetch } from './components/DataFetch';
import { MainLayout } from './components/MainLayout';
import { NotificationContainer } from './components/UILib/notifications';

import { store } from './store';

import 'normalize.css/normalize.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'simplebar/dist/simplebar.min.css';
import './styles/main.scss';

/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    ethereum: any;
    web3: any;
    twttr: any;
    CustomizeTwitterWidget: any;
    triggerTwitterResizeEvent: (size: number) => void;
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */

window.triggerTwitterResizeEvent = (size) => {
  document.dispatchEvent(
    new CustomEvent(TWITTER_IFRAME_SIZE_UPDATE, { detail: size }),
  );
};

interface RouteInfo extends RouteProps {
  path: string;
  component: React.FC;
  exact?: boolean;
}

const routes: RouteInfo[] = [
  {
    path: ROUTES.HOME,
    component: HomePage,
    exact: true,
  },
  {
    path: ROUTES.AIRDROPS,
    component: AirdropsPage,
    exact: true,
  },
  {
    path: ROUTES.VOTING,
    component: VotingPage,
    exact: true,
  },
  {
    path: ROUTES.SINGLE_VOTE,
    component: SingleVotePage,
  },
  // {
  //   path: ROUTES.INVEST,
  //   component: InvestPage,
  // },
];

export const App: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Web3Provider>
        <ModalProvider>
          <DataFetch />
          <MainLayout>
            <Switch>
              {routes.map((route) => (
                <Route key={route.path} {...route} />
              ))}
              <Route path="*" component={() => <Redirect to={ROUTES.HOME} />} />
            </Switch>
          </MainLayout>
          <NotificationContainer />
        </ModalProvider>
      </Web3Provider>
    </Provider>
  </BrowserRouter>
);
