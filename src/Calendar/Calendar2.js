import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import { Agenda } from "react-native-calendars";
import * as SecureStore from "expo-secure-store";

// const testIDs = require("./testID");
const url = "http://149.28.137.174:5000/app/staff";

let today = new Date();

export default class Calendar2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      books: [],
    };
  }

  componentDidMount = async () => {
    let token = await SecureStore.getItemAsync("token");
    let result = await fetch(`${url}/unpaidBooks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
    this.setState({ books: result.books });
    // loadItems();
  };

  loadItems = (day) => {
    let items = {};
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!items[strTime]) {
        items[strTime] = [];
        this.state.books
          .filter((book) => {
            let date = new Date(book.schedule);
            date = `${date.getFullYear()}-${
              date.getMonth() > 8
                ? date.getMonth() + 1
                : "0" + Number(date.getMonth() + 1)
            }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
            if (strTime == date) {
              book.tokens = [];
              book.customer.tokens = [];
              return book;
            }
          })
          .forEach((book) => items[strTime].push(book));
      }
    }
    let newItems = {};
    Object.keys(items).forEach((key) => {
      newItems[key] = items[key];
    });
    this.setState({ items: newItems });
  };

  setPaid = async (item) => {
    let token = await SecureStore.getItemAsync("token");
    fetch(`${url}/setPaid?id=${item._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(async (res) => {
        if (res.status == "Success") {
          let token = await SecureStore.getItemAsync("token");
          let result = await fetch(`${url}/unpaidBooks`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .catch((error) => {
              console.log(error);
            });
          this.setState({ books: result.books });
          this.loadItems({
            timestamp: new Date(
              `${today.getFullYear()}-${
                today.getMonth() > 8
                  ? Number(today.getMonth() + 1)
                  : "0" + Number(today.getMonth() + 1)
              }-${
                today.getDate() < 10 ? "0" + today.getDate() : today.getDate()
              }`
            ).getTime(),
          });
          Alert.alert(
            `Thông báo: \n${item.customer.name}`,
            `Vào lúc ${new Date()
              .toTimeString("VN")
              .slice(0, 5)} - ngày ${new Date(item.schedule).toLocaleDateString(
              "VN"
            )} đã thanh toán đơn hàng.`
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // setPaid = async (item) => {
  //   let token = await SecureStore.getItemAsync("token");
  //   fetch(`${url}/setPaid?id=${item._id}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.status == "Success")
  //         Alert.alert(
  //           `Thông báo: \n${item.customer.name}`,
  //           `Vào lúc ${new Date()
  //             .toTimeString("VN")
  //             .slice(0, 5)} - ngày ${new Date(item.schedule).toLocaleDateString(
  //             "VN"
  //           )} đã thanh toán đơn hàng.`
  //         );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  renderItem = (item) => {
    return (
      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={{ width: 170 }}
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
        <View style={styles.boxRight}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>Trạng thái</Text>
            <Text style={styles.text}>{item.status}</Text>
          </View>
          <TouchableOpacity
            disabled={item.status == "PAID" ? true : false}
            onPress={() => this.setPaid(item)}
            style={item.status == "PAID" ? styles.boxFuncPaid : styles.boxFunc}
          >
            <Text style={styles.textBoxBold}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No books on this date</Text>
      </View>
    );
  };

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Agenda
          items={this.state.items}
          // loadItemsForMonth={this.loadItems.bind(this)}
          loadItemsForMonth={this.loadItems}
          minDate={`${today.getFullYear()}-${
            today.getMonth() > 8
              ? Number(today.getMonth() + 1)
              : "0" + Number(today.getMonth() + 1)
          }-${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}`}
          maxDate={`${today.getFullYear()}-${
            today.getMonth() > 6
              ? Number(today.getMonth() + 3)
              : "0" + Number(today.getMonth() + 3)
          }-${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}`}
          // renderItem={this.renderItem.bind(this)}
          renderItem={this.renderItem}
          // renderEmptyDate={this.renderEmptyDate.bind(this)}
          // rowHasChanged={this.rowHasChanged.bind(this)}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
        />
      </SafeAreaView>
    );
  }
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
    backgroundColor: "#bdc3c790",
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    marginRight: 12,
    justifyContent: "center",
  },
  boxContainer: {
    backgroundColor: "#bdc3c790",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 12,
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
