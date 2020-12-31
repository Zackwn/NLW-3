import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NestedSidebarLayout from '../../components/Dashboard/NestedSidebarLayout';
import { adminRoutes } from '../../routes';
import Pending from './Pending';

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
               component={Pending}
            />
         </Switch>
      </NestedSidebarLayout>
   )
}

export default Admin