import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

function MiddleInput({ textLable, input, onChangeText, icon, hidePass }) {
  return (
    <View style={styles.container}>
      <Text style={styles.textEmail}>{textLable}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputText}
          placeholder={input}
          secureTextEntry={hidePass}
          onChangeText={(text) => {
            onChangeText(text);
          }}
        />
        <Icon style={styles.icon} name={icon} size={24} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  textEmail: {
    fontSize: 14,
    color: "#898B9A",
  },
  inputContainer: {
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
    padding: 12,
    marginTop: 8,
    borderRadius: 12,
  },
  inputText: {
    fontSize: 14,
    color: "#898B9A",
  },
  icon: {
    color: "#898B9A",
  },
});

export default MiddleInput;
