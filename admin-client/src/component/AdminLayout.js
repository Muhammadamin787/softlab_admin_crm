import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import './adminLayout.scss'
import '../pages/universal.scss'
import {LogoIcon, LogoMiniIcon, ToggleIcon} from "./Icons";
import {Button, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {config} from "../utils/config";

class AdminLayout extends Component {
    render() {
        const {currentUser, menuHidden, dispatch} = this.props;
        const changeMenu = () => {
            dispatch({
                type: "updateState",
                payload: {
                    menuHidden: !menuHidden
                }
            })
        }
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
                            <Link to="/admin/dashboard" className={
                                this.props.pathname === "/admin/dashboard" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-dashboard"/>
                                <div className="main-link">
                                    Dashboard
                                </div>
                            </Link>
                            <Link to="/admin/region" className={
                                this.props.pathname === "/admin/region" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-globus"/>
                                <Link to="/admin/region"
                                      className="main-link">
                                    Hududlar
                                </Link>
                            </Link>
                            <Link to="/admin/course" className={
                                this.props.pathname === "/admin/course" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-time"/>
                                <div className="main-link">
                                    Kurslar
                                </div>
                            </Link>
                            <Link to="/admin/teacher" className={
                                this.props.pathname === "/admin/teacher" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    O'qituvchilar
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="main-layout-right">
                        {this.props.children}
                    </div>
                    <Row className={"top-menu mx-0 my-auto"}>
                        <div
                            className={"top-menu-left mx-auto" + (menuHidden ? " top-menu-left-hidden" : " top-menu-left-visible")}>
                            {menuHidden ?
                                <LogoMiniIcon/>
                                :
                                <LogoIcon/>}
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
         auth: {menuHidden, isAdmin, isSuperAdmin, currentUser}
     }
    ) =>
        ({
            menuHidden,
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
