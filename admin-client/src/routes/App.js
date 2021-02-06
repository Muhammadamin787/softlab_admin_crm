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
import AdminHome from "../pages/adminPages/AdminHome";
import DurationType from "../pages/adminPages/DurationType";
import Professions from "../pages/adminPages/Professions";
import TestCategory from "../pages/adminPages/TestCategory";
import Reklama from "../pages/adminPages/Reklama"
import Region from "../pages/adminPages/Region";
import Course from "../pages/adminPages/Course";
import CourseCategory from "../pages/adminPages/CourseCategory";
import Specialization from "../pages/adminPages/Specialization";
import TrialContactType from "../pages/adminPages/TrialContactType";
import Test from "../pages/adminPages/Test";
import AddTeacher from "../pages/adminPages/Teacher";


const App = () => {
    return (
        <Provider store={store}>
            <Switch>
                <PublicRoute exact path="/" component={HomePage}/>
                <PublicRoute exact path="/login" component={Login}/>
                <PrivateRoute exact path="/admin/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/admin/" component={AdminHome}/>
                <PrivateRoute exact path="/admin/durationType" component={DurationType}/>
                <PrivateRoute exact path="/admin/profession" component={Professions}/>
                <PrivateRoute exact path="/admin/testCategory" component={TestCategory}/>
                <PrivateRoute exact path="/admin/region" component={Region}/>
                <PrivateRoute exact path="/admin/course" component={Course}/>
                <PrivateRoute exact path="/admin/test" component={Test}/>
                <PrivateRoute exact path="/admin/courseCategory" component={CourseCategory}/>
                <PrivateRoute exact path="/admin/specialization" component={Specialization}/>
                <PrivateRoute exact path="/admin/trialContactType" component={TrialContactType}/>
                <PrivateRoute exact path="/admin/teacher" component={AddTeacher}/>
                {/*<PrivateRoute exact path="/admin/dashboard" component={Dashboard}/>*/}
                <PrivateRoute exact path="/admin/reklama" component={Reklama}/>
                {/*<PrivateRoute exact path="/admin" component={Dashboard}/>*/}
                {/*<PrivateRoute exact path="/admin/ishtirok" component={Ishtirokchilar}/>*/}
                {/*<PrivateRoute exact path="/admin/vaqt" component={Vaqt}/>*/}
                {/*<PrivateRoute exact path="/admin/message" component={MessageSend}/>*/}
                {/*<PrivateRoute exact path="/admin/hisobot" component={Hisobot}/>*/}
                {/*<PrivateRoute exact path="/admin/region" component={Region}/>*/}
                {/*<PrivateRoute exact path="/admin/royhat" component={Royhat}/>*/}
                <Route component={NotFound}/>
            </Switch>
        </Provider>
    );
}

export default App;