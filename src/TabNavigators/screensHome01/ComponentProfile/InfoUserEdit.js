import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function InfoUser({ navigation }) {
  return (
    <View style={styles.textContainer}>
      <View style={styles.boxContainer}>
        <Text style={styles.nameContainer}>Name</Text>
        <Text style={styles.textName}>David Copperfill</Text>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.nameContainer}>Email</Text>
        <Text style={styles.textName}>ngongocthien@dtu.edu.vn</Text>
      </View>
      <View style={styles.boxContainer}>
        <Text style={styles.nameContainer}>Phone Number</Text>
        <Text style={styles.textName}>0705112199</Text>
      </View>
      <TouchableOpacity style={styles.boxContainer}>
        <Text style={styles.nameContainer}>Password</Text>
        <Text style={styles.textName}>*********</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    marginTop: 12,
  },
  boxContainer: {
    backgroundColor: "#bdc3c750",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 12,
  },
  nameContainer: {
    fontSize: 14,
    fontWeight: "500",
    color: "gray",
  },
  textName: {
    fontSize: 14,
    fontWeight: "500",
  },
  textSave: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
});
