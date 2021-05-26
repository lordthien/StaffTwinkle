import React from "react";
import { Text, View, StyleSheet } from "react-native";

function Header({ title, decription, dec }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.decriptionText}>{decription}</Text>
      <Text style={styles.decriptionText}>{dec}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    color: "#111A2C",
  },
  decriptionText: {
    marginTop: 8,
    fontSize: 14,
    color: "#525C67",
  },
});

export default Header;
