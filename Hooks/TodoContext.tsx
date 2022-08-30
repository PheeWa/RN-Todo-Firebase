import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import React, { createContext, useReducer } from "react";
import { Todo } from "../App";
import { app } from "../src/firebase/config";

export const todoActions = {
  add: "add",
  edit: "edit",
  delete: "delete",
  toggle: "toggle",
};

const initTodoList: Todo[] = [
  {
    id: 1,
    name: "test 1",
    isDone: false,
  },
  {
    id: 2,
    name: "test 2",
    isDone: true,
  },
  {
    id: 3,
    name: "test 3",
    isDone: false,
  },
];

const saveData = (newTodoList: Todo[]) => {
  const auth = getAuth();
  const firestore = getFirestore(app);
  if (auth.currentUser) {
    const d = doc(firestore, `users/${auth.currentUser.uid}`);
    try {
      setDoc(d, { todoList: newTodoList }, { merge: true });
    } catch (error) {
      alert(error);
    }
  } else {
    alert("error, should log out");
  }
};

export const reducer = (todoList: Todo[], action: any) => {
  switch (action.type) {
    case todoActions.add:
      const newTodo = {
        id: Math.random(),
        name: action.name,
        isDone: false,
      };
      const addedTodoList = [...todoList, newTodo];
      saveData(addedTodoList);

      return addedTodoList;

    case todoActions.edit:
      const editTodoList: any[] = todoList.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, name: action.name };
        }

        return todo;
      });
      // console.log("hahah", editTodoList);
      saveData(editTodoList);
      return editTodoList;

    case todoActions.delete:
      const changedTodo = todoList.filter((todo) => {
        return todo.id !== action.id;
      });

      saveData(changedTodo);
      return changedTodo;

    case todoActions.toggle:
      const newTodoList = todoList.map((todo) => {
        if (todo.id === action.id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
      saveData(newTodoList);
      return newTodoList;

    default:
      return todoList;
  }
};

export const TodoContext = createContext(null as any);

export const TodoProvider = ({ children }: any) => {
  const [todoList, dispatch] = useReducer(reducer, initTodoList);

  return (
    <TodoContext.Provider value={{ todoList: todoList, dispatch: dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
