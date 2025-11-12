import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { MaterialIcons } from '@expo/vector-icons';


const OfferSlider = () => {
    return (
        <View style={styles.container}>
            <Swiper
                autoplay={true}
                autoplayTimeout={3}
                showButtons={true}
                removeClippedSubviews={false}
                dotColor={'red'}
                activeDotColor={'black'}
                // nextButton={<MaterialIcons name="arrow-right" size={24} color="black" />}
                // prevButton={<MaterialIcons name="arrow-left" size={24} color="black" />}
                nextButton={<Text style={styles.nextButton}>›</Text>}
                prevButton={<Text style={styles.nextButton}>‹</Text>}
                // nextButton={<Text style={styles.buttonText}>›</Text>}
                // prevButton={<Text style={styles.buttonText}>‹</Text>}

            >
                <View style={styles.slide}>
                    <Image source={require('../Images/cheezious6.jpg')} style={styles.image} />
                </View>
                <View style={styles.slide}>

                    <Image source={require('../Images/cheezious3.jpg')} style={styles.image} />
                </View>
                <View style={styles.slide}>

                    <Image source={require('../Images/cheezious2.png')} style={styles.image} />
                </View>

            </Swiper>
        </View>
    )
}

export default OfferSlider

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 150,
        alignSelf: 'center'
        // backgroundColor: 'red',

    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 25 //18
    },
    slide : {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center'
    },
    nextButton : {
        color : 'black',
       fontSize: 20,
       fontWeight: '600',
       backgroundColor: 'white',
       borderRadius: 20,
       width: 20,
       height: 20,
       textAlign: 'center',
       lineHeight: 20 
    }
})