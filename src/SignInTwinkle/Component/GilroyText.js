import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

function GilroyText({ children, textSign, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.textColor}>{textSign}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  text: {
    color: "#898B9A",
  },
  textColor: {
    color: "#FF6C44",
  },
});

export default GilroyText;
