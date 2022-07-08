import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ProjectsPage from "./projects/ProjectsPage";
import Hello from "./Hello";

function fetchTodos() {
  return [
    {
      id: 1,
      title: "Eating",
      complete: false,
    },
    {
      id: 2,
      title: "Brushing",
      complete: false,
    },
    {
      id: 3,
      title: "Drinking",
      complete: false,
    },
    {
      id: 4,
      title: "Washing",
      complete: false,
    },
    {
      id: 5,
      title: "Sleeping",
      complete: false,
    },
  ];
}

function TodoItem(props: any) {
  return (
    <>
      <li>
        <input
          type="checkbox"
          onClick={props.onToggle}
          defaultChecked={props.complete}
        />
        <label id="titleLabel" style={
          {color: props.complete ? "red": "black"}
        }>{props.title}</label>
        <button onClick={props.onDelete}>delete</button>
      </li>
    </>
  );
}

function App() {
  // const [todos, setTodos] = useState(fetchTodos());

  // return (
  //   <>
  //     <ul>
  //       {todos.map((todo) => (
  //         <TodoItem
  //           title={todo.title}
  //           complete={todo.complete}
  //           onDelete={() => {
  //             setTodos(todos.filter((x) => x.id !== todo.id));
  //           }}
  //           onToggle={() => {
  //             setTodos(
  //               todos.map((x) =>
  //                 x.id === todo.id ? { ...x, complete: !todo.complete } : x
  //               )
  //             );
  //           }}
  //         />
  //       ))}
  //     </ul>
  //   </>
  // );
  return <ProjectsPage />
}

export default App;
