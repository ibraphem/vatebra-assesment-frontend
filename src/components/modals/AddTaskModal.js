import { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import React from "react";
import { useStyles } from "../../theme/style";

const AddTaskModal = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

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

  return (
    <div style={modalStyle} className={`${classes.taskPaper} taskForm`}>
      <form className={classes.form} noValidate>
        <TextField
          label="Date"
          type="date"
          margin="normal"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          //   onChange={(event)=>handelAccount("username",event)}
          // variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Title"
          autoFocus
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          // onClick = {handleLogin}
        >
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default AddTaskModal;
