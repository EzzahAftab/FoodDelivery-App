import { StyleSheet, Text, TouchableOpacity, View ,Alert } from 'react-native'
import React, { useContext,useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { AuthContext } from '../Context/AuthContext';

const Headerbar = ({locationName,setLocationName,navigation}) => {
    const { logout } = useContext(AuthContext);
   // const [currentLocation, setCurrentLocation] = useState(null);
    const handleLogout = () => {
        // Handle logout logic
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", onPress: () => logout() }
        ]);
    };

    // const getLocation = async () => {
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         Alert.alert('Permission Denied', 'Location permission is required to proceed.');
    //         return;
    //     }

    //     let location = await Location.getCurrentPositionAsync({});
    //     setCurrentLocation(location.coords);
    //     try {
    //         const geocode = await Location.reverseGeocodeAsync({
    //             latitude: location.coords.latitude,
    //             longitude: location.coords.longitude,
    //         });
    //         if (geocode.length > 0) {
    //             const { city, country, street, region } = geocode[0];
    //             let locationName = `${city}, ${region}, ${country}`;
    //             if (street) {
    //                 locationName = `${street}, ${locationName}`;
    //             }
    //             setLocationName(locationName);
    //         }
    //     } catch (error) {
    //         console.log('Error fetching location name:', error);
    //     }
    // };

    // const confirmLocation = async () => {
    //     try {
    //         const geocode = await Location.reverseGeocodeAsync({
    //             latitude: currentLocation.latitude,
    //             longitude: currentLocation.longitude
    //         });
    //         if (geocode.length > 0) {
    //             const { city, country, street, region } = geocode[0];
    //             let locationName = `${city}, ${region}, ${country}`;
    //             if (street) {
    //                 locationName = `${street}, ${locationName}`;
    //             }
    //             setLocationName(locationName);
    //         }
    //     } catch (error) {
    //         console.log('Error fetching location name:', error);
    //     }
    // };

   
   
   
    
    return (
        <View style={styles.container}>
            <TouchableOpacity  style={{ flexDirection: 'row' }}>
                <Ionicons name="ios-location" size={28} color="black" style={{ paddingVertical: 6 }} />
                <View style={{ paddingHorizontal: 5 }}>
                    <View>
                        <Text style={{ paddingRight: 3, fontSize: 16, fontWeight: '700' }}>Location</Text>
                    </View>
                    { !locationName ?
                    <Text style={{color:"red"}} >Confirm your Location</Text>
                :
                <Text >{locationName}</Text> }
                    
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout } style={{ flexDirection: 'row' }}>
                <Text style={{ paddingHorizontal: 10, fontSize: 16, fontWeight: '700', color: 'red' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Headerbar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
        borderBottomWidth: 1,
        borderColor: 'grey',
        justifyContent: "space-between",
        height: 60,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10
    }
})