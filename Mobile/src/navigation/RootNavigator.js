import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MainTabs from "./MainTabs";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AdminLoginScreen from "../screens/AdminLoginScreen";
import AdminScreen from "../screens/AdminScreen";

import { colors } from "../theme";

// Use the JS-only stack navigator so the app works on web (no native modules).
// On Android/iOS you can switch back to createNativeStackNavigator if desired.
const Stack = createStackNavigator();

/**
 * Root stack mapping of the original web routes:
 *   /            -> Tabs (Home)
 *   /order       -> Order (tab)
 *   /contact     -> Contact (tab)
 *   /login       -> LoginScreen
 *   /register    -> RegisterScreen
 *   /profile     -> Profile (tab)
 *   /admin/login -> AdminLoginScreen
 *   /admin       -> AdminScreen
 */
export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.surface },
      }}
    >
      <Stack.Screen name="Tabs" component={MainTabs} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
    </Stack.Navigator>
  );
}