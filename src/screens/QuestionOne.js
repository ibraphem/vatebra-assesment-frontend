import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Layout from "../components/Layout";
import { fetchTasks, filterCalendar } from "../redux/slices/calendarSlice";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useStyles } from "../theme/style";
import { Button, Grid } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AddIcon from "@material-ui/icons/Add";
import { setLoader, setTaskModal } from "../redux/slices/layoutSlice";

const QuestionOne = () => {
  const classes = useStyles();
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    dispatch(filterCalendar(event.target.value));
  };

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.calendar.loading);
  const tasks = useSelector((state) => state.calendar.tasks);

  

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks?.length < 1 && loading) {
      dispatch(setLoader(true));
    } else {
      dispatch(setLoader(false));
    }
  }, [dispatch, tasks, loading]);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label" style={{ fontSize: 12 }}>
              Category Filter
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              onChange={handleChange}
              // variant="outlined"
            >
              <MenuItem value="all">
                <FiberManualRecordIcon color="primary" /> All
              </MenuItem>
              <MenuItem value="done">
                <FiberManualRecordIcon style={{ color: "green" }} /> Done
              </MenuItem>
              <MenuItem value="pending">
                <FiberManualRecordIcon style={{ color: "orange" }} /> Pending
              </MenuItem>
              <MenuItem value="todo">
                <FiberManualRecordIcon style={{ color: "grey" }} /> Todo
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          style={{
            paddingLeft: 0,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() => dispatch(setTaskModal(true))}
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
          >
            Add
          </Button>
        </Grid>
      </div>

      <div style={{ width: "100%" }}>
        <FullCalendar
          firstDay="1"
          locale="en"
          dayHeaders={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          themeSystem="Simplex"
          plugins={[dayGridPlugin]}
          events={tasks}
          timeZone="local"
        />
      </div>
    </Layout>
  );
};

export default QuestionOne;
