import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardWrapper from '../../components/Dashboard/Wrapper';

const Dashboard: React.FC = () => {
   return (
      <DashboardWrapper>
         <Switch>
            <Route path='/dashboard/registered' component={() => <h2>Registered Orphanages!</h2>} />
            <Route path='/dashboard/pending' component={() => <h2>Pending Orphanages!</h2>} />
         </Switch>
      </DashboardWrapper>
   )
}

export default Dashboard