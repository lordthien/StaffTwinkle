import React from "react";
import { Text, View, StyleSheet, Switch } from "react-native";

function SwitchButton({ titleSaveMe }) {
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#898B9A", true: "#FF6C44" }}
        ios_backgroundColor="#898B9A"
        thumbColor={"#ffffff"}
        onValueChange={() => {}}
        value={false}
      />
      <Text style={styles.saveMeText}>{titleSaveMe}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  saveMeText: {
    marginLeft: 8,
    //fontFamily: "SVN-Gilroy-Regular",
    color: "#898B9A",
  },
});
export default SwitchButton;
