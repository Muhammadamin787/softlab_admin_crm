import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class AdminHome extends Component {
    render() {
        return (
            <div>
                <h1>Admin menyulari</h1>
                <div className={""}>
                    <div className={"m-1"}>
                        <Link to={"/admin/durationType"}>Vaqt turlari</Link>
                    </div>
                    <div className={"m-1"}>
                        <Link to={"/admin/dashboard"}>Dashboard</Link>
                    </div>
                    <div className={"m-1"}>
                        <Link to={"/admin/profession"}>Profession</Link>
                    </div>
                    <div className={"m-1"}>
                        <Link to={"/admin/testCategory"}>TestCategory</Link>
                    </div>
                    <div className={"m-1"}>
                        <Link to={"/admin/region"}>Hudud</Link>
                    </div>
                    <div className={"m-1"}>
                        <Link to={"/admin/reklama"}>Reklama</Link>
                    </div>
                    <div className={"m-1"}>
                        <Link to={"/admin/courseCategory"}>CourseCategory</Link>
                    </div>
                    <div className={"m-1"}>
                        <Link to={"/admin/course"}>Course</Link>
                    </div>
                    <div className={"m-1"}>
                        <Link to={"/admin/trialContactType"}>Trial Contact Type</Link>
                    </div>
                    <div className={"m-1"}>
                        <Link to={"/admin/specialization"}>Specialization</Link>
                    </div>
                    <div className={"m-1"}>
                        <Link to={"/admin/test"}>Test</Link>
                    </div>
                    <div className={"m-1"}>
                        <Link to={"/admin/teacher"}>O'qituvchilar</Link>
                    </div>

                </div>
            </div>
        );
    }
}

AdminHome.propTypes = {};

export default AdminHome;
