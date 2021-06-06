import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationScreen({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [token, setToken] = useState("");

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
    if (notification) {
      const url = "http://149.28.137.174:5000/app/staff/nearestBook";
      getToken();
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
          await SecureStore.setItemAsync("noti", "");
          // if(!String(noti).includes(String(result.book._id)))
          console.log(
            `Lịch hẹn với KH ${result.book.customer.name}`,
            `Còn 30 phút là tới lịch hẹn ${result.book.services[0].name}`,
            60 * 30 * 1000 + 1500
          );
          await schedulePushNotification(
            `Lịch hẹn với KH ${result.book.customer.name}`,
            `Còn 30 phút là tới lịch hẹn ${result.book.services[0].name}`,
            60 * 30 * 1000 + 1500
            // (result.schedule.getTime() - (new Date()).getTime())
            // result.book.schedule.getTime() - new Date().getTime()
          );
          if (noti == "" || noti == null)
            await SecureStore.setItemAsync("noti", result.book._id);
          else await SecureStore.setItemAsync("noti", noti + result.book._id);
        });
    }
  }, [notification]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification("", "", 60 * 30 * 1000 + 2000);
        }}
      />
    </View>
  );
}

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
