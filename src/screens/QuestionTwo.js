import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Layout from "../components/Layout";
import { Grid, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchChartData, filterChart, updateEndDate, updateStartDate } from "../redux/slices/chartSlice";
import { setLoader } from "../redux/slices/layoutSlice";


const QuestionTwo = () => {
  const dispatch = useDispatch()
  const chart = useSelector((state) => state.chart);

useEffect(() => {
  dispatch(fetchChartData())
}, [dispatch])

useEffect(() => {
  dispatch(filterChart())
}, [chart.startDate, chart.endDate, dispatch])

useEffect(() => {
  if (chart?.chartData?.length < 1 && chart?.loading) {
    dispatch(setLoader(true));
  } else {
    dispatch(setLoader(false));
  }
}, [dispatch, chart?.chartData, chart?.loading]);


  return (
    <Layout>
      <Grid container spacing={3} style={{ marginBottom: 15 }}>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            onChange={(e)=> dispatch(updateStartDate(e.target.value))}
            value={chart?.startDate}
            variant="outlined"
            label="Start Date"
            type="date"
            margin="normal"
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            onChange={(e)=> dispatch(updateEndDate(e.target.value))}
            value={chart?.endDate}
            variant="outlined"
            label="End Date"
            type="date"
            margin="normal"
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
      <div style={{ width: "100%", height: "500PX" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={chart?.chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
};

export default QuestionTwo;
