import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, Button, TurboModuleRegistry,Alert } from 'react-native'
import React, { useContext,useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Headerbar from '../Components/Headerbar'
import { AntDesign } from '@expo/vector-icons';
import Categories from '../Components/Categories';
import OfferSlider from '../Components/OfferSlider';
import CardSlider from '../Components/CardSlider';
import { firebase } from '../Firebase/FirebaseConfig'
import * as Location from 'expo-location';
import { AuthContext } from '../Context/AuthContext';
import MapView, { Marker } from 'react-native-maps';


const HomeScreen = ({ navigation }) => {
    const [locationName, setLocationName] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);
    const [isMapVisible, setIsMapVisible] = useState(false);
  

    // const [foodData, setFoodData] = useState([])
    const [foodDataAll, setFoodDataAll] = useState([]);
    const [startersData, setStartersData] = useState([])
    const [PizzaData, setPizzaData] = useState([])
    const [BurgerData, setBurgerData] = useState([])
    const [DrinksData, setDrinksData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    
    


    const foodDataQry = firebase.firestore().collection('Starters')
    const foodDataQry1 = firebase.firestore().collection('Pizza')
    const foodDataQry2 = firebase.firestore().collection('Burger')
    const foodDataQry3 = firebase.firestore().collection('Drinks')

    useEffect(() => {
        foodDataQry.onSnapshot(snapshot => {
            setStartersData(snapshot.docs.map(doc => doc.data()))
        })

        foodDataQry1.onSnapshot(snapshot => {
          setPizzaData(snapshot.docs.map(doc => doc.data()))
      })

      foodDataQry2.onSnapshot(snapshot => {
        setBurgerData(snapshot.docs.map(doc => doc.data()))
    })

    foodDataQry3.onSnapshot(snapshot => {
      setDrinksData(snapshot.docs.map(doc => doc.data()))
  })
    }, [])

    
//     const requestLocationPermission = async () => {
//         console.log("its working")
       
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             console.log('Permission to access location was denied');
//             return;
//         }
//         // Permission granted, continue with obtaining the location
//         getLocation()

//     };

   

//     const getLocation = async () => {
//       try {
//           const location = await Location.getCurrentPositionAsync({});
//           const { latitude, longitude } = location.coords;
//           console.log('Latitude:', latitude);
//           console.log('Longitude:', longitude);

//           // Get complete address using latitude and longitude
//           const address = await getLocationName(latitude, longitude);
//           console.log('Complete Address:', address);
//       } catch (error) {
//           console.log('Error getting location:', error);
//       }
//   };



//       const getLocationName = async (latitude, longitude) => {
//         try {
//           const geocode = await Location.reverseGeocodeAsync({
//             latitude,
//             longitude
//           });
//           if (geocode.length > 0) {
//             const { city, country, street, region } = geocode[0];
//             let locationName = `${city}, ${region}, ${country}`;
//             if (street) {
//                 locationName = `${street}, ${locationName}`;
//             }
//             setLocationName(locationName);
//             return locationName;
//         }
//         } catch (error) {
//           console.log('Error fetching location name:', error);
//         }
    
//         return null;
//       };
//       useEffect(() => {
//         requestLocationPermission()
//     },[])
      
const getLocation = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to proceed.');
        return;
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true})

    setCurrentLocation(location.coords);
    console.log("current location: ",currentLocation)
    setIsMapVisible(true);
    try {
        const geocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421 
        });
        if (geocode.length > 0) {
            const { city, country, street, region } = geocode[0];
            let locationName = `${city}, ${region}, ${country}`;
            if (street) {
                locationName = `${street}, ${locationName}`;
            }
            setLocationName(locationName);
        }
    } catch (error) {
        console.log('Error fetching location name:', error);
    }
};

const handleConfirmLocation = () => {
    setIsMapVisible(false);
    // Any other logic you want to perform when confirming location
};


    return (
      
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={'#FF3F00'} />
          <TouchableOpacity onPress={()=> getLocation()}>
            <Headerbar locationName={locationName} setLocationName={setLocationName} navigation={navigation} />
            </TouchableOpacity>
            {/* <View style={styles.searchbox}>
                <AntDesign name="search1" size={24} color="black" style={{ color: '#FF3F00' }} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    onChangeText={text => setSearchQuery(text)}
                    value={searchQuery}
                />
            </View> */}
            <ScrollView>

            {/* <Categories /> */}
            <OfferSlider style={{ zIndex: 0 }} />



            <CardSlider navigation={navigation} data={startersData} data1={PizzaData} data2={BurgerData} data3={DrinksData} dataa={foodDataAll} searchQuery={searchQuery} style={{ zIndex: 0 }} />
            </ScrollView>

            {isMapVisible && currentLocation && (
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker coordinate={currentLocation} />
                    </MapView>
                    <TouchableOpacity onPress={handleConfirmLocation} style={styles.confirmButton}>
                        <Text style={styles.confirmButtonText}>Confirm Location</Text>
                    </TouchableOpacity>
                </View>
            )}

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: '100%'

    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    confirmButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    searchbox: {
        flexDirection: 'row',
        width: '95%',
        backgroundColor: 'white',
        alignItems: 'center',
        padding: 10,

        marginVertical: 10,
        borderRadius: 20,
        alignSelf: 'center',
        elevation: 2
    },
    input: {
        marginLeft: 10,
        width: '90%',
        fontSize: 16,
        color: '#c4c4c4',
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})