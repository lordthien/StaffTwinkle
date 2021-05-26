import React from "react";
import { Text, StyleSheet, View, Image, TextInput } from "react-native";

import Logo from "../Component/Logo";
import Header from "../Component/Header";
import Square from "./Square";
import GilroyText from "../Component/GilroyText";
import Button from "../Component/Button";

function OTP({}) {
  return (
    <View style={styles.container}>
      <Logo />
      <Header
        title="OTP Authentication"
        decription="An authentication code has been sent to"
        dec="nnthien.242@gmail.com"
      />
      <View style={styles.squareContainer}>
        <Square textInput="." />
        <Square textInput="." />
        <Square textInput="." />
        <Square textInput="." />
      </View>
      <View style={styles.codeContainer}>
        <GilroyText children="Didn’t receive code." />
        <GilroyText textSign="Resend ( 60s )" />
      </View>

      <View style={styles.bottom}>
        <View style={styles.buttonContainer}>
          <Button color="#FF6C44" titleColor="white" title="Sign In" />
        </View>
        <View style={styles.textBottom}>
          <GilroyText children="By Signing up, you agree to our." />
          <GilroyText
            textSign="Term and Conditions"
            style={{ marginTop: 16 }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  squareContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 24,
  },
  codeContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  bottom: {
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
  },
  textBottom: {
    flex: 1,
    marginTop: 16,
  },
});
export default OTP;
