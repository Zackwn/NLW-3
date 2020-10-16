import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetail from './pages/OrphanageDetail'
import SelectMapPosition from './pages/SelectMapPosition'
import OrphanageData from './pages/OrphanageData'

import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator()

const Routes: React.FC = () => {
   return (
      <NavigationContainer>
         <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
            <Screen
               name='OrphanagesMap'
               component={OrphanagesMap}
            />

            <Screen
               name='OrphanageDetail'
               component={OrphanageDetail}
               options={{
                  headerShown: true,
                  header: () => <Header
                     title='Orfanato'
                     showCancel={false}
                  />
               }}
            />

            <Screen
               name='OrphanageData'
               component={OrphanageData}
               options={{
                  headerShown: true,
                  header: () => <Header title='Informe os dados' />
               }}
            />

            <Screen
               name='SelectMapPosition'
               component={SelectMapPosition}
               options={{
                  headerShown: true,
                  header: () => <Header title='Selecione no mapa' />
               }}
            />
         </Navigator>
      </NavigationContainer>
   )
}

export default Routes;