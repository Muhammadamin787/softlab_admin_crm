import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import './adminLayout.scss'
import '../pages/universal.scss'
import {LogoIcon, LogoMiniIcon, ToggleIcon} from "./Icons";
import {Button, Col, Row} from "reactstrap";
import {connect} from "react-redux";
import {config} from "../utils/config";
import {TOKEN} from "../utils/constants";


class AdminLayout extends Component {

    state = {
        addMenu: false,
        addMenu1: false
    }

    render() {
        const {currentUser, menuHidden, dispatch, isSuperAdmin, isAdmin, isFinancier, isReception} = this.props;
        const {addMenu, addMenu1} = this.state

        const changeMenu = () => {
            dispatch({
                type: "updateState",
                payload: {
                    menuHidden: !menuHidden
                }
            })
        }

        const closeFun = () => {
            if (addMenu || addMenu1) {
                this.setState({addMenu: false})
                this.setState({addMenu1: false})
            }
        }

        const secondMenu = () => {
            this.setState({addMenu: !addMenu})
        }

        const signOut = () => {
            localStorage.removeItem('role');
            localStorage.removeItem(TOKEN);
            this.props.history.push("/login")
        }
        const thirdMenu = () => {
            this.setState({addMenu1: !addMenu1})
        }

        return (
            <div className={"admin-layout-page"} onClick={closeFun}>
                <div className={"main-layout"}>
                    <div
                        className={menuHidden ? "main-layout-left" : "main-layout-left-hidden"}>
                        <div className="main-link-div">
                            {isSuperAdmin || isAdmin ?
                                <Link to="/admin" className={
                                    this.props.pathname === "/admin" ?
                                        "active-link" : "default-link"
                                }>
                                    <span className="icon icon-dashboard"/>
                                    <div className="main-link">
                                        Dashboard
                                    </div>
                                </Link>
                                : ""}
                            {isSuperAdmin || isReception || isAdmin ?
                                <Link to="/admin/card" className={
                                    this.props.pathname === "/admin/card" ?
                                        "active-link" : "default-link"
                                }>
                                    <span className="icon icon-dashboard"/>
                                    <div className="main-link">
                                        Murojaatlar
                                    </div>
                                </Link>
                                : ""}
                            <Link to="/admin/students" className={
                                this.props.pathname && this.props.pathname.startsWith("/admin/student") ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-customer"/>
                                <div className="main-link">
                                    Talabalar
                                </div>
                            </Link>
                            {isSuperAdmin || isReception || isFinancier || isAdmin ?
                                <Link to="/admin/courses/list" className={
                                    this.props.pathname && this.props.pathname.startsWith("/admin/course") ?
                                        "active-link" : "default-link"
                                }>
                                    <span className="icon icon-time"/>
                                    <div className="main-link">
                                        Kurslar
                                    </div>
                                </Link>
                                : ""}
                            <Link to="/admin/groups" className={
                                this.props.pathname && this.props.pathname.startsWith("/admin/group") ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Guruhlar
                                </div>
                            </Link>
                            {isSuperAdmin || isAdmin ?
                                <Link to="/admin/teachers" className={
                                    this.props.pathname && this.props.pathname.startsWith("/admin/teacher") ?
                                        "active-link" : "default-link"
                                }>
                                    <span className="icon icon-teacher"/>
                                    <div className="main-link">
                                        O'qituvchilar
                                    </div>
                                </Link>
                                : ""}
                            {isSuperAdmin || isFinancier || isAdmin ?
                                <Link to="#" onClick={thirdMenu} className={
                                    this.props.pathname === "/admin/finance" ?
                                        "active-link" : "default-link"
                                }>
                                    <span className="icon icon-teacher"/>
                                    <div className="main-link">
                                        Moliya
                                    </div>
                                </Link>
                                : ""}
                            {isSuperAdmin || isAdmin ?
                                <Link to="#" onClick={secondMenu} className={
                                    this.props.pathname === "/admin/room" ||
                                    this.props.pathname === "/admin/payType" ||
                                    this.props.pathname === "/admin/region"
                                        ?
                                        "active-link" : "default-link"
                                }>
                                    <span className="icon icon-setting"/>
                                    <div className="main-link">
                                        Sozlamalar
                                    </div>
                                </Link>
                                : ""}
                        </div>
                    </div>
                    <div
                        className={"additional-menu " + (addMenu ? menuHidden ? " additional-menu-small" : " open-add-menu" : " additional-menu-hidden")}
                        id={"test1234"}>
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
                            <Link to="/admin/reklama" className={
                                this.props.pathname === "/admin/reklama" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Reklama turlari
                                </div>
                            </Link>
                            <Link to="/admin/clientStatus" className={
                                this.props.pathname === "/admin/clientStatus" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Murojaat bo'limlari
                                </div>
                            </Link>
                            <Link to="/admin/toplam" className={
                                this.props.pathname === "/admin/toplam" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    To'plam
                                </div>
                            </Link>
                            <Link to="/admin/cashback" className={
                                this.props.pathname === "/admin/cashback" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-payment"/>
                                <div className="main-link">
                                    Cashback
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
                            {isSuperAdmin || isFinancier ?
                                <Link to="/admin/staffs" className={
                                    this.props.pathname === "/admin/staffs" ?
                                        "active-link" : "default-link"
                                }>
                                    <span className="icon icon-teacher"/>
                                    <Link to="/admin/staffs"
                                          className="main-link">
                                        Xodimlar
                                    </Link>
                                </Link>
                                : ""}

                        </div>
                    </div>
                    <div
                        className={"additional-menu " + (addMenu1 ? menuHidden ? " additional-menu-small" : " open-add-menu" : " additional-menu-hidden")}>
                        <div className={"main-link-div"}>
                            <Link to="/admin/StudentFinance" className={
                                this.props.pathname === "/admin/StudentFinance" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Student Moliya
                                </div>
                            </Link>
                            <Link to="/admin/finance" className={
                                this.props.pathname === "/admin/finance" ?
                                    "active-link" : "default-link"
                            }>
                                <span className="icon icon-teacher"/>
                                <div className="main-link">
                                    Teacher Moliya
                                </div>
                            </Link>
                            {/*<Link to="/admin/AllPayments" className={*/}
                            {/*    this.props.pathname === "/admin/reklama" ?*/}
                            {/*        "active-link" : "default-link"*/}
                            {/*}>*/}
                            {/*    <span className="icon icon-teacher"/>*/}
                            {/*    <div className="main-link">*/}
                            {/*        Barcha Tolovlar*/}
                            {/*    </div>*/}
                            {/*</Link>*/}
                        </div>
                    </div>

                    <div className="main-layout-right">
                        {this.props.children}
                    </div>
                    <Row className={"top-menu mx-0 my-auto"}>
                        <div
                            className={"top-menu-left mx-auto" + (menuHidden ? "top-menu-left-hidden" : "top-menu-left-visible")}>
                            {menuHidden ?
                                <LogoIcon/>
                                :
                                <LogoMiniIcon/>
                            }
                        </div>
                        <div className={"top-menu-toggle text-left"}>
                            <Button className={"toggle-button"} onClick={changeMenu}>
                                <ToggleIcon/>
                            </Button>
                        </div>
                        <Col className={"top-menu-right text-right my-auto"}>
                            <div className="about-user">
                                <div
                                    className={"col-sm-auto avatar" + (currentUser && currentUser.photoId ? "" : " no-avatar")}>
                                    <img
                                        src={currentUser.photoId ? config.BASE_URL + "/attachment/" + currentUser.photoId : "/assets/img/avatar.png"}
                                        alt=""/>
                                </div>
                                <div className="name-title my-auto">
                                    {currentUser ? currentUser.fullName : ""}
                                </div>
                                <div>
                                    <button className={"btn btn-secondary"} onClick={signOut}>Chiqish</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(
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
         },
         auth: {addMenu, addMenu1, menuHidden, isAdmin, isSuperAdmin, currentUser, isFinancier, isReception}
     }) =>
        ({
            addMenu,
            addMenu1,
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
            notifications,
            isFinancier,
            isReception
        })
)
(AdminLayout));