import {BrowserRouter, Route, Routes } from "react-router-dom";
import Question4 from "./screens/Question4";
import QuestionFive from "./screens/QuestionFive";
import QuestionOne from "./screens/QuestionOne";
import QuestionThree from "./screens/QuestionThree";
import QuestionTwo from "./screens/QuestionTwo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<QuestionFive />} />
        <Route exact path="/question1" element={<QuestionOne />} />
        <Route exact path="/question2" element={<QuestionTwo />} />
        <Route exact path="/question3" element={<QuestionThree />} />
        <Route exact path="/question4" element={<Question4 />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
