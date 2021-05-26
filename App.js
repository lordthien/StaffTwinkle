import React, { Component } from "react";
import { View, SafeAreaView, Platform } from "react-native";

import Calendar from "./src/Calendar/Calendar";
import AppNavigator from "./AppNavigator";


class App extends Component {
  render() {
    return <AppNavigator />
    return (
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            minWidth: 375,
            minHeight: Platform.OS === "web" ? 812 : null,
          }}
        >
          <Calendar />
        </View>
      </SafeAreaView>
    );
  }
}

export default App;
