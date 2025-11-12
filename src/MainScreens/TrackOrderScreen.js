import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { firebase } from '../Firebase/FirebaseConfig';
import { AuthContext } from '../Context/AuthContext';
import TrackOrderItems from '../Components/TrackOrderItems';

const TrackOrderScreen = ({ navigation }) => {
  const { userloggeduid } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [foodDataAll, setFoodDataAll] = useState([]);

  const getOrders = async () => {
    const ordersRef = firebase.firestore().collection('UserOrders').where('userid', '==', userloggeduid);
    ordersRef.onSnapshot(snapshot => {
      setOrders(snapshot.docs.map(doc => doc.data()).reverse());
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const firestore = firebase.firestore();
      const startersRef = firestore.collection("Starters");
      const pizzaRef = firestore.collection("Pizza");
      const burgerRef = firestore.collection("Burger");
      const drinksRef = firestore.collection("Drinks");

      try {
        const [startersSnapshot, pizzaSnapshot, burgerSnapshot, drinksSnapshot] = await Promise.all([
          startersRef.get(),
          pizzaRef.get(),
          burgerRef.get(),
          drinksRef.get()
        ]);

        const startersData = startersSnapshot.docs.map(doc => doc.data());
        const pizzaData = pizzaSnapshot.docs.map(doc => doc.data());
        const burgerData = burgerSnapshot.docs.map(doc => doc.data());
        const drinksData = drinksSnapshot.docs.map(doc => doc.data());

        const allData = [...startersData, ...pizzaData, ...burgerData, ...drinksData];

        setFoodDataAll(allData);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
     <View
        style={{
          backgroundColor: "#FF3F00",
          paddingVertical: 15,
          paddingHorizontal: 15,
          marginTop: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Close</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>

      <Text style={styles.mainHeading}>My Orders</Text>

      <View style={styles.ordersContainer}>
        {orders.map((order, index) => (
          <View style={styles.orderItem} key={index}>
            <Text style={styles.orderText}>Order ID: {(order.orderid).substring(5, 15)}</Text>
            <Text style={styles.orderText}>Time: {(order.orderdate).substring(11, 19)}</Text>
            <Text style={styles.orderText}>Date: {(order.orderdate).substring(0, 10)}</Text>
            <Text style={styles.orderStatus}>{order.orderstatus}</Text>
            <TrackOrderItems foodDataAll={foodDataAll} data={order.orderid} navigation={navigation} />
            <Text style={styles.orderTotal}>Total: Rs {order.ordercost}</Text>
            <Text style={styles.orderText}>Phone: {order.phoneNumber}</Text>
            <Text style={styles.orderText}>Address: {order.address}</Text>
          </View>
        ))}
        </View>
         </ScrollView>
      </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    width:"100%"
  },
  
  header: {
    backgroundColor: '#FF3F00',
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  closeButton: {
    color: 'white',
    fontSize: 16,
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  ordersContainer: {
    paddingHorizontal: 20,
  },
  orderItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FF3F00',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
    color: '#333',
  },
});

export default TrackOrderScreen;
