import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";

// COMPONENT
import Todo from "./Todo";
// OTHERS
import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");

  const todosJsx = todos.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });
  // if I click the button of adding a new todo
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTitleInput("");
  }
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <Container maxWidth="md">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              variant="h5"
              style={{ fontWeight: "900", fontSize: "42px" }}
            >
              مهامي
            </Typography>
            <Divider />
            {/* filters Buttons */}
            <ToggleButtonGroup
              //   value={alignment}
              exclusive
              //   onChange={handleAlignment}
              aria-label="text alignment"
              style={{ direction: "ltr" }}
            >
              <ToggleButton value="right">غير منجز</ToggleButton>
              <ToggleButton value="center">منجز</ToggleButton>
              <ToggleButton value="left">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/*=== filters Buttons ===*/}
            {/* ALL TODOS */}
            {todosJsx}
            {/*== ALL TODOS== */}
            {/* INPUT AND BUTTON */}
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid
                size={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  label="عنوان المهمة"
                  style={{ width: "100%" }}
                  value={titleInput}
                  onChange={(event) => setTitleInput(event.target.value)}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                  // value={}
                  onClick={handleAddClick}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
            {/* ===INPUT AND BUTTON=== */}
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}
