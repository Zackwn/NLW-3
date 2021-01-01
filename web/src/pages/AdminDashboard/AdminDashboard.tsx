import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ManageOrphanageLayout from '../../components/Layouts/ManageOrphanageLayout';
import NestedSidebarLayout from '../../components/Layouts/NestedSidebarLayout';
import { adminRoutes } from '../../routes';
import Pending from './Pending';
import PendingOrphanageDetail from './PendingOrphanageDetail'

const Admin: React.FC = () => {
   return (
      <Switch>
         <Route
            path={adminRoutes.registeredOrphanages}
            exact
            component={() =>
               <NestedSidebarLayout links='admin'>
                  <h1>Registered</h1>
               </NestedSidebarLayout>
            }
         />
         <Route
            path={adminRoutes.pendingOrphanges}
            exact
            component={() =>
               <NestedSidebarLayout links='admin'>
                  <Pending />
               </NestedSidebarLayout>
            }
         />
         <Route
            path={adminRoutes.pendingOrphanageDetail}
            exact
            component={() =>
               <ManageOrphanageLayout>
                  <PendingOrphanageDetail />
               </ManageOrphanageLayout>
            }
         />
      </Switch>
   )
}

export default Admin