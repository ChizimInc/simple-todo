import React, { useState } from "react";

interface Todo {
  text: string;
  complete: boolean;
}

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos([...todos, { text: newTodo, complete: false }]);
    setNewTodo("");
  };

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="my-5">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          className="rounded mx-3 px-2"
        />
        <button type="submit">Add Todo</button>
      </form>
      <div className="w-full flex justify-center">
        <div className="w-1/2 bg-slate-400 rounded p-3">
          {(!todos.length) ? <p>No item</p> : todos.map((todo, index) => (
            <div key={index} className="flex justify-between">
              <div style={{ textDecoration: todo.complete ? "line-through" : "" }}>{todo.text}</div>
              <div className="flex w-[70px] justify-between">
                <input 
                  className="cursor-pointer " 
                  type="checkbox" 
                  checked={todo.complete} 
                  onClick={() => toggleTodo(index)}
                />
                <p 
                  className="cursor-pointer text-red-500"
                  onClick={() => deleteTodo(index)}
                >Delete</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoApp;
