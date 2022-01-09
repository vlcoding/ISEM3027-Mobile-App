import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";

export default function OrderItem({
  product,
  quantity,
  totalAmount,
  inputHandler,
}) {
  const defaultImage = "https://reactnative.dev/img/tiny_logo.png";
  // calculate the discount
  const discountText = ((1 - product.discount) * 100).toFixed(2);

  return (
    // Main container
    <View style={styles.container}>
      {/* display the product image */}
      <Image
        style={styles.logo}
        source={{
          uri:
            product.picture == null || product.picture == ""
              ? defaultImage
              : product.picture,
        }}
      />

      {/* display the product info */}
      <Text style={styles.title}>{product.name}</Text>
      <View style={styles.infoBox}>
        <Text style={styles.text}>{product.description}</Text>
        <Text style={styles.text}>Qty: {product.quantity}</Text>
        <Text style={styles.text}>Price: ${product.price}</Text>
        {product.discount < 1 ? (
          <Text style={styles.text}>
            Discount:{" "}
            <Text style={styles.discountText}>{discountText}% OFF </Text>
          </Text>
        ) : null}
      </View>

      {/* User quantiry input field */}
      <TextInput
        style={styles.textInput}
        value={quantity}
        onChangeText={inputHandler}
        keyboardType="numeric"
      />

      {/* display total amount */}
      <Text style={styles.amountText}>Total: ${totalAmount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
    height: 100,
    width: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  infoBox: {
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 20,
  },
  discountText: {
    fontSize: 20,
    color: "red",
  },
  amountText: {
    fontSize: 20,
    alignSelf: "flex-end",
  },
  textInput: {
    width: "100%",
    marginVertical: 20,
    padding: 10,
    borderWidth: 1,
    height: 40,
  },
});
