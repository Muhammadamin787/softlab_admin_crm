import React, {Component} from 'react';
import AdminLayout from "../../component/AdminLayout";
import {Button, Col, Nav, NavItem, NavLink, TabContent, Table, TabPane} from "reactstrap";
import {
    getFinanceAction,
    getStudentPaymentListByDateAction,

} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "react-js-pagination";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {login} from "../../redux/actions/AuthActions";
import moment from "moment";

class StudentFinance extends Component {

    handlePageChange(pageNumber) {
        console.clear()
        this.props.dispatch(getFinanceAction({page: (pageNumber - 1), size: this.props.size, type: this.state.type}))
    }

    componentDidMount() {
        console.clear()
        this.props.dispatch(getFinanceAction({page: 0, size: this.props.size, type: "all"}))

    }

    state = {
        showModal: false,
        showPaymentModal: false,
        showModal1: false,
        showPaymentEditModal: false,
        currentObject: '',
        addGroup: "",
        type: '',
        activeTab: "all",
        percentOfCash: "",
        sumOfCash: "",
        date1: "",
        cashBackSumm: 0,
    }

    render() {

        const {currentObject, activeTab} = this.state;
        const {
            dispatch, page, size, totalElements, studentPaymentFinance
        } = this.props;


        const a = (tab) => {
            this.setState({activeTab: tab})
        }
        const toggle = (tab) => {
            this.setState({activeTab: tab})
            this.setState({type: tab})
            dispatch(getFinanceAction({page: 0, size: this.props.size, type: tab}))
        }

        function showHide() {
            var element = document.getElementById("filtrMenu");
            element.classList.toggle("hide");
        }

        const filtrByDate = (e, v) => {
            dispatch(getStudentPaymentListByDateAction({
                page: 0,
                size: this.props.size,
                date1: v.date1,
                date2: v.date2,
                type: this.state.type
            }))
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className="container">
                    <h3>Moliya</h3>
                    <h5 className="mb-3" onClick={showHide}>Filtr</h5>
                    <div id="filtrMenu">
                        <div className="row mb-4">
                            <Col>
                                <AvForm onValidSubmit={filtrByDate}>
                                    <AvField type="date" className="form-control" name={"date1"}/>

                                    <AvField type="date" className="form-control" name={"date2"}/>

                                    <Button type={"submit"}>Saqlash</Button>

                                </AvForm>
                            </Col>
                        </div>
                    </div>
                    <Nav tabs>
                        <NavItem className={activeTab === 'all' ? "tab-item-style-active" : "tab-item-style-default"}>
                            <NavLink
                                onClick={() => {
                                    toggle('all');
                                }}
                            >
                                Barchasi
                            </NavLink>
                        </NavItem>
                        <NavItem
                            className={activeTab === 'byCashbacks' ? "tab-item-style-active" : "tab-item-style-default"}>
                            <NavLink
                                onClick={() => {
                                    toggle('byCashbacks');
                                }}
                            >
                                Cashbacklar
                            </NavLink>
                        </NavItem>
                        <NavItem
                            className={activeTab === 'getPrice' ? "tab-item-style-active" : "tab-item-style-default"}>
                            <NavLink
                                onClick={() => {
                                    toggle('getPrice');
                                }}
                            >
                                Tushumlar
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="all">
                            <div>
                                <div className={"flex-column container"}>
                                    <Table className={"table-style w-100"}>
                                        <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>Student</td>
                                            <td>Summa</td>
                                            <td>Cash Foiz %</td>
                                            <td>Tolov Turi</td>
                                            <td>Izoh</td>
                                            <td>Tolov vaqti</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {studentPaymentFinance ? studentPaymentFinance.map((item, i) =>
                                            <tr key={i + 1}>
                                                <td>{page > 0 ? (size * page) + i + 1 : i + 1}</td>
                                                <td>
                                                    <Link to={"/admin/student/" + (item && item.student
                                                        ? item.student.id : '')}>
                                                        {item && item.student && item.student.user ? item.student.user.fullName + " / " + item.student.user.phoneNumber : ''}
                                                    </Link>
                                                </td>
                                                <td>{item.sum + " / " + item.cashSum}</td>
                                                <td>{item && item.cashback ? item.cashback.percent + " %" : "0%"}</td>
                                                <td>{item.payType ? item.payType.name : ''}</td>
                                                <td>{item.comment}</td>
                                                <td>{moment(item.payDate).format('LLL').toString()}</td>
                                            </tr>
                                        ) : 'Malumot topilmadi'}
                                        </tbody>
                                    </Table>
                                    <Pagination
                                        activePage={page + 1}
                                        itemsCountPerPage={size}
                                        totalItemsCount={totalElements}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange.bind(this)} itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tabId="byCashbacks">
                            <div>
                                <div className={"flex-column container"}>
                                    <Table className={"table-style w-100"}>
                                        <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>O'quvchi</td>
                                            <td>Summa</td>
                                            <td>Cah Foiz %</td>
                                            <td>To'lov Turi</td>
                                            <td>Izoh</td>
                                            <td>Tolov vaqti</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {studentPaymentFinance ? studentPaymentFinance.map((item, i) =>
                                            <tr key={i + 1}>
                                                <td>{page > 0 ? (size * page) + i + 1 : i + 1}</td>
                                                <td>
                                                    <Link to={"/admin/student/" + (item && item.student
                                                        ? item.student.id : '')}>
                                                        {item && item.student && item.student.user ? item.student.user.fullName + " / " + item.student.user.phoneNumber : ''}
                                                    </Link>
                                                </td>
                                                <td>{item.sum + " / " + item.cashSum}</td>
                                                <td>{item && item.cashback ? item.cashback.percent + " %" : ''}</td>
                                                <td>{item.payType ? item.payType.name : ''}</td>
                                                <td>{item.comment}</td>
                                                <td>{moment(item.payDate).format('LLL').toString()}</td>
                                            </tr>
                                        ) : 'Malumot topilmadi'}
                                        </tbody>
                                    </Table>
                                    <Pagination
                                        activePage={page + 1}
                                        itemsCountPerPage={size}
                                        totalItemsCount={totalElements}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange.bind(this)} itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tabId="getPrice">
                            <div>
                                <div className={"flex-column container"}>
                                    <Table className={"table-style w-100"}>
                                        <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>O'quvchi</td>
                                            <td>Summa</td>
                                            <td>Tolov vaqti</td>
                                            <td>Guruhi</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {studentPaymentFinance ? studentPaymentFinance.map((item, i) =>
                                            <tr key={i + 1}>
                                                <td>{page > 0 ? (size * page) + i + 1 : i + 1}</td>
                                                <td>
                                                    <Link
                                                        to={"/admin/student/" + (item && item.attendance && item.attendance.student
                                                            ? item.attendance.student.id : '')}>
                                                        {item && item.attendance && item.attendance.student && item.attendance.student.user ? item.attendance.student.user.fullName + " / " + item.attendance.student.user.phoneNumber : ''}
                                                    </Link>
                                                </td>
                                                <td>{item.amount}</td>
                                                <td>{moment(item && item.attendance ? item.attendance.attendDate : "").format('LLL').toString()}</td>
                                                <td>{item && item.attendance && item.attendance.group ? item.attendance.group.name : ""}</td>
                                            </tr>
                                        ) : 'Malumot topilmadi'}
                                        </tbody>
                                    </Table>
                                    <Pagination
                                        activePage={page + 1}
                                        itemsCountPerPage={size}
                                        totalItemsCount={totalElements}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange.bind(this)} itemClass="page-item"
                                        linkClass="page-link"
                                    />
                                </div>
                            </div>
                        </TabPane>
                    </TabContent>
                </div>
            </AdminLayout>
        );
    }
}

StudentFinance.propTypes = {};

export default connect(({
                            app: {
                                studentPayments,
                                page,
                                size,
                                totalElements,
                                teacherSalaryAppApi,
                                studentPaymentCashbaks,
                                studentPaymentFinance

                            },
                        }) => ({
        studentPayments, page, size, totalElements, teacherSalaryAppApi, studentPaymentCashbaks, studentPaymentFinance
    })
)(StudentFinance);
