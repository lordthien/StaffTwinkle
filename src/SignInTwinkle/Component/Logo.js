import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

function Logo({onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.logoContainer}
          source={require("../../../assets/Twinkle_Logo.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 286,
    height: 90,
  },
});

export default Logo;
