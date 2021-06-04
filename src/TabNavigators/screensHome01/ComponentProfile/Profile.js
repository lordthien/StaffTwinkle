/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import * as SecureStore from "expo-secure-store";
import { AntDesign } from "@expo/vector-icons";
import ImageUser from "./ImageUser";
import InfoUserEdit from "./InfoUserEdit";

const url = "http://149.28.137.174:5000/app/staff";

function Profile({ navigation }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    avatar: "",
  });
  useEffect(() => {
    async function getInformation() {
      let result = JSON.parse(await SecureStore.getItemAsync("staff"));
      console.log(result);
      setData(result);
    }
    getInformation();
    return;
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <AntDesign
            name="left"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("Setting");
            }}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 12, fontSize: 16 }}>Profile</Text>
        <TouchableOpacity style={styles.editContainer}>
          <Text
            style={{ fontSize: 16, color: "#FF6C44" }}
            onPress={() => {
              navigation.navigate("ProfileEdit");
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <ImageUser avatar={data.avatar} />
      </View>
      <View style={styles.infoContainer}>
        <InfoUserEdit
          name={data.name}
          email={data.email}
          address={data.address}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    height: 43,
    alignItems: "center",
  },

  iconContainer: {
    height: 40,
    width: 40,
    backgroundColor: "#bdc3c787",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginLeft: 12,
  },
  editContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 24,
  },
  imageContainer: {
    flex: 0.4,
  },
  infoContainer: {
    flex: 1,
  },
});

export default Profile;
