import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/Todo-list";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "بنب يبينب نبتنسي ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "بنب يبينب نبتنسي ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "بنب يبينب نبتنسي ",
    isCompleted: false,
  },
];

const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },
});
function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#191b1f",
          height: "100vh",
          direction: "rtl",
        }}
      >
        <TodosContext.Provider value={{ todos: todos, setTodos: setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
