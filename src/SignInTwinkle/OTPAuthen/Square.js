import React from "react";
import { Text, StyleSheet, View, TextInput } from "react-native";

function Square({textInput}) {
  return (
    <View style={styles.square}>
      <TextInput style={styles.textInputContainer} placeholder={textInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  square: {
    height: 65,
    width: 65,
    backgroundColor: "#F5F5F8",
    marginTop: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputContainer: {
    height: 65,
    fontSize: 20,
    color: "#898B9A",
  },
});
export default Square;
