import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";

import Logo from "../Component/Logo";
import Header from "../Component/Header";
import MiddleInput from "../Component/MiddleInput";
import Button from "../Component/Button";

function ResetPassword({ navigation }) {
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
          title="Password Recovery"
          decription="Please enter your email address to recover"
          dec="your password"
        />
      </View>
      <View style={styles.middleContainer}>
        <MiddleInput
          textLable="New Password"
          input="New Password"
          //icon="check-circle-outline"
        />
        <MiddleInput
          textLable="Confirm Password"
          input="Confirm Password"
          icon="check-circle-outline"
        />
        {/* LOGIN */}
        <View style={styles.buttonContainer}>
          <Button
            color="#FF6C44"
            titleColor="white"
            title="Reset Password"
            onPress={() => {
              navigation.navigate("ResetPasswordComplete");
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
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 24,
  },
});
export default ResetPassword;
