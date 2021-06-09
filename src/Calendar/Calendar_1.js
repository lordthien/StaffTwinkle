import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Agenda } from "react-native-calendars";
import * as SecureStore from "expo-secure-store";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// const testIDs = require("./testID");

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Calendar = () => {
  const [books, setBooks] = useState([]);
  const [items, setItems] = useState({});

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [token, setToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  let today = new Date();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  
  useEffect(() => {
    async function getToken() {
      let result = await SecureStore.getItemAsync("token");
      setToken(result);
    }
    getToken();
  });
  useEffect(() => {
    const url = "http://149.28.137.174:5000/app/staff/nearestBook";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(async (result) => {
        let noti = await SecureStore.getItemAsync("noti");
        console.log(result);
        let time =
          new Date(result.book.schedule).getTime() - new Date().getTime();
        if (!noti.includes(result.book._id)) {
          await schedulePushNotification(
            `Lịch hẹn với KH ${result.book.customer.name}`,
            `Còn 30 phút là tới lịch hẹn ${
              result.book.services[0].name
            }. Vào lúc ${new Date(result.book.schedule)
              .toTimeString("VN")
              .slice(0, 5)} - ngày ${new Date(
              result.book.schedule
            ).toLocaleDateString("VN")}`,
            time
          );
          if (noti == "" || noti == null)
            await SecureStore.setItemAsync("noti", result.book._id);
          else if (!noti.includes(result.book._id))
            await SecureStore.setItemAsync("noti", noti + result.book._id);
        }
      });
  }, [notification, token]);

  const url = "http://149.28.137.174:5000/app/staff";

  const getData = async () => {
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
    setBooks(result.books);
  };

  useEffect(() => {
    getData();
    loadItems({
      timestamp: new Date(
        `${today.getFullYear()}-${
          today.getMonth() > 8
            ? Number(today.getMonth() + 1)
            : "0" + Number(today.getMonth() + 1)
        }-${today.getDate() < 10 ? "0" + today.getDate() : today.getDate()}`
      ).getTime(),
    });
  });

  let loadItems = (day) => {
    setTimeout(() => {
      let items = {};
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          books
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
      setItems(newItems);
    }, 1000);
  };

  // let setPaid = async (item) => {
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

  let setPaid = async (item) => {
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
          setBooks({ books: result.books });
          loadItems({
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

  let renderItem = (item) => {
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
              item.status = "PAID"
              setPaid(item)
            }}
            style={item.status == "PAID" ? styles.boxFuncPaid : styles.boxFunc}
          >
            <Text style={styles.textBoxBold}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  let renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No books on this date</Text>
      </View>
    );
  };

  let rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  let timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Agenda
        // testID={testIDs.agenda.CONTAINER}
        items={items}
        loadItemsForMonth={loadItems}
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
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
      />
    </SafeAreaView>
  );
};

async function schedulePushNotification(title, body, time) {
  let second = Math.floor((time - 60 * 30 * 1000) / 1000);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data: "goes here" },
    },
    trigger: { seconds: second },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
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

export default Calendar;
