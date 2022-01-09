import React from "react";
import { StyleSheet, View, Modal, Button } from "react-native";
import { WebView } from "react-native-webview";

export default function PaypalView({
  url,
  showModal,
  closeModal,
  paypalHandler,
}) {
  return (
    <Modal visible={showModal} onRequestClose={closeModal}>
      <View style={styles.modalView}>
        <WebView
          source={{ uri: url }}
          onNavigationStateChange={paypalHandler}
          style={{ marginTop: 20 }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    margin: 20,
  },
});
