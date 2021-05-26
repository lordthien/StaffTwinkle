import React from "react";
import { SafeAreaView, View, StyleSheet, Alert } from "react-native";
import axios from "axios";

import Logo from "../Component/Logo";
import Header from "../Component/Header";
import MiddleInput from "../Component/MiddleInput";
import SwitchButton from "../Component/SwitchButton";
import GilroyText from "../Component/GilroyText";
import Button from "../Component/Button";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const url = "https://training.softech.cloud/api/users/login";

function Login({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //Thien@gmail.com
  //1234
  const onSignIn = () => {
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(url, data)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log("--------------------------------");
        if (response.data.ok === false) {
          Alert.alert(
            "Thông báo",
            "Email của bạn chưa đăng ký. Vui lòng kiểm tra lại!"
          );
        } else {
          navigation.navigate("Home01");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Begin: Logo */}
      <View style={styles.logoContainer}>
        <Logo
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
      {/* End: Logo */}
      {/* --------------------------------------------------------------------- */}
      {/* Begin: Header */}
      <View style={styles.headerContainer}>
        <Header
          title="Let's Sign You In"
          decription="Welcome back, you've been missed!"
        />
      </View>
      {/* End: Header */}
      {/* --------------------------------------------------------------------- */}
      {/* Begin: Middle */}
      <View style={styles.middleContainer}>
        {/* EMAIL */}
        <MiddleInput
          textLable="Email"
          input="Enter Email"
          icon="check-circle-outline"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        {/* --------------------------------- */}
        {/* PASSWORD */}
        <MiddleInput
          textLable="Password"
          input="Enter your password"
          hidePass={true}
          secureTextEntry="true"
          icon="eye-outline"
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        {/* --------------------------------- */}
        {/* SAVE ME & FORGOT */}
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <SwitchButton titleSaveMe="Save me" />
          <GilroyText
            textSign="Forgot password"
            onPress={() => {
              navigation.navigate("PasswordRecovery");
            }}
          />
        </View>
        {/* --------------------------------- */}
        {/* LOGIN */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Button
            color="#FF6C44"
            titleColor="white"
            title="Sign In"
            onPress={onSignIn}
          />
        </View>
      </View>
      {/* End: Middle */}
      {/* --------------------------------------------------------------------- */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flex: 1,
    height: 60,
    marginTop: 24,
  },
  middleContainer: {
    flex: 4,
  },
  dontAccountContainer: {
    flex: 1,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  bottomContainer: {
    flex: 1.5,
  },
});

export default Login;
