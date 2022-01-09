import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProductItem({ product, pressHandler }) {
  const defaultImage = "https://reactnative.dev/img/tiny_logo.png";

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => pressHandler(product)}
    >
      {/* Product item image */}
      <Image
        style={styles.logo}
        source={{
          uri:
            product.picture == null || product.picture == ""
              ? defaultImage
              : product.picture,
        }}
      />

      {/* product item info display box*/}
      <View style={styles.infoBox}>
        <Text style={styles.title}>{product.name}</Text>
        <View>
          <Text>{product.description}</Text>
          <Text>Qty: {product.quantity}</Text>
          <Text>Price: ${product.price}</Text>
          <Text>Last Update: {product.updated}</Text>
        </View>
      </View>

      {/* https://icons.expo.fyi/ */}
      <MaterialIcons
        name="add-shopping-cart"
        size={32}
        color="skyblue"
        style={styles.rightIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    backgroundColor: "white",
  },
  logo: {
    width: 50,
    resizeMode: "center",
  },
  infoBox: {
    marginHorizontal: 20,
    flexGrow: 1,
  },
  rightIcon: {
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
