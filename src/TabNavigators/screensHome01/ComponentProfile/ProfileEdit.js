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

function ProfileEdit({ navigation }) {
  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    address: "",
    avatar: "",
  });
  useEffect(() => {
    async function getInformation() {
      let data = JSON.parse(await SecureStore.getItemAsync("staff"));
      setData(data);
    }
    getInformation();
    return;
  }, []);
  let onPressSave = () => {
    let link = `http://149.28.137.174:5000/app/cancel?id=${id}`;
    // axios
    //   .post(link, {
    //     headers: {
    //       "Authorization": `Bearer ${token}`,
    //     },
    //   })
    fetch(link, {
      method: "POST", // or 'PUT'
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        navigation.navigate("Profile");
        if (res.status == "Success")
          Alert.alert("Thông báo", "Đã thay đổi thông tin.");
      })
      .catch((err) => {
        throw err;
      });
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <AntDesign
            name="left"
            size={24}
            color="black"
            onPress={() => {
              navigation.navigate("Profile");
            }}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 12, fontSize: 16 }}>Profile</Text>
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
      <View style={styles.saveContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={onPressSave}
        >
          <Text style={styles.textSave}>Save</Text>
        </TouchableOpacity>
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
  imageContainer: {
    flex: 0.4,
  },
  infoContainer: {
    flex: 0.5,
  },

  textSave: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },

  saveContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    height: 50,
    width: 200,
    borderRadius: 12,
    backgroundColor: "#FF6C44",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileEdit;
