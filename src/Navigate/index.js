import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Login from "../SignInTwinkle/SignIn/Login";
import PasswordRecovery from "../SignInTwinkle/PasswordRecovery/PasswordRecovery";
import OTP from "../SignInTwinkle/OTPAuthen/OTP";
import ResetPassword from "../SignInTwinkle/PasswordRecovery/ResetPassword";
import ResetPasswordComplete from "../SignInTwinkle/PasswordRecovery/ResetPasswordComplete";

import BottomTab_Home01 from "../TabNavigators/BottomTab_Home01";
import Profile from "../TabNavigators/screensHome01/ComponentProfile/Profile";

const Stack = createStackNavigator();

export default function Navigate() {
  return (
    <Stack.Navigator /*headerMode="screen"*/>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      {/* ---------------------------- */}
      <Stack.Screen
        name="Home01"
        component={BottomTab_Home01}
        options={{
          headerShown: false,
        }}
      />
      {/* -------------------------- */}
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      {/* ------------------- */}
      <Stack.Screen
        name="OTP"
        component={OTP}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordRecovery"
        component={PasswordRecovery}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPasswordComplete"
        component={ResetPasswordComplete}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
