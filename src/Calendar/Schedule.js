import React, { useState, useEffect, Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";

export default function Schedule (props) {
  let item = props.item
  let setPaid = props.setPaid
  return (
    <View style={styles.boxContainer}>
      <TouchableOpacity
        style={{ width: 170 }}
        // testID={testIDs.agenda.ITEM}
        onPress={() =>
          Alert.alert(
            `Lịch hẹn của KH:\n${item.customer.name}`,
            `Vào lúc ${new Date(item.schedule)
              .toTimeString("VN")
              .slice(0, 5)} - ngày ${new Date(
              item.schedule
            ).toLocaleDateString("VN")}`
          )
        }
      >
        <View style={{ marginBottom: 8 }}>
          <Text style={styles.textBold}>Khách hàng:</Text>
          <Text style={styles.textName}>{item.customer.name}</Text>
        </View>
        <Text style={styles.textBold}>Dịch vụ:</Text>
        {item.services.map((ser, i) => (
          <Text key={i} style={styles.text}>
            + {ser.name}
          </Text>
        ))}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.textBold}>Phải thu:</Text>
          <Text style={{ fontSize: 15 }}> {item.cost / 1000}K</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <View style={{}}>
          <Text style={styles.text}>Trạng thái</Text>
          <Text style={styles.text}>{item.status}</Text>
        </View>
        <TouchableOpacity
          disabled={item.status == "PAID" ? true : false}
          onPress={() => {
            setPaid(item)
          }}
          style={item.status == "PAID" ? styles.boxFuncPaid : styles.boxFunc}
        >
          <Text style={styles.textBoxBold}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    backgroundColor: "#bdc3c7",
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    marginRight: 12,
    justifyContent: "center",
  },
  boxContainer: {
    backgroundColor: "#bdc3c7",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 12,
    // marginBottom: 12,
    marginRight: 12,
  },
  boxFunc: {
    backgroundColor: "#FF6C44",
    height: 40,
    width: 90,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  boxFuncPaid: {
    backgroundColor: "#FF6C4450",
    height: 40,
    width: 90,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  boxRight: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  textName: {
    fontSize: 15,
    marginTop: 4,
  },
  text: {
    fontSize: 15,
    marginTop: 4,
    marginBottom: 5,
  },
  textBold: {
    fontSize: 15,
    fontWeight: "600",
  },
  textBoxBold: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});
