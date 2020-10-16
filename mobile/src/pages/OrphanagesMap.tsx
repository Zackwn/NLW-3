import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'
import MapMarker from '../images/map-marker.png'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';
import { OrphanageInterface } from '../@types/orphanage';

const OrphanagesMap: React.FC = () => {
   const navigation = useNavigation()
   const [orphanages, setOrphanages] = useState<OrphanageInterface[]>([])

   useFocusEffect(() => {
      async function getOrphanages() {
         const response = await api.get('/orphanages')
         setOrphanages(response.data)
      }

      getOrphanages()
   })

   function handleNavigateToOrphanageDetail(id: number) {
      navigation.navigate('OrphanageDetail', { id })
   }

   function handleNavigateToCreateOrphanage() {
      navigation.navigate('SelectMapPosition')
   }

   return (
      <View style={styles.container}>
         <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
               latitude: -21.2488522,
               longitude: -50.6501661,
               latitudeDelta: 0.008,
               longitudeDelta: 0.008
            }}
         >
            {
               orphanages.map(orphanage => (
                  <Marker
                     key={orphanage.id}
                     icon={MapMarker}
                     coordinate={{
                        latitude: orphanage.latitude,
                        longitude: orphanage.longitude
                     }}
                     calloutAnchor={{
                        x: 2.7,
                        y: 0.8
                     }}
                  >
                     <Callout tooltip={true} onPress={() => handleNavigateToOrphanageDetail(orphanage.id)}>
                        <View style={styles.calloutContainer}>
                           <Text style={styles.calloutText}>
                              {orphanage.name}
                           </Text>
                        </View>
                     </Callout>
                  </Marker>
               ))
            }
         </MapView>

         <View style={styles.footer}>
            <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

            <RectButton style={styles.createOrphanagesButton} onPress={handleNavigateToCreateOrphanage}>
               <Feather name='plus' size={20} color='#FFF' />
            </RectButton>
         </View>
      </View>
   )
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
   },

   map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
   },

   calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center'
   },

   calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
   },

   footer: {
      position: 'absolute',
      bottom: 24,
      left: 24,
      right: 24,

      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,

      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      // shadow
      elevation: 10
   },

   footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3',
   },

   createOrphanagesButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,

      justifyContent: 'center',
      alignItems: 'center'
   }
});


export default OrphanagesMap;