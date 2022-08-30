import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { StyleSheet } from "react-native";
import { Todos } from "./pages/Todos";
import {
  DarkTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import { TodoProvider } from "./Hooks/TodoContext";
import { SignIn, SignUp } from "./pages/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogIn } from "./pages/LogIn";

export type Todo = {
  id: number;
  name: string;
  isDone: boolean;
};

const theme = {
  ...DefaultTheme,
  roundness: 3,
  version: 3,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: "#fec47c",
    background: "#080a0b",
    // onSurface: "#1a1c1e",
    surface: "#1a1c1e",

    secondary: "#01c400",
  },
};

export const CombinedDarkTheme = {
  ...theme,
  ...NavigationDarkTheme,
  colors: {
    ...theme.colors,
    ...NavigationDarkTheme.colors,
    card: theme.colors.background,
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={CombinedDarkTheme}>
        <TodoProvider>
          <SafeAreaView style={styles.container}>
            <Stack.Navigator screenOptions={{ title: "" }}>
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="LogIn" component={LogIn} />
              <Stack.Screen name="Todos" component={Todos} />
            </Stack.Navigator>
          </SafeAreaView>
        </TodoProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
