import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import './adminLayout.scss'
import {LogoIcon, ToggleIcon} from "./Icons";
import {Button, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {config} from "../utils/config";

class AdminLayout extends Component {
    state = {
        menuHidden: false,
        currentObject: ""
    }

    render() {

        const changeMenu = () => {
            this.setState({menuHidden: !menuHidden})
        }
        const {menuHidden} = this.state;
        const {currentUser} = this.props;
        return (
            <div className={"admin-layout-page"}>
                <div className={"main-layout"}>
                    <div
                        className={menuHidden ? "main-layout-left main-layout-left-hidden" : "main-layout-left"}>
                        {/*<Link to="/">*/}
                        {/*    <div className="logo-duo py-4">*/}
                        {/*        <LogoIcon/>*/}
                        {/*    </div>*/}
                        {/*</Link>*/}
                        <div className="main-link-div">
                            <div className={
                                this.props.pathname === "/admin/dashboard" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-dashboard"/>
                                <Link to="/admin/dashboard"
                                      className="main-link">
                                    Dashboard
                                </Link>
                            </div>
                            <div className={
                                this.props.pathname === "/admin/region" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-main"/>
                                <Link to="/admin/region"
                                      className="main-link">
                                    Hududlar
                                </Link>
                            </div>
                            <div className={
                                this.props.pathname === "/admin/durationType" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-time"/>
                                <Link to="/admin/durationType"
                                      className="main-link">
                                    Vaqt turlari
                                </Link>
                            </div>
                            <div className={
                                this.props.pathname === "/admin/course" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-time"/>
                                <Link to="/admin/course"
                                      className="main-link">
                                    Kurslar
                                </Link>
                            </div>
                            <div className={
                                this.props.pathname === "/admin/teacher" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <Link to="/admin/teacher"
                                      className="main-link">
                                    O'qituvchilar
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="main-layout-right">
                        {this.props.children}
                    </div>
                    <Row className={"top-menu mx-0 my-auto"}>
                        <div className={"top-menu-left mx-auto"}>
                            <LogoIcon/>
                        </div>
                        <div className={"top-menu-toggle text-left"}>
                            <Button className={"toggle-button"} onClick={changeMenu}>
                                <ToggleIcon/>
                            </Button>
                        </div>
                        <Col className={"top-menu-right ml-auto text-right my-auto"}>
                            <div className="about-user my-auto">
                                <div className={"avatar" + (currentUser && currentUser.photoId ? "" : " no-avatar")}>
                                    <img
                                        src={currentUser.photoId ? config.BASE_URL + "/attachment/" + currentUser.photoId : "/assets/img/avatar.png"}
                                        alt=""/>
                                </div>
                                <div className="name-title my-auto">
                                    {currentUser ? currentUser.fullName : ""}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default connect(
    ({
         app: {
             isOpenGeneral,
             isOpenUser,
             isOpenPages,
             isOpen,
             openCol,
             loading,
             isFilter,
             filters,
             search,
             notifications
         }
         ,
         auth: {isAdmin, isSuperAdmin, currentUser}
     }
    ) =>
        ({
            isOpenGeneral,
            isOpenPages,
            isAdmin,
            currentUser,
            isOpenUser,
            isOpen,
            isSuperAdmin,
            openCol,
            loading,
            isFilter,
            filters,
            search,
            notifications
        })
)
(AdminLayout);
