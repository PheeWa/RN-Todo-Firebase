import { useTheme } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput, ThemeProvider, Text } from "react-native-paper";
import { View } from "../components/View";
import { todoActions, TodoContext } from "../Hooks/TodoContext";

export const TodoForm = () => {
  const [name, setName] = useState("");
  const todoContext = useContext(TodoContext);

  const addTodo = () => {
    todoContext.dispatch({ type: todoActions.add, name: name });
    setName("");
  };

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TextInput
        label="Add new task"
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        style={styles.input}
      />
      <Button style={styles.button} mode="contained" onPress={addTodo}>
        Add
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    width: "80%",
  },
  button: {
    width: "20%",
    justifyContent: "center",
  },
});
