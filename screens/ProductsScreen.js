import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ProductItem from "../components/ProductItem";

export default function ProductsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [productsList, setProductsList] = useState([
    {
      id: 1,
      name: "pearl",
      price: "99.99",
      discount: 1.0,
      quantity: 10,
      description: "This is a pearl",
      picture: "",
      created: "2018-12-22",
      updated: "2019-02-16",
    },
    {
      id: 2,
      name: "Apple",
      price: "1.99",
      discount: 1.0,
      quantity: 90,
      description: "This is an apple",
      picture: "",
      created: "2018-12-22",
      updated: "2019-02-16",
    },
  ]);

  // item pressed handler, send product data to OrderScreen
  const pressHandler = (product) => {
    navigation.navigate("Order", {
      product: product,
    });
  };

  function fetchProducts() {
    setIsLoading(true);
    console.log("fetching product list from server ...");
    const newProductsList = productsList;
    setProductsList(newProductsList);
    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>Products</Text>
      {productsList.length > 0 ? (
        <FlatList
          data={productsList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <ProductItem product={item} pressHandler={pressHandler} />
          )}
          refreshing={isLoading}
          onRefresh={() => fetchProducts()}
        />
      ) : (
        <View style={styles.emptyView}>
          <Text>No Products</Text>
          <Button title="Refresh" onPress={() => fetchProducts()} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topText: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
