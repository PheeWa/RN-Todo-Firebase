import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeProvider, useTheme } from "react-native-paper";
import { Todo as TodoType } from "../App";
import { View } from "../components/View";
import { TodoContext } from "../Hooks/TodoContext";
import { Todo } from "./Todo";

export const TodoList = () => {
  const todoContext = useContext(TodoContext);
  // console.log(todoContext.todoList);
  const theme = useTheme();

  const UndoneScreen = () => {
    return (
      <View>
        {todoContext.todoList.map((todo: TodoType) => {
          if (todo.isDone === false) {
            return <Todo key={todo.id} todo={todo} />;
          }
        })}
      </View>
    );
  };

  const DoneScreen = () => {
    return (
      <View>
        {todoContext.todoList.map((todo: TodoType) => {
          if (todo.isDone === true) {
            return <Todo key={todo.id} todo={todo} />;
          }
        })}
      </View>
    );
  };

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }

          return null;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarAllowFontScaling: true,
        tabBarLabelStyle: { fontSize: 16 },
      })}
    >
      <Tab.Screen name="Curent tasks" component={UndoneScreen} />
      <Tab.Screen name="Completed tasks" component={DoneScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
  },
});
