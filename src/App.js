import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuestionFour from "./screens/QuestionFour";
import QuestionFive from "./screens/QuestionFive";
import QuestionOne from "./screens/QuestionOne";
import QuestionThree from "./screens/QuestionThree";
import QuestionTwo from "./screens/QuestionTwo";
import ReduxLayoutIndex from "./components/ReduxLayoutIndex";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {
  return (
    <>
      <ReduxLayoutIndex />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<QuestionFive />} />
          <Route element={<ProtectedRoutes/>}>
          <Route exact path="/question1" element={<QuestionOne />} />
          <Route exact path="/question2" element={<QuestionTwo />} />
          <Route exact path="/question3" element={<QuestionThree />} />
          <Route exact path="/question4" element={<QuestionFour />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
