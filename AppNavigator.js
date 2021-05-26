import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import BottomTab_Home01 from "./src/TabNavigators/BottomTab_Home01";
import Navigate from "./src/Navigate";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Navigate/>
      {/* <BottomTab_Home01 /> */}
    </NavigationContainer>
  );
}
