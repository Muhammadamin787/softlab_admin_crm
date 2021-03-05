import React, {Component} from 'react';
import AdminLayout from "../../component/AdminLayout";
import {Nav, NavItem, NavLink, TabContent, Table, TabPane} from "reactstrap";
import {
    getFinanceAction,


  getStudentPaymentListByDateAction,
    getStudentsAction,
    getTeacherSalaryAppAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Pagination from "react-js-pagination";

class StudentFinance extends Component {

    handlePageChange(pageNumber) {
        console.clear()
        this.props.dispatch(getStudentsAction({page: (pageNumber - 1), size: this.props.size}))
    }

    componentDidMount() {
        console.clear()
        let id = 0
        this.props.dispatch(getFinanceAction({page: 0, size: this.props.size, type: "all"}))

    }

    state = {
        showModal: false,
        showPaymentModal: false,
        showModal1: false,
        showPaymentEditModal: false,
        currentObject: '',
        addGroup: "",
        activeTab: "1",
        percentOfCash: "",
        sumOfCash: "",
        date1: "",
        cashBackSumm: 0,
    }

    render() {

        const {currentObject, activeTab,} = this.state;
        const {
            dispatch,page, size, totalElements,studentPaymentFinance
        } = this.props;


        const a = (tab) => {
            this.setState({activeTab: tab})
        }
        const toggle = tab => {
            dispatch(getFinanceAction({page: 0, size: this.props.size , type : tab}))
        }

        function showHide() {
            var element = document.getElementById("filtrMenu");
            element.classList.toggle("hide");
        }

        const filtrByDate = (e) => {
            if(e.nativeEvent.path[0].name === 'date2'){
                dispatch(getStudentPaymentListByDateAction({page: 0, size: this.props.size, date1: this.state.date1, date2: e.target.value}))
            }else{
                this.setState({date1: e.target.value})
            }

        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className="container">
                    <h3>Moliya</h3>
                    <h5 className="mb-3" onClick={showHide}>Filtr</h5>
                    <div id="filtrMenu">
                        <div className="row mb-4">
                            <div className="col-md-3">
                                <input type="date" className="form-control" name={"date1"} onChange={filtrByDate}/>
                            </div>
                            <div className="col-md-3">
                                <input type="date" className="form-control" name={"date2"} onChange={filtrByDate}/>
                            </div>
                        </div>
                    </div>
                    <Nav tabs>
                        <NavItem className={""}>
                            <NavLink
                                onClick={() => {
                                    toggle('all');
                                }}
                            >
                                Barchasi
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                onClick={() => {
                                    toggle('byCashbacks');
                                }}
                            >
                                Cashbacklar
                            </NavLink>
                        </NavItem>
                        <NavItem>
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
                        <TabPane tabId="1">
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
                                        {console.log(studentPaymentFinance)}
                                        {studentPaymentFinance ? studentPaymentFinance.map((item, i) =>
                                            <tr key={i + 1}>
                                                <td>{i + 1}</td>
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
                        <TabPane tabId="2">
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

StudentFinance.propTypes = {};

export default connect(({
                            app: {
                                studentPayments,
                                page, size, totalElements, teacherSalaryAppApi, studentPaymentCashbaks,studentPaymentFinance

                            },
                        }) => ({
        studentPayments, page, size, totalElements, teacherSalaryAppApi, studentPaymentCashbaks,studentPaymentFinance
    })
)(StudentFinance);
