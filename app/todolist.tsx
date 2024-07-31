import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TodoListScreen() {
  const [todos, setTodos] = useState<any>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const todosString = await AsyncStorage.getItem("todos");
      if (todosString) {
        setTodos(JSON.parse(todosString));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const saveTodos = async (todos: any) => {
    try {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    } catch (e) {
      console.error(e);
    }
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setNewTodo("");
    }
  };

  const deleteTodo = (index: any) => {
    const updatedTodos = todos.filter((_: any, i: number) => i !== index);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const editTodo = () => {
    if (newTodo.trim() && editIndex >= 0) {
      const updatedTodos = todos.map((todo: any, i: number) =>
        i === editIndex ? newTodo : todo
      );
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setNewTodo("");
      setEditIndex(-1);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new todo"
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <Button
        title={editIndex >= 0 ? "Edit Todo" : "Add Todo"}
        onPress={editIndex >= 0 ? editTodo : addTodo}
      />
      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <View style={styles.todoContainer}>
            <Text style={styles.todoText}>{item}</Text>
            <View style={styles.buttons}>
              <Button
                title="Edit"
                onPress={() => {
                  setNewTodo(item);
                  setEditIndex(index);
                }}
              />
              <Button title="Delete" onPress={() => deleteTodo(index)} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  todoText: {
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
  },
});
