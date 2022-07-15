import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import UserManagement from './user-management';
import UserManagementDetail from './user-management-detail';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:login`} component={UserManagementDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserManagement} />
    </Switch>
  </>
);

export default Routes;
