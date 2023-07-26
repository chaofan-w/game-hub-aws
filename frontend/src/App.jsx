import * as React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Library from "./components/Library";
import SideNav from "./components/SideNav";
import Cart from "./components/Cart";
import RentalDashBoard from "./components/RentalDashBoard";
import History from "./components/History";
import SingleGamePage from "./components/SingleGamePage";
import BottomNav from "./components/BottomNav";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotificationsState,
  removeNotification,
} from "./features/notificationMsg/notificationsSlice";
import NotificationMsg from "./components/NotificationMsg";
// import * as Popper from "@popperjs/core";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const dispatch = useDispatch();
  const [colorMode, setColorMode] = React.useState("Dark Mode");
  const [showAlert, setShowAlert] = React.useState(false);
  const notifications = useSelector(selectNotificationsState).notifications;
  const [gridShow, setGridShow] = React.useState(true);

  // eslint-disable-next-line no-unused-vars
  const [shouldInitializeTooltips, setShouldInitializeTooltips] =
    React.useState(true);

  React.useEffect(() => {
    if (shouldInitializeTooltips) {
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );

      const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
      // Cleanup function
      return () => {
        tooltipList.forEach((tooltip) => tooltip.dispose());
      };
    }
  }, [shouldInitializeTooltips]);

  //  use the data-bs-theme attribute to specify the color mode. This attribute can be added to any HTML element, but it's typically added to the <body> tag.
  React.useEffect(() => {
    if (colorMode === "Dark Mode") {
      document.body.setAttribute("data-bs-theme", "dark");
    } else {
      document.body.removeAttribute("data-bs-theme");
    }
  }, [colorMode]);

  React.useEffect(() => {
    if (notifications.message) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        dispatch(removeNotification());
      }, 3000);
    } else {
      setShowAlert(false);
    }
  }, [notifications, dispatch]);

  return (
    <div className="app">
      <Router>
        <div
          className="containter-fluid bg-secondary p-0 m-0 z-3"
          style={{ height: "8vh", position: "fixed", top: 0, width: "100%" }}
        >
          <NavBar colorMode={colorMode} setColorMode={setColorMode} />
        </div>
        <div className="container-fluid">
          <div className="row">
            <div
              id="sidebar"
              className="col col-12 col-sm-1 col-lg-2 bg-secondary py-md-5 d-none d-sm-block px-0"
            >
              <SideNav colorMode={colorMode} />
            </div>
            <div className="col col-12 col-sm-11 col-lg-10 bg-primary px-0 py-5">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      colorMode={colorMode}
                      gridShow={gridShow}
                      setGridShow={setGridShow}
                    />
                  }
                />
                <Route
                  path="/login"
                  element={<Login colorMode={colorMode} />}
                />
                <Route
                  path="/signup"
                  element={<Signup colorMode={colorMode} />}
                />
                <Route
                  path="/profile"
                  element={<Profile colorMode={colorMode} />}
                />
                <Route
                  path="/library"
                  element={
                    <Library
                      colorMode={colorMode}
                      gridShow={gridShow}
                      setGridShow={setGridShow}
                    />
                  }
                />
                <Route path="/cart" element={<Cart colorMode={colorMode} />} />
                <Route
                  path="/playing"
                  element={<RentalDashBoard colorMode={colorMode} />}
                />
                <Route
                  path="/history"
                  element={<History colorMode={colorMode} />}
                />
                <Route
                  path="/games/:gameId"
                  element={<SingleGamePage colorMode={colorMode} />}
                />
              </Routes>
            </div>
          </div>
        </div>
        <div
          className="containter-fluid bg-secondary d-block d-sm-none p-0 m-0 "
          style={{ height: "8vh", position: "fixed", bottom: 0, width: "100%" }}
        >
          <BottomNav colorMode={colorMode} />
        </div>
      </Router>

      {showAlert && (
        <NotificationMsg
          severity={notifications.severity || "success"}
          message={notifications.message}
        />
      )}
    </div>
  );
}

export default App;
