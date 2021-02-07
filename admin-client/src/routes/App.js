import React from "react";
import {Route, Switch} from "react-router-dom";
import store from "../redux";
import {Provider} from "react-redux";
import PublicRoute from "../utils/PublicRoute";
import PrivateRoute from "../utils/PrivateRoute";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login/Login";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/adminPages/Dashboard";
import DurationType from "../pages/adminPages/DurationType";
import Reklama from "../pages/adminPages/Reklama"
import Region from "../pages/adminPages/Region";
import Course from "../pages/adminPages/Course";
import CourseCategory from "../pages/adminPages/CourseCategory";
import AddTeacher from "../pages/adminPages/Teacher";
import GeneralSetting from "../pages/adminPages/GeneralSetting";
import Room from "../pages/adminPages/Room";


const App = () => {
    return (
        <Provider store={store}>
            <Switch>
                <PublicRoute exact path="/" component={HomePage}/>
                <PublicRoute exact path="/login" component={Login}/>
                <PrivateRoute exact path="/admin" component={Dashboard}/>
                <PrivateRoute exact path="/admin/durationType" component={DurationType}/>
                <PrivateRoute exact path="/admin/region" component={Region}/>
                <PrivateRoute exact path="/admin/course" component={Course}/>
                <PrivateRoute exact path="/admin/courseCategory" component={CourseCategory}/>
                <PrivateRoute exact path="/admin/teacher" component={AddTeacher}/>
                <PrivateRoute exact path="/admin/reklama" component={Reklama}/>
                <PrivateRoute exact path="/admin/room" component={Room}/>
                <PrivateRoute exact path="/admin/general" component={GeneralSetting}/>
                <Route component={NotFound}/>
            </Switch>
        </Provider>
    );
}

export default App;