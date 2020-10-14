import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import CreateOrphanage from './pages/CreateOrphanage'
import Orphanage from './pages/Orphanage'

const Routes: React.FC = () => {
   return (
      <BrowserRouter>
         <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/orphanages' exact component={OrphanagesMap} />

            <Route path='/orphanages/create' exact component={CreateOrphanage} />
            <Route path='/orphanages/:id' exact component={Orphanage} />
         </Switch>
      </BrowserRouter>
   )
}

export default Routes