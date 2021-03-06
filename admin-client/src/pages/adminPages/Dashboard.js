import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AdminLayout from "../../component/AdminLayout";
import './adminPages.scss';
import {Button, Col, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane} from "reactstrap";
import {formatPhoneNumber} from "../../utils/addFunctions";
import moment from "moment";
import {DeleteIcon, EditIcon} from "../../component/Icons";
import Pagination from "react-js-pagination";
import {getDailySchedule, getRoomListAction, getTeacherSalaryListAction} from "../../redux/actions/AppActions";
import {connect} from "react-redux";

class Dashboard extends Component {

    componentDidMount() {
        this.props.dispatch(getRoomListAction())
        this.props.dispatch(getDailySchedule())
    }

    state = {
        activeTab: "1"
    }

    render() {
        const {currentObject, activeTab} = this.state;
        const {
            groups,
            history,
            payTypes,
            showOpenSalaryModal,
            showOpenSalaryModal1,
            dispatch,
            showModal,
            deleteModal,
            currentItem,
            regions,
            teacherSalary,
            teacherSalaryList,
            showEditSalaryModal,
            deleteSalaryModal,
            page, size, totalElements,
            rooms,
            dailySchedule
        } = this.props;

        const toggle = tab => {
            if (activeTab !== tab)
                this.setState({activeTab: tab})
            if (tab === "2") {
                if (this.props.match && this.props.match.params && this.props.match.params.id) {
                    dispatch(getTeacherSalaryListAction({
                        id: this.props.match.params.id,
                        page: 0,
                        size: size
                    }))
                }
            }
        }
        const arrayList = [];

        const a = (ss) => {
            let hour = 7;
            let minut = 0;
            for (let i = 0; i < 30; i++) {
                let zero = '';
                let zeroM = '';

                (hour <= 9) ? zero = '0' : zero = '';
                hour === 0 ? zeroM = '0' : zeroM = ''
                if (i === 0 && minut === 0) {
                    arrayList.push(<tr>
                        <td>{zero + hour + " : 0" + minut}</td>
                        {dailySchedule ? dailySchedule.map((item, i) => {
                            {console.log(item)}
                            }
                        ) :''}
                    </tr>)
                    minut += 30
                } else if (minut === 0) {
                    minut += 30
                } else if (minut === 30) {
                    zeroM = '0'
                    minut = 0
                    hour += 1
                }
                arrayList.push(<tr>
                    <td>{zero + hour + " : " + zeroM + minut}</td>
                </tr>)
            }
        }
        a()

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <div className={"row dashboard-style"}>
                        <div className="col-md-3 col-analytics-dashboard">
                            <div className="card">
                                <hgroup>
                                    <h4>Faol talabalar</h4>
                                    <h2 className="text-warning">5</h2>
                                </hgroup>
                            </div>
                        </div>
                        <div className="col-md-3 col-analytics-dashboard">
                            <div className="card">
                                <hgroup>
                                    <h4>Faol talabalar</h4>
                                    <h2 className="text-warning">5</h2>
                                </hgroup>
                            </div>
                        </div>
                        <div className="col-md-3 col-analytics-dashboard">
                            <div className="card">
                                <hgroup>
                                    <h4>Faol talabalar</h4>
                                    <h2 className="text-warning">5</h2>
                                </hgroup>
                            </div>
                        </div>
                        <div className="col-md-3 col-analytics-dashboard">
                            <div className="card">
                                <hgroup>
                                    <h4>Faol talabalar</h4>
                                    <h2 className="text-warning">5</h2>
                                </hgroup>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"schedule-block container"}>
                    <p className={"schedule-block__title"}>Schedule</p>

                    <div className="d-block col-12">
                        <Nav tabs>
                            <NavItem className={activeTab === '1' ? "tab-item-style-active" : "tab-item-style-default"}>
                                <NavLink
                                    onClick={() => {
                                        toggle('1');
                                    }}
                                >
                                    Odd days
                                </NavLink>
                            </NavItem>
                            <NavItem className={activeTab === '2' ? "tab-item-style-active" : "tab-item-style-default"}>
                                <NavLink
                                    onClick={() => {
                                        toggle('2');
                                    }}
                                >
                                    Weekend days
                                </NavLink>
                            </NavItem>
                            <NavItem className={activeTab === '3' ? "tab-item-style-active" : "tab-item-style-default"}>
                                <NavLink
                                    onClick={() => {
                                        toggle('3');
                                    }}
                                >
                                    Every day
                                </NavLink>
                            </NavItem>
                            <NavItem className={activeTab === '4' ? "tab-item-style-active" : "tab-item-style-default"}>
                                <NavLink
                                    onClick={() => {
                                        toggle('4');
                                    }}
                                >
                                    Other
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Table>
                                    <thead>
                                    <tr>
                                        <td>Time</td>
                                        {rooms ? rooms.map((item, i) =>
                                            <td>
                                                {item.name}
                                            </td>
                                        ) : ''}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        arrayList.map(item => {
                                            return item;
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </TabPane>

                            <TabPane tabId="2" className={"teacher-salary-block"}>
                                <Table>
                                    <thead>
                                    <tr>
                                        <td></td>
                                        <td>iii</td>
                                        <td>Super Dispatch</td>
                                        <td>Kpi.com</td>
                                        <td>Workly</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {teacherSalaryList ? teacherSalaryList.map((item, i) =>
                                        <tr key={i + 1} className={"table-row-data"}>
                                            <td>{i + 1}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.payType ? item.payType.name : ''}</td>
                                            <td>{item.description}</td>
                                            <td>{moment(item.amountDate).format('LLL').toString()}</td>
                                            <td>
                                                <Button className="table-icon">
                                                    <EditIcon/>
                                                </Button>
                                                <Button className="table-icon">
                                                    <DeleteIcon/>
                                                </Button>
                                            </td>
                                        </tr>
                                    ) : 'Malumot topilmadi'}
                                    </tbody>
                                </Table>
                            </TabPane>

                            <TabPane tabId="3" className={"teacher-salary-block"}>
                                <Table>
                                    <thead>
                                    <tr>
                                        <td></td>
                                        <td>iii</td>
                                        <td>Super Dispatch</td>
                                        <td>Kpi.com</td>
                                        <td>Workly</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {teacherSalaryList ? teacherSalaryList.map((item, i) =>
                                        <tr key={i + 1} className={"table-row-data"}>
                                            <td>{i + 1}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.payType ? item.payType.name : ''}</td>
                                            <td>{item.description}</td>
                                            <td>{moment(item.amountDate).format('LLL').toString()}</td>
                                            <td>
                                                <Button className="table-icon">
                                                    <EditIcon/>
                                                </Button>
                                                <Button className="table-icon">
                                                    <DeleteIcon/>
                                                </Button>
                                            </td>
                                        </tr>
                                    ) : 'Malumot topilmadi'}
                                    </tbody>
                                </Table>
                            </TabPane>

                            <TabPane tabId="4" className={"teacher-salary-block"}>
                                <Table>
                                    <thead>
                                    <tr>
                                        <td></td>
                                        <td>iii</td>
                                        <td>Super Dispatch</td>
                                        <td>Kpi.com</td>
                                        <td>Workly</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {teacherSalaryList ? teacherSalaryList.map((item, i) =>
                                        <tr key={i + 1} className={"table-row-data"}>
                                            <td>{i + 1}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.payType ? item.payType.name : ''}</td>
                                            <td>{item.description}</td>
                                            <td>{moment(item.amountDate).format('LLL').toString()}</td>
                                            <td>
                                                <Button className="table-icon">
                                                    <EditIcon/>
                                                </Button>
                                                <Button className="table-icon">
                                                    <DeleteIcon/>
                                                </Button>
                                            </td>
                                        </tr>
                                    ) : 'Malumot topilmadi'}
                                    </tbody>
                                </Table>
                            </TabPane>
                            {/*  END TAB PANE  */}

                        </TabContent>
                    </div>
                </div>
            </AdminLayout>
        );
    }
}

Dashboard.propTypes = {};

export default connect(({
                            app: {
                                groups,
                                payTypes,
                                currentItem,
                                loading,
                                showModal,
                                deleteModal,
                                parentItems,
                                regions,
                                durationTypes,
                                getItems,
                                readModal,
                                showOpenSalaryModal,
                                showOpenSalaryModal1,
                                teacherSalary,
                                teacherSalaryList,
                                showEditSalaryModal,
                                deleteSalaryModal,
                                page, size, totalElements,
                                rooms,
                                dailySchedule
                            },
                        }) => ({
        groups,
        payTypes,
        currentItem,
        loading,
        durationTypes,
        showModal,
        deleteModal,
        parentItems,
        regions,
        getItems,
        readModal,
        showOpenSalaryModal,
        showOpenSalaryModal1,
        teacherSalary,
        teacherSalaryList,
        showEditSalaryModal,
        deleteSalaryModal,
        page, size, totalElements,
        rooms,
        dailySchedule
    })
)(Dashboard);
