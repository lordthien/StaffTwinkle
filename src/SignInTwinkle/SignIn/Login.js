import React, { useEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, Alert } from "react-native";
import axios from "axios";

import Logo from "../Component/Logo";
import Header from "../Component/Header";
import MiddleInput from "../Component/MiddleInput";
import SwitchButton from "../Component/SwitchButton";
import GilroyText from "../Component/GilroyText";
import Button from "../Component/Button";

import * as SecureStore from "expo-secure-store";

const url = "http://149.28.137.174:5000/app/staff";

function Login({ navigation }) {
  const [store, setStore] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignIn = async () => {
    const data = {
      store: store.toLowerCase(),
      username: username.toLowerCase(),
      password: password,
    };
    //cattocathien - andoq - 123123
    let response = await fetch(`${url}/login`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
    if (response.status !== "Success") {
      Alert.alert("Thông báo", response.error);
    } else {
      try {
        await SecureStore.setItemAsync("token", response.token);
        await SecureStore.setItemAsync(
          "staff",
          JSON.stringify({
            id: response.staff._id,
            avatar: response.staff.avatar,
            name: response.staff.name,
            email: response.staff.email,
            address: response.staff.address,
          })
        );
      } catch (error) {
        Alert.alert(error);
      } finally {
        navigation.navigate("Home01");
      }
    }
  };

  useEffect(() => {
    const SignOut = async () => {
      let token = await SecureStore.getItemAsync("token");
      if (token) {
        let logout = await fetch(`${url}/logout`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .catch((error) => {
            console.log(error);
          });
        console.log(logout);
        if (logout.status == "Success")
          Alert.alert("Thông báo", "Đăng xuất thành công");
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("staff");
      }
    };
    SignOut();
  });

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
        {/* S */}
        <MiddleInput
          textLable="Store"
          input="Enter Name Store"
          icon="check-circle-outline"
          onChangeText={(text) => {
            setStore(text);
          }}
        />
        {/* EMAIL */}
        <MiddleInput
          textLable="User Name"
          input="Enter User Name"
          icon="check-circle-outline"
          onChangeText={(text) => {
            setUsername(text);
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
