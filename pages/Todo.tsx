import React, { useContext, useState } from "react";
import {
  IconButton,
  Checkbox,
  Divider,
  Menu,
  Text,
  TextInput,
  Dialog,
  Button,
  Portal,
} from "react-native-paper";
import { Todo as TodoType } from "../App";
import { StyleSheet } from "react-native";
import { View } from "../components/View";
import { useTheme } from "@react-navigation/native";
import { TodoContext, todoActions } from "../Hooks/TodoContext";

type Props = {
  todo: TodoType;
};

export const Todo = (props: Props) => {
  const todoContext = useContext(TodoContext);

  const [visible, setVisible] = useState(false);
  const [text, setText] = useState(props.todo.name);
  const [isEdit, setIsEdit] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const editTodo = (text: string, id: number) => {
    todoContext.dispatch({ type: todoActions.edit, name: text, id: id });
    setIsEdit(false);
  };

  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.leftSubContainer}>
        <Checkbox.Android
          status={props.todo.isDone ? "checked" : "unchecked"}
          onPress={() => {
            todoContext.dispatch({
              type: todoActions.toggle,
              id: props.todo.id,
            });
          }}
          disabled={false}
          color={props.todo.isDone ? "#fec47c" : "grey"}
        />

        <Text
          style={{
            textDecorationLine: props.todo.isDone ? "line-through" : "none",
          }}
        >
          {props.todo.name}
        </Text>
      </View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="dots-vertical"
            onPress={openMenu}
            // color={props.todo.isDone ? "red" : "black"}
          />
        }
      >
        {!props.todo.isDone ? (
          <Menu.Item
            onPress={() => {
              setIsEdit(true);
            }}
            title="Edit"
          />
        ) : null}
        <Menu.Item
          onPress={() => {
            todoContext.dispatch({
              type: todoActions.delete,
              id: props.todo.id,
            });
          }}
          title="Delete"
        />
        <Divider />
      </Menu>
      <Portal>
        <Dialog
          visible={isEdit}
          onDismiss={() => {
            setIsEdit(false);
          }}
        >
          <Dialog.Title>Change your task</Dialog.Title>
          <Dialog.Content>
            <TextInput value={text} onChangeText={(text) => setText(text)} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setIsEdit(false);
              }}
            >
              Cancel
            </Button>
            <Button onPress={() => editTodo(text, props.todo.id)}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
