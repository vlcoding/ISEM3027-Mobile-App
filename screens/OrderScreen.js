import React, { useState } from "react";
import {
  Alert,
  Image,
  RefreshControl,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import OrderItem from "../components/OrderItem";
export default function OrderScreen({ route, navigation }) {
  const [product, setProduct] = useState(route.params.product);

  //for user input
  const [isLoading, setIsLoading] = useState(false);
  const [inputQuantity, setInputQuantity] = useState("");
  const [totalAmount, setTotalAmount] = useState("0");

  const inputHandler = (value) => {
    setInputQuantity(value);
    setTotalAmount((value * product.price * product.discount).toFixed(2));
  };

  function submitOrder() {
    console.log("submit Order");
  }

  const refreshControl = (
    <RefreshControl
      refreshing={isLoading}
      onRefresh={() => updateProductDate()}
    />
  );

  function updateProductDate() {
    setIsLoading(true);
    console.log("updateing ProductData from server ...");
    const newProductData = route.params.product;
    setProduct(newProductData);
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      {/* ScrollView is the main content view for displaying product detail */}
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={refreshControl}
      >
        <OrderItem
          product={product}
          quantity={inputQuantity}
          totalAmount={totalAmount}
          inputHandler={inputHandler}
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => {
          submitOrder();
        }}
      >
        <Text style={styles.buttonText}>PAY by</Text>
        <FontAwesome name="cc-paypal" size={40} color="#3b7bbf" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderBox: {
    flex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  orderButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
    padding: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginRight: 5,
    textAlign: "center",
  },
  textInput: {
    width: "100%",
    marginVertical: 20,
    padding: 10,
    borderWidth: 1,
    height: 40,
  },
  amountText: {
    fontSize: 20,
    alignSelf: "flex-end",
  },
});
