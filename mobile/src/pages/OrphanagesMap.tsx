import React from 'react';
import { View, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'

import MapMarker from '../images/map-marker.png'
import { useNavigation } from '@react-navigation/native';

const OrphanagesMap: React.FC = () => {
   const navigation = useNavigation()

   function handleNavigateToOrphanageDetail() {
      navigation.navigate('OrphanageDetail')
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
            <Marker
               icon={MapMarker}
               coordinate={{
                  latitude: -21.2488522,
                  longitude: -50.6501661
               }}
               calloutAnchor={{
                  x: 2.7,
                  y: 0.8
               }}
            >
               <Callout tooltip={true} onPress={handleNavigateToOrphanageDetail}>
                  <View style={styles.calloutContainer}>
                     <Text style={styles.calloutText}>
                        Lar feliz
                     </Text>
                  </View>
               </Callout>
            </Marker>
         </MapView>

         <View style={styles.footer}>
            <Text style={styles.footerText}>2 orfanatos encontrados</Text>

            <TouchableOpacity style={styles.createOrphanagesButton}>
               <Feather name='plus' size={20} color='#FFF' />
            </TouchableOpacity>
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