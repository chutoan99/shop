import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Register from "../screens/register";
import Init from "../screens/init";
import Home from "../screens/home";
import Chat from "../screens/chat";
import Profile from "../screens/profile";


export default function RoutesConfig() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{
            headerShown: false,
          }}
          component={Register}
        />
        <Stack.Screen
          name="Init"
          options={{
            headerShown: false,
          }}
          component={Init}
        />

        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={Home}
        />
        <Stack.Screen
          name="Chat"
          options={{
            headerShown: false,
          }}
          component={Chat}
        />
        <Stack.Screen
          name="Profile"
          options={{
            headerShown: false,
          }}
          component={Profile}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
