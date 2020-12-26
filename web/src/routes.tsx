import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route as ReactRouterDomRoute, RouteProps, Redirect } from 'react-router-dom'

import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'
import CreateOrphanage from './pages/CreateOrphanage'
import Orphanage from './pages/Orphanage'
import AuthProvider from './context/auth/AuthProvider'

// context
import AuthContext from './context/auth/AuthContext'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ChangePassword from './pages/ChangePassword'
import ToastProvider from './context/toast/ToastProvider'
import UpdateOrphanage from './pages/UpdateOrphanage'

interface AuthRouteProps extends RouteProps {
   isPrivate?: boolean,
   onlyAdmin?: boolean
}

function Route({ isPrivate = false, onlyAdmin = false, ...routeParams }: AuthRouteProps) {
   const { isLoading, isAuthenticated, isAdmin } = useContext(AuthContext)

   if (isLoading) {
      return <h3>Carregando...</h3>
   }

   if (onlyAdmin && !isAdmin) {
      console.log(routeParams.component)

      return <Redirect to='/login' />
   }

   if (isPrivate && !isAuthenticated) {
      console.log(routeParams.component)

      return <Redirect to='/login' />
   }

   return <ReactRouterDomRoute {...routeParams} />
}

export const dashboardRoutes = {
   registeredOrphanages: '/dashboard/orphanages/',
   pendingOrphanages: '/dashboard/orphanages/pending/'
}

export const adminRoutes = {
   registeredOrphanages: '/admin/orphanages/',
   pendingOrphanges: '/admin/orphanages/pending/'
}

const Routes: React.FC = () => {
   return (
      <BrowserRouter>
         <AuthProvider>
            <ToastProvider>
               <Switch>
                  <Route path='/' exact component={Landing} />

                  <Route path='/login' exact component={Login} />

                  <Route path='/forgot-password' component={ForgotPassword} />
                  <Route path='/change-password/:token' component={ChangePassword} />

                  <Route path='/orphanages' exact component={OrphanagesMap} />
                  <Route path='/orphanages/detail/' exact component={Orphanage} />

                  <Redirect exact from='/dashboard' to={dashboardRoutes.registeredOrphanages} />
                  <Route isPrivate path='/dashboard' component={UserDashboard} />

                  <Redirect exact from='/admin' to={adminRoutes.registeredOrphanages} />
                  <Route onlyAdmin={true} path='/admin' component={AdminDashboard} />

                  <Route isPrivate path='/orphanages/create' exact component={CreateOrphanage} />
                  <Route isPrivate path='/orphanages/update' exact component={UpdateOrphanage} />
               </Switch>
            </ToastProvider>
         </AuthProvider>
      </BrowserRouter>
   )
}

export default Routes