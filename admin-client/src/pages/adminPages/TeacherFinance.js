import React, {Component} from 'react';
import AdminLayout from "../../component/AdminLayout";
import {Button, Col, Nav, NavItem, NavLink, TabContent, Table, TabPane} from "reactstrap";
import {
    getFinanceAction, getFinanceTeacherAction, getStudentPaymentListByDateAction,

    getStudentsAction,

} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "react-js-pagination";
import {AvField, AvForm} from "availity-reactstrap-validation";

class TeacherFinance extends Component {

    handlePageChange(pageNumber) {
        this.props.dispatch(getFinanceTeacherAction({page: (pageNumber - 1), size: this.props.size}))
    }

    componentDidMount(pageNumber) {
        this.props.dispatch(getFinanceTeacherAction({page: 0, size: this.props.size, type: "minusSalary"}))
    }

    state = {
        showModal: false,
        showPaymentModal: false,
        showModal1: false,
        showPaymentEditModal: false,
        currentObject: '',
        addGroup: "",
        activeTab: "minusSalary",
        percentOfCash: "",
        sumOfCash: "",
        cashBackSumm: 0,
    }

    render() {

        const {currentObject, activeTab,} = this.state;
        const {
            dispatch, page, size, totalElements, teacherPaymentFinance
        } = this.props;

        const a = (tab) => {
            this.setState({activeTab: tab})
        }

        const toggle = (tab) => {
            this.setState({activeTab: tab})
            dispatch(getFinanceTeacherAction({page: 0, size: this.props.size, type: tab}))
            console.log(tab);
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
                type: v.type
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
                        <NavItem className={""}>
                            <NavLink
                                onClick={() => {
                                    toggle('minusSalary');
                                }}
                            >
                                Olingan Summalar
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                onClick={() => {
                                    toggle('plusSalary');
                                }}
                            >
                                Tushgan Summar
                            </NavLink>
                        </NavItem>

                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="minusSalary">
                            <div>
                                <div className={"flex-column container"}>
                                    <Table className={"table-style w-100"}>
                                        <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>O'qituvchi</td>
                                            <td>Summa</td>
                                            <td>Tolov Turi</td>
                                            <td>Izoh</td>
                                            <td>Tolov vaqti</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {teacherPaymentFinance ? teacherPaymentFinance.map((item, i) =>
                                            <tr key={i + 1}>
                                                <td>{i + 1}</td>
                                                <td>
                                                    <Link to={"/admin/teacher/"+ (item  && item.teacherId ? item.teacherId:'')}>
                                                        {item  ? item.teacherName: ''}
                                                    </Link>
                                                </td>
                                                <td>{item && item.amount ? item.amount : ""}</td>
                                                <td>{item.payType ? item.payType.name : ''}</td>
                                                <td>{item.description}</td>
                                                <td>{item.amountDate}</td>
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
                        <TabPane tabId="plusSalary">
                            <div>
                                <div className={"flex-column container"}>
                                    <Table className={"table-style w-100"}>
                                        <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>O'qituvchi</td>
                                            <td>O'quvchi</td>
                                            <td>Summa</td>
                                            <td>Guruh</td>
                                            <td>Tolov vaqti</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {teacherPaymentFinance ? teacherPaymentFinance.map((item, i) =>
                                            <tr key={i + 1}>
                                                <td>{i + 1}</td>
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
                                                <td>{item.payDate}</td>
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

TeacherFinance.propTypes = {};

export default connect(({
                            app: {
                                page, size, totalElements, teacherPaymentFinance

                            },
                        }) => ({
        page, size, totalElements, teacherPaymentFinance
    })
)(TeacherFinance);
