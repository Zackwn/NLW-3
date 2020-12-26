import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NestedSidebarLayout from '../../components/Dashboard/NestedSidebarLayout'

import { dashboardRoutes } from '../../routes'

import Pending from './Pending'
import Registered from './Registered'

const Dashboard: React.FC = () => {
   return (
      <NestedSidebarLayout links='user'>
         <Switch>
            <Route
               path={dashboardRoutes.registeredOrphanages}
               exact
               component={Registered}
            />
            <Route
               path={dashboardRoutes.pendingOrphanages}
               exact
               component={Pending}
            />
         </Switch>
      </NestedSidebarLayout>
   )
}

export default Dashboard