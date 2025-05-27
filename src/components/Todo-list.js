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

// DIALOG IMPORTS
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// OTHERS
import { useState, useContext, useEffect, useMemo } from "react";
import { TodosContext } from "../contexts/todosContext";
import { ToastContext } from "../contexts/toastContext";

export default function TodoList() {
  const [dialogTodo, setDialogTodo] = useState(""); // in this line thier is an issue , the instructor did not talked about it , he put the initial value of this state = null , this is success in usestate number one of (delete dialog) , but it is not success in other useState in case of (update dialog) , because it need initial value = string , by put it in this value it success of both uses until this moment , if their is issue apear at future , I will separated the states of both , first = null , and second as the next comment .
  const { todos, setTodos } = useContext(TodosContext);
  const { showHideToast } = useContext(ToastContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  // const [updatedDialogTodo, setUpdatedDialogTodo] = useState({
  //   title: "",
  //   details: "",
  // });

  // fillteration arrays
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("todos is completed");
      return t.isCompleted;
    });
  }, [todos]);
  const nonCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("todos is not completed");
      return !t.isCompleted;
    });
  }, [todos]);
  let todosToBeRendered = todos;
  if (displayedTodosType == "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRendered = nonCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    if (Array.isArray(storageTodos)) {
      setTodos(storageTodos);
    } else {
      setTodos([]); // ضمان أن todos مصفوفة
    }
  }, []);
  // change displayed todos type

  function changeDisplayedTodosType(e) {
    setDisplayedTodosType(e.target.value);
  }

  // if I click the button of adding a new todo
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
    showHideToast(" تم إضافة مهمة جديدة بنجاح ");
  }
  //----------------- HANDLERS---------------

  // --------------first : delete functions
  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id != dialogTodo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteDialog(false);
    showHideToast(" تم الحذف بنجاح ");
  }

  // -------------second : Update functions

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }
  function handleUpdateDialogClose() {
    setShowUpdateDialog(false);
  }
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == dialogTodo.id) {
        return {
          ...t,
          title: dialogTodo.title,
          details: dialogTodo.details,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showHideToast(" تم التحديث بنجاح");
  }

  const todosJsx = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });

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
            value={dialogTodo.title}
            onChange={(event) => {
              setDialogTodo({
                ...dialogTodo,
                title: event.target.value,
              });
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
            value={dialogTodo.details}
            onChange={(event) => {
              setDialogTodo({
                ...dialogTodo,
                details: event.target.value,
              });
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
      <Container maxWidth="md">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
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
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedTodosType}
              aria-label="text alignment"
              style={{ direction: "ltr" }}
              color="primary"
            >
              <ToggleButton value="non-completed">غير منجز</ToggleButton>
              <ToggleButton value="completed">منجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
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
                  disabled={titleInput.length <= 0}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
            {/* ===INPUT AND BUTTON=== */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
