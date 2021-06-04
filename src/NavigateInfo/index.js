import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Profile from "../TabNavigators/screensHome01/ComponentProfile/Profile";
import Setting from "../TabNavigators/screensHome01/Setting";
import ProfileEdit from "../TabNavigators/screensHome01/ComponentProfile/ProfileEdit";

const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
