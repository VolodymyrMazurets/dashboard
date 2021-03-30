import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomeView } from '../views';
import { RouteTypes } from './types';

export const RouterView = () => {
  return (
    <Switch>
      <Route path={RouteTypes.home} component={HomeView} />
    </Switch>
  );
};
