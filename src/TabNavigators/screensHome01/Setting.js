import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import ImageUser from "./ComponentProfile/ImageUser";
import BoxSetting from "./ComponentSetting/BoxSetting";
import * as SecureStore from "expo-secure-store";

const url = "http://149.28.137.174:5000/app/staff";

export default function Setting({ navigation }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    address: "",
    avatar: "",
  });
  useEffect(() => {
    async function getInformation() {
      let result = JSON.parse(await SecureStore.getItemAsync("staff"));
      console.log(result)
      setData(result);
    }
    getInformation();
    return;
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.editContainer}>
          <Text style={{ fontSize: 16, color: "#FF6C44" }}></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <ImageUser avatar={data.avatar} />
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.boxContainer}
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <MaterialCommunityIcons
            name="human-greeting"
            size={24}
            color="black"
          />
          <View style={styles.textAndIcon}>
            <Text style={styles.textContainer}>Information</Text>
            <AntDesign name="right" size={18} color="black" />
          </View>
        </TouchableOpacity>
        <BoxSetting navigation={navigation} />
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
  infoContainer: {
    flex: 1,
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

  boxContainer: {
    flexDirection: "row",
    height: 55,
    backgroundColor: "#bdc3c750",
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 16,
    marginTop: 12,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 12,
  },
  textAndIcon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    fontSize: 16,
    marginLeft: 12,
  },
});
