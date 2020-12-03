import React from 'react'
import { Route, Switch } from 'react-router-dom'
import DashboardWrapper from '../../components/Dashboard/Wrapper'

import { dashboardRoutes } from '../../routes'

import Pending from './Pending'
import Registered from './Registered'

const Dashboard: React.FC = () => {
   return (
      <DashboardWrapper>
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
      </DashboardWrapper>
   )
}

export default Dashboard