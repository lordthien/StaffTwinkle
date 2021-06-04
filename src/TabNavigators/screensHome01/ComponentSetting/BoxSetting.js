import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function BoxSetting({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.boxContainer}>
        <MaterialIcons name="language" size={24} color="black" />
        <View style={styles.textAndIcon}>
          <Text style={styles.textContainer}>Languages</Text>
          <AntDesign
            name="right"
            size={18}
            color="black"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boxContainer}>
        <AntDesign name="questioncircleo" size={24} color="black" />
        <View style={styles.textAndIcon}>
          <Text style={styles.textContainer}>FAQs</Text>
          <AntDesign
            name="right"
            size={18}
            color="black"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boxContainer}>
        <MaterialIcons name="lock-outline" size={24} color="black" />
        <View style={styles.textAndIcon}>
          <Text style={styles.textContainer}>Private Policy</Text>
          <AntDesign
            name="right"
            size={18}
            color="black"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boxContainer}>
        <Feather name="headphones" size={24} color="black" />
        <View style={styles.textAndIcon}>
          <Text style={styles.textContainer}>Support</Text>
          <AntDesign
            name="right"
            size={18}
            color="black"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.boxContainer} onPress={()=> {navigation.navigate("Login")}}>
        <Feather name="log-out" size={24} color="black" />
        <View style={styles.textAndIcon}>
          <Text style={styles.textContainer}>Sign out</Text>
          <AntDesign
            name="right"
            size={18}
            color="black"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
