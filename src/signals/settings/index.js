import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';

import { isAuthenticated } from 'shared/services/auth/auth';

import LoginPage from 'components/LoginPage';

import routes from './routes';
import UsersOverviewContainer from './users/containers/Overview';
import UsersDetailContainer from './users/containers/Detail';

export const SettingsModule = () => {
  const moduleLocation = useLocation();
  const [location, setLocation] = useState(moduleLocation);

  // subscribe to updates and set the referrer when page URLs differ
  useEffect(() => {
    if (location.pathname !== moduleLocation.pathname) {
      const locWithReferrer = {
        ...moduleLocation,
        referrer: location.pathname,
      };

      setLocation(locWithReferrer);
    }
  });

  if (isAuthenticated() === false) {
    return <Route component={LoginPage} />;
  }

  return (
    <Switch location={location}>
      {/*
       * always redirect from /gebruikers to /gebruikers/page/1 to avoid having complexity
       * in the UsersOverviewContainer component
       */}
      <Redirect
        exact
        from={routes.users}
        to={routes.usersPaged.replace(':pageNum', 1)}
      />
      <Route path={routes.usersPaged} component={UsersOverviewContainer} />
      <Route exact path={routes.user} component={UsersDetailContainer} />
    </Switch>
  );
};

export default SettingsModule;
