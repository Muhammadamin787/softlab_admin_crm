import React, {Component} from 'react';
import AdminLayout from "../../component/AdminLayout";
import {
    Button,
    Col,
    Modal,
    ModalBody,
    ModalFooter, ModalHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    Table,
    TabPane
} from "reactstrap";
import {
    downloadAccountantFileAction,
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
        this.props.dispatch(getFinanceAction({page: (pageNumber - 1), size: this.props.size, type: this.state.type}))
    }

    componentDidMount() {
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
            dispatch,showModal, page, size,totalElements, studentPaymentFinance
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
                date1: moment(v.date1).format('DD-MM-YYYY').toString(),
                date2: moment(v.date2).format('DD-MM-YYYY').toString(),

                type: this.state.type
            }))
        }

        const openAccountantModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    showModal: !showModal
                }
            })
        }

        const saveItem = (e, v) => {
            dispatch(downloadAccountantFileAction({
                startDate: v.startDate,
                finishDate: v.finishDate,
            }))
        }


        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className="container">
                    <h3>Moliya</h3>
                    <h5 className="mb-3" onClick={showHide}>Filtr</h5>
                    <br/>
                    <Button onClick={openAccountantModal} color={"danger"}>Accountant</Button>
                    <br/>
                    <br/>
                    <div id="filtrMenu">
                        <div className="row mb-4">
                            <AvForm onValidSubmit={filtrByDate}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-4">
                                            <AvField type="date" className="form-control" name={"date1"}/>
                                        </div>
                                        <div className="col-4">
                                            <AvField type="date" className="form-control" name={"date2"}/>
                                        </div>
                                        <div className="col-4">
                                            <Button type={"submit"}>Saqlash</Button>
                                        </div>
                                    </div>
                                </div>
                            </AvForm>
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
                                                    <Link to={"/admin/student/" + (item && item.studentId)}>
                                                        {item && item.studentName}
                                                    </Link>
                                                </td>
                                                <td>{item.sum + " / " + item.cashSum}</td>
                                                <td>{item  ? item.cashPercent + " %" : "0%"}</td>
                                                <td>{item.payTypeName}</td>
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
                                                    <Link to={"/admin/student/" + (item & item.studentId)}>
                                                        {item && item.studentName}
                                                    </Link>
                                                </td>
                                                <td>{item.sum + " / " + item.cashSum}</td>
                                                <td>{item  ? item.cashPercent + " %" : ''}</td>
                                                <td>{item.payTypeName}</td>
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
                                        {console.log(studentPaymentFinance)}
                                        {studentPaymentFinance ? studentPaymentFinance.map((item, i) =>
                                            <tr key={i + 1}>
                                                <td>{page > 0 ? (size * page) + i + 1 : i + 1}</td>
                                                <td>
                                                    <Link
                                                        to={"/admin/student/" + (item && item.studentId)}>
                                                        {item ? item.studentName : ''}
                                                    </Link>
                                                </td>
                                                <td>{item.amount}</td>
                                                <td>{moment(item && item.createdAt).format('LLL').toString()}</td>
                                                <td>{item && item.groupName}</td>
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

                    <Modal id={"allModalStyle"} isOpen={showModal} toggle={openAccountantModal} className={""}>
                        <AvForm className={""} onValidSubmit={saveItem}>
                            <ModalHeader toggle={openAccountantModal} charCode={"X"}>
                                {"Qo'shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField type={"date"} label={"Malumotlar olishni boshlash sanasi"}
                                             name={"startDate"}/>
                                    <AvField type={"date"} label={"Malumotlar olishni tugatish sanasi"}
                                             name={"finishDate"}/>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button>Malumotlarni Yuklash</Button>
                            </ModalFooter>
                        </AvForm>
                    </Modal>
                </div>
            </AdminLayout>
        );
    }
}

StudentFinance.propTypes = {};

export default connect(({
                            app: {
                                showModal,
                                studentPayments,
                                page,
                                size,
                                totalElements,
                                teacherSalaryAppApi,
                                studentPaymentCashbaks,
                                studentPaymentFinance

                            },
                        }) => ({
        showModal,studentPayments, page, size, totalElements, teacherSalaryAppApi, studentPaymentCashbaks, studentPaymentFinance
    })
)(StudentFinance);
