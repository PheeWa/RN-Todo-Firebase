import React from "react";
import { StyleSheet } from "react-native";
import { Headline } from "react-native-paper";
import { View } from "../components/View";

import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export const Todos = () => {
  return (
    <View style={styles.container}>
      <Headline style={styles.header}>My todos</Headline>
      <TodoForm />
      <TodoList />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 10,
  },

  container: {
    flex: 1,
  },
});
