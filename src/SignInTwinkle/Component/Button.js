import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";

function Button({ color, onPress, icon, image, titleColor, title }) {
  return (
    <TouchableOpacity
      style={[styles.loginButton, { backgroundColor: color }]}
      onPress={onPress}
    >
      {icon}
      {image}
      <Text style={[styles.loginText, { color: titleColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginTop: 12,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  loginText: {
    marginLeft: 8,
    color: "#FF6C44",
    fontSize: 16,
  },

  textContainer: {
    fontSize: 16,
    color: "#FF6C44",
    marginLeft: 8,
  },
});

export default Button;
