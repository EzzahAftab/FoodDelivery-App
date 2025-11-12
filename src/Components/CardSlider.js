import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image, ScrollView, FlatList, SafeAreaView } from 'react-native'
import React from 'react'

const CardSlider = ({ navigation, data,data1,data2,data3   }) => {
    
    
    const openProductHandler = (item) => {
        navigation.navigate('ProductScreen', item)
    }
    return (
        
        <View style={styles.container}>
            
            <Text style={styles.cardouthead}>
                Starters
            </Text>
            <SafeAreaView>

                <FlatList style={styles.flatliststyle}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.index} style={styles.card} onPress={() => { openProductHandler(item) }}>
                            <View>
                                <Image source={{ uri: item.FoodImageUrl }} style={styles.cardimage} />
                            </View>

                            <View style={styles.cardin1}>
                                <Text style={styles.cardin1txt}>{item.FoodName}</Text>

                                <View style={styles.cardin2}>
                                    <Text style={styles.cardin2txt1}>{item.Serving}</Text>
                                    <Text style={styles.cardin2txt1}>Price -
                                       

                                        <Text> {item.FoodPrice}Rs</Text>
                                    </Text>
                                    {/* <Text style={styles.cardin2txt3}>VEG</Text> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>

            <Text style={styles.cardouthead}>
                Our Delicious Pizza
            </Text>
            <SafeAreaView>

                <FlatList style={styles.flatliststyle}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={data1}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.index} style={styles.card} onPress={() => { openProductHandler(item) }}>
                            <View>
                                <Image source={{ uri: item.FoodImageUrl }} style={styles.cardimage} />
                            </View>

                            <View style={styles.cardin1}>
                                <Text style={styles.cardin1txt}>{item.FoodName}</Text>

                                <View style={styles.cardin2}>
                                    <Text style={styles.cardin2txt1}>{item.Serving}</Text>
                                    <Text style={styles.cardin2txt1}>Price -
                                       

                                        <Text> {item.FoodPrice}Rs</Text>
                                    </Text>
                                    {/* <Text style={styles.cardin2txt3}>VEG</Text> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>

            <Text style={styles.cardouthead}>
                Our Signature Burgers
            </Text>
            <SafeAreaView>

                <FlatList style={styles.flatliststyle}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={data2}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.index} style={styles.card} onPress={() => { openProductHandler(item) }}>
                            <View>
                                <Image source={{ uri: item.FoodImageUrl }} style={styles.cardimage} />
                            </View>

                            <View style={styles.cardin1}>
                                <Text style={styles.cardin1txt}>{item.FoodName}</Text>

                                <View style={styles.cardin2}>
                                    <Text style={styles.cardin2txt1}>{item.Serving}</Text>
                                    <Text style={styles.cardin2txt1}>Price -
                                       

                                        <Text> {item.FoodPrice}Rs</Text>
                                    </Text>
                                    {/* <Text style={styles.cardin2txt3}>VEG</Text> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>

            <Text style={styles.cardouthead}>
                Cold Drinks
            </Text>
            <SafeAreaView>

                <FlatList style={styles.flatliststyle}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={data3}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.index} style={styles.card} onPress={() => { openProductHandler(item) }}>
                            <View>
                                <Image source={{ uri: item.FoodImageUrl }} style={styles.cardimage} />
                            </View>

                            <View style={styles.cardin1}>
                                <Text style={styles.cardin1txt}>{item.FoodName}</Text>

                                <View style={styles.cardin2}>
                                    <Text style={styles.cardin2txt1}>{item.Serving}</Text>
                                    <Text style={styles.cardin2txt1}>Price -
                                       

                                        <Text> {item.FoodPrice}Rs</Text>
                                    </Text>
                                    {/* <Text style={styles.cardin2txt3}>VEG</Text> */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
          
       </View>
     );
      
    
}

export default CardSlider

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        // backgroundColor: 'green',
        paddingHorizontal: 5
    },
    cardouthead: {
        fontSize: 16,
        fontWeight: '900',
        marginHorizontal: 10,
        marginTop:10,
        paddingLeft: 5,
        color: '#424242'
    },
    cardimage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16 //17

    },
    card: {
        width: 250,
        height: 200,
        marginLeft: 5,
        marginTop: 10,
        borderRadius: 17, //18
        backgroundColor: '#dedede',
        // borderWidth: 1,
        // borderColor: 'grey',
        // elevation: 2

    },
    cardin1: {
        // backgroundColor: 'red',
        marginHorizontal: 3,
        marginTop: 3
    },
    cardin1txt: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 5,

    },
    cardin2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal:10,
        justifyContent:'space-between'
    },
    cardin2txt1: {
        fontSize: 12,
        marginRight: 10,
        fontWeight: '500'
    },
    cardin2txt3: {
        height: 20,
        borderRadius: 10,
        backgroundColor: 'green',
        fontSize: 10,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        paddingHorizontal: 7
    }
})