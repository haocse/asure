import React from 'react';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import UserManagement from './user-management';

const Routes = ({ match }) => (
  <div>
    <ErrorBoundaryRoute path={`${match.url}`} component={UserManagement} />
  </div>
);

export default Routes;
