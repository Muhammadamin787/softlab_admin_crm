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
        const {currentUser, addMenu, menuHidden, dispatch} = this.props;
        const changeMenu = () => {
            dispatch({
                type: "updateState",
                payload: {
                    menuHidden: !menuHidden
                }
            })
        }
        const secondMenu = () => {
            dispatch({
                type: "updateState",
                payload: {
                    addMenu: !addMenu
                }
            })
        }
        return (
            <div className={"admin-layout-page"}>
                <div className={"main-layout"}>
                    <div
                        className={menuHidden ? "main-layout-left main-layout-left-hidden" : "main-layout-left"}>
                        <div className="main-link-div">
                            <Link to="/admin" className={
                                this.props.pathname === "/admin" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-dashboard"/>
                                <div className="main-link">
                                    Dashboard
                                </div>
                            </Link>
                            <Link to="/admin/students" className={
                                this.props.pathname === "/admin/students" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-customer"/>
                                <div className="main-link">
                                    Talabalar
                                </div>
                            </Link>
                            <Link to="/admin/courses/list" className={
                                this.props.pathname.startsWith("/admin/course") ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-time"/>
                                <div className="main-link">
                                    Kurslar
                                </div>
                            </Link>
                            <Link to="/admin/groups" className={
                                this.props.pathname === "/admin/groups" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Guruhlar
                                </div>
                            </Link>
                            <Link to="/admin/teachers" className={
                                this.props.pathname === "/admin/teacher" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    O'qituvchilar
                                </div>
                            </Link>
                            <Link to="#" onClick={secondMenu} className={
                                this.props.pathname === "/admin/general" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-setting"/>
                                <div className="main-link">
                                    Sozlamalar
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div
                        className={"additional-menu " + (addMenu ? menuHidden ? " additional-menu-small" : " open-add-menu" : " additional-menu-hidden")}>
                        <div className="main-link-div">
                            <Link to="/admin/room" className={
                                this.props.pathname === "/admin/room" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Xonalar
                                </div>
                            </Link>
                            <Link to="/admin/payType" className={
                                this.props.pathname === "/admin/payType" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-payment"/>
                                <div className="main-link">
                                    To'lov turlari
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
         auth: {addMenu, menuHidden, isAdmin, isSuperAdmin, currentUser}
     }
    ) =>
        ({
            addMenu,
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
