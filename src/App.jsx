import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import CommentPage from "./components/CommentPage";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route Component={Home} path="/feed" />
            <Route Component={CommentPage} path="/posts/:uid/:postId" />
          </Route>
          <Route Component={Login} path="/" />
          <Route Component={Signup} path="/signup" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
