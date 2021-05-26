import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";

import Svg, { SvgXml } from "react-native-svg";

import Logo from "../Component/Logo";
import Header from "../Component/Header";
import svgComplete from "./svgComplete";
import Button from "../Component/Button";

function ResetPasswordComplete({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
      <View style={styles.headerContainer}>
        <Header
          title="Congratulations!"
          decription="You successfully rest your password."
          dec="Now you are good to go"
        />
      </View>
      <View style={styles.middleContainer}>
        {/* IMAGE */}
        <View style={styles.imageContainer}>
          <SvgXml xml={svgComplete} />
        </View>

        {/* LOGIN */}
        <View style={styles.buttonContainer}>
          <Button
            color="#FF6C44"
            titleColor="white"
            title="Jump Into Log In"
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logoContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
  },
  middleContainer: {
    flex: 4,
  },
  imageContainer: {
    flex: 3,
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 24,
  },
});
export default ResetPasswordComplete;
