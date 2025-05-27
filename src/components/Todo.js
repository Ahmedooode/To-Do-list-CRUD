import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";

// DIALOG IMPORTS
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import { ToastContext } from "../contexts/toastContext";
export default function Todo({ todo, showDelete, showUpdate }) {
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useContext(ToastContext);

  // ------------------EVENT HANDLERS--------------
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }

      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast(" تم التعديل بنجاح ");
  }

  function handleDeleteClick() {
    showDelete(todo);
  }
  function handleEditClick() {
    showUpdate(todo);
  }

  // -----------------=====EVENT HANDLERS=====----------------
  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant="h5" sx={{ textAlign: "right" }}>
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
            {/* Action buttons */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButtons"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                {/* CHECK ICON BUTTON */}
                <CheckIcon />
              </IconButton>
              {/* ----------EDIT BUTTON----------- */}
              <IconButton
                onClick={() => {
                  handleEditClick();
                }}
                className="iconButtons"
                style={{
                  color: "#4a4ce9",
                  background: "white",
                  border: "solid #4a4ce9 3px",
                }}
              >
                <ModeEditOutlineIcon />
              </IconButton>
              {/* -------===EDIT BUTTON===-------- */}

              {/* DELETE BUTTON */}
              <IconButton
                className="iconButtons"
                style={{
                  color: "#eb473b",
                  background: "white",
                  border: "solid #eb473b 3px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineIcon />
              </IconButton>
              {/*=== DELETE BUTTON ==*/}
            </Grid>{" "}
            {/* ==Action buttons== */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
