import { useState } from "react";
import { Button, Modal, TextField } from "@material-ui/core";
import React from "react";
import { useStyles } from "../../theme/style";
import { useDispatch } from "react-redux";
import { setLoader, setTaskModal } from "../../redux/slices/layoutSlice";
import { fetchTasks } from "../../redux/slices/calendarSlice";
import { useSelector } from "react-redux";
import { saveTask } from "../../services/allServices";
import { Alert, AlertTitle } from "@material-ui/lab";

const AddTaskModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const taskModal = useSelector((state) => state.layout?.taskModal)

  const [modalStyle] = useState(getModalStyle);
  const [date, setDate] = useState("")
  const [todo, setTodo] = useState("")
  const [isErr, setisErr] = useState(false)

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const addTask = async(e) => {
    e.preventDefault()
    
    dispatch(setLoader(true))
    setisErr(false)
    const res = await saveTask({date, todo}) 
    if(res?.status) {
      dispatch(fetchTasks())
      dispatch(setTaskModal(false))
    }

    dispatch(setLoader(false))
    setisErr(true)

  }

  return (
    <Modal
    open={taskModal?.status}
    onClose={() => dispatch(setTaskModal(false))}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    <div style={modalStyle} className={`${classes.taskPaper} taskForm`}>
    {isErr && (
              <div style={{ marginBottom: 10, marginTop: 10 }}>
              <Alert severity="error">
                <AlertTitle style={{ fontSize: 12 }}>
                  <strong>
                    Something went wrong. Try again
                  </strong>
                </AlertTitle>
              </Alert>
            </div>
            )}
      <form className={classes.form} onSubmit={addTask}>
        <TextField
        onChange={(event)=>setDate(event.target.value)}
        value={date}
          label="Date"
          type="date"
          margin="normal"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          onChange={(event)=>setTodo(event.target.value)}
          value={todo}
          margin="normal"
          required
          fullWidth
          label="Task"
          autoFocus
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add Task
        </Button>
      </form>
    </div>
    </Modal>
  );
};

export default AddTaskModal;
