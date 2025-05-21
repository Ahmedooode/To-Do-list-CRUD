import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";

// DIALOG IMPORTS
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Todo({ todo, handleCheck }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const { todos, setTodos } = useContext(TodosContext);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  // ------------------EVENT HANDLERS--------------
  function handleCheckClick() {
    const updateTodos = todos.map((t) => {
      if (t.id == todo.id) {
        if (t.isCompleted == true) {
          t.isCompleted = false;
        } else {
          t.isCompleted = true;
        }
      }

      return t;
    });
    setTodos(updateTodos);
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }
  function handleEditClick() {
    setShowUpdateDialog(true);
  }
  function handleDeleteConfirm() {
    const updateTodos = todos.filter((t) => {
      return t.id != todo.id;
    });
    setTodos(updateTodos);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
  }

  // -----------------=====EVENT HANDLERS=====----------------
  return (
    <>
      {/* -----------------DELETE MODAL---------- */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="h4">
          {" !! انتبه "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل أنت متأكد من حذف هذه المهمة من قائمة مهامك
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>غير موافق</Button>
          <Button
            autoFocus
            style={{ color: "red" }}
            onClick={handleDeleteConfirm}
          >
            موافق
          </Button>
        </DialogActions>
      </Dialog>
      {/* --------------===DELETE MODAL===-------------- */}
      {/* ------------UPDATE DIALOG------------ */}
      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleUpdateDialogClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" variant="h6">
          {" تعديل المهمة المحددة"}
        </DialogTitle>
        <DialogContent>
          <TextField
            value={updatedTodo.title}
            onChange={(event) => {
              setUpdatedTodo({ ...updatedTodo, title: event.target.value });
            }}
            autoFocus
            margin="dense"
            id="name"
            label="عنوان المهمة"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={updatedTodo.details}
            onChange={(event) => {
              setUpdatedTodo({ ...updatedTodo, details: event.target.value });
            }}
            autoFocus
            margin="dense"
            id="name"
            label="تفاصيل المهمة"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>الغاء </Button>
          <Button
            autoFocus
            style={{ color: "red" }}
            onClick={handleUpdateConfirm}
          >
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* =============UPDATE DIALOG======== */}
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
