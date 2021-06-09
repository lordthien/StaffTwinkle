import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Feather as Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import Calendar2 from "../Calendar/Calendar2";
import Calendar from "../Calendar/Calendar2";
import NavigateInfo from "../NavigateInfo";
import NotificationScreen from "./screensHome01/NotificationScreen";

const Tab = createBottomTabNavigator();

export default function BottomTab_Home01() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FBFBFB",
      }}
    >
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            height: 88,
            paddingHorizontal: 24,
            borderRadius: 24,
            backgroundColor: "#c8d6e5",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        sceneContainerStyle={{
          backgroundColor: "#FBFBFB",
        }}
      >
        <Tab.Screen
          name="Calendar"
          component={Calendar}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return (
                  <View style={styles.tabButton}>
                    <Feather name="home" size={size * 0.8} color="white" />
                    <Text style={styles.label}>Home</Text>
                  </View>
                );
              } else {
                return <Feather name="home" size={size * 0.8} color={color} />;
              }
            },
          }}
        />

        <Tab.Screen
          name="NavigateInfo"
          component={NavigateInfo}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return (
                  <View style={styles.tabButton}>
                    <AntDesign name="setting" size={size * 0.8} color="white" />
                    <Text style={styles.label}>Seting</Text>
                  </View>
                );
              } else {
                return (
                  <AntDesign name="setting" size={size * 0.8} color={color} />
                );
              }
            },
          }}
        />
        {/* <Tab.Screen
          name="NotificationScreen"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return (
                  <View style={styles.tabButton}>
                    <Feather name="bell" size={size * 0.8} color="white" />
                    <Text style={styles.label}>Alert</Text>
                  </View>
                );
              } else {
                return <Feather name="bell" size={size * 0.8} color={color} />;
              }
            },
          }}
        /> */}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  tabButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    minWidth: 150,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#FF6C44",
  },
  label: {
    marginLeft: 8,
    color: "white",
    fontSize: 14,
  },
});
