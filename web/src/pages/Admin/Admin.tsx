import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { adminRoutes } from '../../routes';
import Registered from './Registered';

const Admin: React.FC = () => {
   return (
      <Switch>
         <Route
            exact
            path={adminRoutes.registeredOrphanages}
            component={Registered}
         />
      </Switch>
   )
}

export default Admin