import React, { useReducer, useMemo, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import BottomTabNavigator from "./HomeNavigator";

import { AuthContext } from "./context";

const Stack = createStackNavigator();

export default function MainStackNavigator() {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
    username: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIVE_TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          username: action.username,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userToken: action.token,
          username: action.username,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userToken: null,
          username: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userToken: action.token,
          username: action.username,
          isLoading: false,
        };
    }
  };

  const [state, dispatch] = useReducer(loginReducer, initialLoginState);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let username;

      try {
        userToken = await AsyncStorage.getItem("userToken");
        username = await AsyncStorage.getItem("username");
      } catch (e) {
        // Restoring token failed
        console.log("error:", e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RETRIVE_TOKEN", token: userToken, username: username });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (userToken, username) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("username", username);
        } catch (error) {
          console.log("error in SignIn: ", error);
        }

        dispatch({ type: "LOGIN", token: userToken, username: username });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem("userToken");
        } catch (error) {
          console.log("error", error);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: async (userToken, username) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("username", username);
        } catch (error) {
          console.log("error in SignIn: ", error);
        }
        dispatch({ type: "LOGIN", token: userToken, username: username });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          ) : (
            // User is signed in
            <Stack.Screen
              name="Home"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
