import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardWrapper from '../../components/Dashboard/Wrapper';

import { dashboardRoutes } from '../../routes'

const Dashboard: React.FC = () => {
   return (
      <DashboardWrapper>
         <Switch>
            <Route
               path={dashboardRoutes.registeredOrphanages}
               exact
               component={() => <h2>Registered Orphanages!</h2>}
            />
            <Route
               path={dashboardRoutes.pendingOrphanages}
               exact
               component={() => <h2>Pending Orphanages!</h2>}
            />
         </Switch>
      </DashboardWrapper>
   )
}

export default Dashboard