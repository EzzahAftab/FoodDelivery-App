import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { firebase } from "../Firebase/FirebaseConfig";
import { useFocusEffect } from "@react-navigation/native";

const UserCartScreen = ({ navigation }) => {
  const { userloggeduid } = useContext(AuthContext);

  const [cartdata, setCartdata] = useState(null);
  const [cartAlldata, setCartAlldata] = useState(null);
  const [foodDataAll, setFoodDataAll] = useState([]);
  const [ItemCost, setItemCost] = useState("0");
  const [totalCost, setTotalCost] = useState("0");
  const [deliveryCharges, setDeliveryCharges] = useState("0");

  const [paymentpage, setPaymentPage] = useState(false);

  const cardDataHandler = async () => {
    const docref = firebase
      .firestore()
      .collection("UserCart")
      .doc(userloggeduid);

    try {
      await docref.get().then((doc) => {
        if (doc.exists) {
          setCartdata(doc.data());
          setCartAlldata(doc.data().cartItems);
          // console.log(cartAlldata);
        } else {
          // setCartAlldata(null);         //NEWWWWW
          console.log("there is no data");
        }
      });
    } catch (error) {
      console.log("Ye hai bo Error", error);
    }
  };

  useEffect(() => {
    cardDataHandler();
  }, []);

  const FoodDataHandler = async () => {
    const firestore = firebase.firestore();
    const startersRef = firestore.collection("Starters");
    const pizzaRef = firestore.collection("Pizza");
    const burgerRef = firestore.collection("Burger");
    const drinksRef = firestore.collection("Drinks");

    try {
      const startersSnapshot = await startersRef.get();
      const pizzaSnapshot = await pizzaRef.get();
      const burgerSnapshot = await burgerRef.get();
      const drinksSnapshot = await drinksRef.get();

      const startersData = startersSnapshot.docs.map((doc) => doc.data());
      const pizzaData = pizzaSnapshot.docs.map((doc) => doc.data());
      const burgerData = burgerSnapshot.docs.map((doc) => doc.data());
      const drinksData = drinksSnapshot.docs.map((doc) => doc.data());

      // Combine data from all collections into one array
      const allData = [
        ...startersData,
        ...pizzaData,
        ...burgerData,
        ...drinksData,
      ];

      // Set the combined data to state or perform any other action
      setFoodDataAll(allData);
      // console.log(foodDataAll);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    FoodDataHandler();
  }, []);

  const TotalPriceHandler = () => {
    //this condition in if = && cartAlldata !== null
    if (cartdata !== null && Object.keys(cartdata).length !== 0) {
      const cartDataforTotalPrice = cartAlldata;
      let totalfoodprice = 0;

      // const foodprice = cartDataforTotalPrice.cartItems
      cartDataforTotalPrice.forEach((item) => {
        totalfoodprice += parseInt(item.totalFoodPrice);
      });

      setItemCost(totalfoodprice.toString());
      setTotalCost(totalfoodprice.toString());
    }
  };

  useEffect(() => {
    TotalPriceHandler();
  }, [cartAlldata]);

  const DeleteButtonhandler = async (item) => {
    const docref = firebase
      .firestore()
      .collection("UserCart")
      .doc(userloggeduid);

    const docSnapshot = await docref.get();
    const cartData = docSnapshot.data();

    if (cartData && cartData.cartItems && cartData.cartItems.length === 1) {
      await docref.update({
        cartItems: firebase.firestore.FieldValue.delete(),
        cartItems: [],
        totalPrice: 0, // Assuming there's a field named totalPrice in your cart document
      });
    } else {
      await docref.update({
        cartItems: firebase.firestore.FieldValue.arrayRemove(item),
      });
    }
    cardDataHandler();
    TotalPriceHandler();
  };

  // console.log('Ye hai Data braso', ItemCost, totalCost,)

  const deleteCart = async () => {
    const docRef = firebase
      .firestore()
      .collection("UserCart")
      .doc(userloggeduid);

    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      await docRef.delete();
    } else {
      console.log("Document does not exist.");
    }
  };

  // const [updatedCartData, setUpdatedCartData] = useState(null);

  // const addingSomedata = (docid, date) => {
  //   if (cartdata !== null) {
  //     const updatedData = { ...cartdata };

  //     updatedData.cartItems.forEach((item) => {
  //       item.orderId = docid;
  //       item.orderDate = date;
  //     });

  //     setUpdatedCartData(updatedData);
  //   }
  // };

  const PlaceNow = async (phoneNumber, address) => {
    console.log(address);
    const validatePhoneNumber = (phone) => {
      // You can implement your own phone number validation logic here
      return /^\d{11}$/.test(phone);
    };
    if (!validatePhoneNumber(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const cDate = new Date().getTime().toString();
    const docid = new Date().getTime().toString() + userloggeduid;

    const orderdatadoc = firebase
      .firestore()
      .collection("UserOrders")
      .doc(docid);
    const orderitemstabledoc = firebase
      .firestore()
      .collection("OrderItems")
      .doc(docid);

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString(); // This gives you the date and time in ISO format (e.g., "2024-05-13T12:34:56.789Z")
    const timestamp = currentDate.getTime(); // This gives you the timestamp in milliseconds since the Unix epoch (January 1, 1970)
    // Set up the data for the order items
    const updatedData = cartdata.cartItems.map((item) => ({
      ...item,
      orderId: docid,
      orderDate: formattedDate,
    }));

    try {
      // Update order items in the database
      await orderitemstabledoc.set({ cartItems: updatedData });

      // Create the order document
      await orderdatadoc.set({
        orderid: docid,
        orderstatus: "Pending",
        ordercost: totalCost,
        orderdate: formattedDate,
        ordertime: timestamp.toString(),
        userid: userloggeduid,
        userpayment: "COD",
        paymenttotal: "",
        phoneNumber: phoneNumber,
        address: address,
      });

      // Clear the cart after placing the order
      await deleteCart();

      // Inform the user and navigate to the home screen
      alert("Order placed successfully.");
      navigation.navigate("HomeScreen");
      setPaymentPage(false);
    } catch (error) {
      alert("Error placing order. Please try again.");
      console.error("Error placing order:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      cardDataHandler();
      TotalPriceHandler();
    }, [])
  );
  const PaymentScreen = () => {
    const [phoneNumber, setPhoneNumber] = useState("");

    const [houseNo, setHouseNo] = useState("");
    const [streetNo, setStreetNo] = useState("");
    const [area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");

    return (
      <View style={styles.mainContainer}>
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
              setPaymentPage(false);
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Close</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.heading}>Payment Method</Text>
            <TouchableOpacity
              style={styles.paymentOption}
              onPress={() => {
                // You can add functionality for selecting payment method here
                alert("Selected");
              }}
            >
              <Text style={styles.paymentOptionText}>Cash on Delivery</Text>
            </TouchableOpacity>

            <Text style={styles.heading}>Delivery Address</Text>
            <TextInput
              style={styles.input}
              placeholder="House No"
              value={houseNo}
              onChangeText={(text) => setHouseNo(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Street No"
              value={streetNo}
              onChangeText={(text) => setStreetNo(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Area"
              value={area}
              onChangeText={(text) => setArea(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={(text) => setCity(text)}
            />
            <Text style={styles.heading}>Phone Number</Text>

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />

            <TouchableOpacity
              style={styles.placeOrderButton}
              onPress={() => {
                const fullAddress = `House# ${houseNo},Street# ${streetNo}, ${area}, ${city}`;
                PlaceNow(phoneNumber, fullAddress);
              }}
            >
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  if (paymentpage === true) {
    return <PaymentScreen />;
  }

  // if (paymentpage === true) {
  //   return (
  //     <View style={styles.mainContainer}>
  //       <View
  //         style={{
  //           backgroundColor: "#FF3F00",
  //           paddingVertical: 15,
  //           paddingHorizontal: 15,
  //           marginTop: 30,
  //         }}
  //       >
  //         <TouchableOpacity
  //           onPress={() => {
  //             navigation.navigate("HomeScreen");
  //           }}
  //         >
  //           <Text style={{ fontSize: 16, color: "white" }}>Close</Text>
  //         </TouchableOpacity>
  //       </View>
  //       <View style={styles.container}>
  //         <View>
  //           <Text
  //             style={{
  //               fontSize: 18,
  //               fontWeight: "600",
  //               paddingVertical: 10,
  //               paddingHorizontal: 15,
  //             }}
  //           >
  //             Payment Options
  //           </Text>

  //           <TouchableOpacity
  //             style={{
  //               backgroundColor: "#FF3F00",
  //               paddingHorizontal: 20,
  //               paddingVertical: 10,
  //               borderRadius: 20,
  //               marginHorizontal: 10,
  //             }}
  //             onPress={() => {
  //               alert("Selected");
  //             }}
  //           >
  //             <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
  //               Cash on Delivery
  //             </Text>
  //           </TouchableOpacity>
  //         </View>

  //         <View style={{ paddingBottom: 30 }}>
  //           <Text
  //             style={{
  //               fontSize: 18,
  //               fontWeight: "600",
  //               paddingVertical: 10,
  //               paddingHorizontal: 15,
  //             }}
  //           >
  //             Delivery Location
  //           </Text>

  //           <TouchableOpacity
  //             style={{
  //               backgroundColor: "#FF3F00",
  //               paddingHorizontal: 20,
  //               paddingVertical: 10,
  //               borderRadius: 20,
  //               marginHorizontal: 10,
  //             }}
  //             onPress={() => {
  //               alert("Selected");
  //             }}
  //           >
  //             <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
  //               Current Location
  //             </Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             style={{
  //               backgroundColor: "#FF3F00",
  //               paddingHorizontal: 20,
  //               paddingVertical: 10,
  //               borderRadius: 20,
  //               marginHorizontal: 10,
  //               marginTop: 10,
  //             }}
  //             onPress={() => {
  //               alert("Selected");
  //             }}
  //           >
  //             <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
  //               Change Location
  //             </Text>
  //           </TouchableOpacity>
  //         </View>

  //         <View
  //           style={{
  //             paddingTop: 10,
  //             borderTopWidth: 1,
  //             borderColor: "#c9c9c9",
  //           }}
  //         >
  //           <TouchableOpacity
  //             style={{
  //               backgroundColor: "#FF3F00",
  //               paddingHorizontal: 20,
  //               paddingVertical: 10,
  //               borderRadius: 20,
  //               marginHorizontal: 10,
  //               marginTop: 10,
  //               alignItems: "center",
  //             }}
  //             onPress={() => PlaceNow()}
  //           >
  //             <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
  //               Place Order
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }
  return (
    <View style={styles.mainContainer}>
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

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.containerHead}>My Cart</Text>

          <View style={styles.cartout}>
            {totalCost !== "0" && cartAlldata === null ? (
              <Text
                style={{ marginHorizontal: 16, fontSize: 17, color: "grey" }}
              >
                Your Cart is Empty!
              </Text>
            ) : (
              <FlatList
                style={styles.FlatListCont}
                data={cartAlldata}
                renderItem={({ item }) => {
                  const nData = foodDataAll.filter(
                    (items) => items.id === item.item_id
                  );
                  // console.log('ye hai food data console', item)
                  return (
                    <View style={styles.containerCardList}>
                      <View style={styles.containerCard}>
                        <Image
                          source={{ uri: nData[0].FoodImageUrl }}
                          style={styles.cardimage}
                        />
                        <View style={styles.containerCard_in}>
                          <View style={styles.containerCard_in2}>
                            <Text style={styles.containerCard_in2_itemName}>
                              {nData[0].FoodName}
                            </Text>
                            <Text style={styles.containerCard_in2_itemPrice}>
                              {nData[0].FoodPrice}Rs for one
                            </Text>
                            <Text style={styles.containerCard_in2_itemQty}>
                              Quantity: {item.FoodQuantity}
                            </Text>
                          </View>

                          <View style={styles.containerCard_in3}>
                            <TouchableOpacity
                              style={styles.containerCard_in3_btn}
                              onPress={() => {
                                DeleteButtonhandler(item);
                              }}
                            >
                              <Text style={styles.containerCard_in3_btn_txt}>
                                Delete
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            )}
          </View>

          {totalCost && totalCost !== "0" ? (
            <>
              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    backgroundColor: "white",
                    borderColor: "grey",
                    borderRadius: 15,
                    width: "95%",
                    alignSelf: "center",
                    marginVertical: 5,
                    paddingVertical: 5,
                    elevation: 3,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "95%",
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "600" }}>Item Cost:</Text>
                    <Text style={{ fontWeight: "600" }}>{ItemCost}Rs</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "95%",
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "600" }}>Delivery Charges:</Text>
                    <Text>{deliveryCharges}Rs</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "95%",
                      alignSelf: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "500" }}>Service Charges:</Text>
                    <Text>0Rs</Text>
                  </View>
                </View>
              </View>

              <View style={styles.btnCont}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 20, fontWeight: "600" }}>
                    Total:
                  </Text>
                  <Text
                    style={{ fontSize: 20, fontWeight: "600", paddingLeft: 5 }}
                  >
                    {totalCost}Rs
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FF3F00",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 20,
                  }}
                  onPress={() => setPaymentPage(true)}
                >
                  <Text
                    style={{ fontSize: 17, fontWeight: "500", color: "white" }}
                  >
                    Place Order
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <Text style={{ marginHorizontal: 16, fontSize: 17, color: "grey" }}>
              Your Cart is Empty!
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default UserCartScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#edeef0",
    width: "100%",
    padding: 20,
  },
  containerHead: {
    fontSize: 25,
    fontWeight: "600",
    marginVertical: 5,
    marginLeft: 5,
    paddingHorizontal: 10,
  },
  containerCard: {
    flexDirection: "row",
    backgroundColor: "white",
    marginVertical: 5,
    borderRadius: 25,
    width: "95%",
    alignSelf: "center",
    elevation: 2,
    alignItems: "center",
  },
  cardimage: {
    width: 100,
    height: "100%",
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
  },
  containerCard_in: {
    flexDirection: "column",
    margin: 5,
    width: "69%",
    alignItems: "flex-end",
  },
  containerCard_in1: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderBottomWidth: 1,
  },
  containerCard_in2: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  containerCard_in3: {
    flexDirection: "row",
    justifyContent: "center",
    width: 100,
    borderRadius: 20,
    backgroundColor: "#edeef0",
    marginVertical: 5,
    padding: 5,
    elevation: 2,
  },
  containerCard_in2_itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  containerCard_in2_itemPrice: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  containerCard_in3_btn_txt: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btnCont: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
    flexDirection: "row",
    marginBottom: 80,
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  paymentOption: {
    backgroundColor: "#FF3F00",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  paymentOptionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  placeOrderButton: {
    backgroundColor: "#FF3F00",
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
  },
  placeOrderButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
