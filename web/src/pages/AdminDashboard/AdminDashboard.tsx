import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NestedSidebarLayout from '../../components/Dashboard/NestedSidebarLayout';
import { adminRoutes } from '../../routes';

const Admin: React.FC = () => {
   return (
      <NestedSidebarLayout links='admin'>
         <Switch>
            <Route
               path={adminRoutes.registeredOrphanages}
               exact
               component={() => <h1>Registered</h1>}
            />
            <Route
               path={adminRoutes.pendingOrphanges}
               exact
               component={() => <h1>Pending</h1>}
            />
         </Switch>
      </NestedSidebarLayout>
   )
}

export default Admin