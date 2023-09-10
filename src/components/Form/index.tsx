import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const Form = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoEditing, setTodoEditing] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    if (temp) {
      const loadedTodos = JSON.parse(temp);
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo === "") return;

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTodo(value);
  };

  const clearInputTodo = () => {
    setTodo("");
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((el) => el.id !== id);
    setTodos(updatedTodos);
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editTodo = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Todo</label>
        <Input
          placeholder="Add here your todo"
          onChange={handleInputChange}
          value={todo}
        />
        <Button type="submit" text={"Add"} />
        <Button onClick={clearInputTodo} text="Cancel" />
      </form>

      {todos?.map((item: Todo) => (
        <div key={item.id}>
          {todoEditing === item.id ? (
            <input
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
          ) : (
            <div>{item.text}</div>
          )}

          <Button onClick={() => deleteTodo(item.id)} text="delete" />

          {todoEditing === item.id ? (
            <Button onClick={() => editTodo(item.id)} text="Submit edit" />
          ) : (
            <Button onClick={() => setTodoEditing(item.id)} text="edit" />
          )}

          <input
            type="checkbox"
            onChange={() => toggleComplete(item.id)}
            checked={item.completed}
          />
          <span>Completed</span>
        </div>
      ))}
    </>
  );
};
