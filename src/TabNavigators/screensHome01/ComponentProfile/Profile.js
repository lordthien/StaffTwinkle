/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import ImageUser from "./ImageUser";
import InfoUserEdit from "./InfoUserEdit";

function Profile({ navigation }) {
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
      </View>
      <View style={styles.imageContainer}>
        <ImageUser />
      </View>
      <View style={styles.infoContainer}>
        <InfoUserEdit />
      </View>
      <View style={styles.saveContainer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            navigation.navigate("Setting");
          }}
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
  editContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 24,
  },
  imageContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
  },

  saveContainer: {
    flex: 1,
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
  textSave: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
});

export default Profile;
