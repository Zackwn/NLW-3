import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route as ReactRouterDomRoute, RouteProps, Redirect } from 'react-router-dom'

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import CreateOrphanage from './pages/CreateOrphanage'
import Orphanage from './pages/Orphanage'
import AuthProvider from './context/auth/AuthProvider'

// context
import AuthContext from './context/auth/AuthContext'
import Login from './pages/Login'

function Route({ isPrivate = false, ...routeParams }: { isPrivate?: boolean } & RouteProps) {
   const { isLoading, isAuthenticated } = useContext(AuthContext)

   if (isLoading) {
      return <h3>Carregando...</h3>
   }

   // console.log({ isPrivate, isAuthenticated })
   if (isPrivate && !isAuthenticated) {
      console.log(routeParams.component)
      // redirect user
      return <Redirect to='/login' />
   }

   return <ReactRouterDomRoute {...routeParams} />
}

const Routes: React.FC = () => {
   return (
      <BrowserRouter>
         <AuthProvider>
            <Switch>
               <Route path='/' exact component={Landing} />

               <Route path='/login' exact component={Login} />

               <Route path='/orphanages' exact component={OrphanagesMap} />

               <Route path='/orphanages/create' exact component={CreateOrphanage} />
               <Route path='/orphanages/:id' exact component={Orphanage} />

            </Switch>
         </AuthProvider>
      </BrowserRouter>
   )
}

export default Routes