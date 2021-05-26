import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";

import axios from "axios";

import Logo from "../Component/Logo";
import Header from "../Component/Header";
import MiddleInput from "../Component/MiddleInput";
import Button from "../Component/Button";

const url = "https://training.softech.cloud/api/users/forgot-password";

function PasswordRecovery({ navigation }) {
  const [email, setEmail] = React.useState("");
  //     ngothanhtung.it@outlook.com ngocthien@gmail.com
  const onForgotPassword = () => {
    const data = {
      email: email,
    };
    axios
      .post(url, data)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log("--------------------------------");
        if (response.data.success === false) {
          Alert.alert(
            "Thông báo",
            "Email của bạn chưa đăng ký. Vui lòng kiểm tra lại!"
          );
        } else {
          navigation.navigate("ResetPassword");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          textLable="Email"
          input="Enter Email"
          icon="check-circle-outline"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        {/* LOGIN */}
        <View>
          <Button
            color="#FF6C44"
            titleColor="white"
            title="Send Email"
            onPress={onForgotPassword}
            // onPress={() => {
            //   navigation.navigate("ResetPassword");
            // }}
          />
        </View>
        {/* <Text>{this.state.email}</Text> */}
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
});
export default PasswordRecovery;
