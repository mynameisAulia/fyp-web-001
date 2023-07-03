import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
//import Chart from "./components/chart/Chart";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
//import Noti from "./pages/noti/noti";
import Events from "./pages/event/Event";
import Report from "./pages/report/Report";
import Card from "./pages/card/Card";
//import Dashboard from "./pages/dashboard/Dashboard";
import UserHome from "./pages/user/UserHome";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const currentUser = false;
  const RequireAuth = ({children}) => {
    return currentUser ? (children) : <Navigate to="/login" />
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={
            <RequireAuth>
              <Home /> 
            </RequireAuth>} />

            <Route path="login" element={<Login />} />
      
            <Route path="reports">
              <Route index element={<Report />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New Feedbacks" />}
              />
            </Route>

            <Route path="events">
              <Route index element={<Events />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New Events" />}
              />
            </Route>

            <Route path="dashboard">
              <Route index element={<Dashboard />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Dashboard" />}
              />
            </Route>

            <Route path="card">
              <Route index element={<Card />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Dashboard" />}
              />
            </Route>

            <Route path="users">
              <Route index element={<UserHome />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Dashboard" />}
              />
            </Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
