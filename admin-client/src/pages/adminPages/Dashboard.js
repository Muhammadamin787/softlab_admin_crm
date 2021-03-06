import React, {Component} from 'react';
import AdminLayout from "../../component/AdminLayout";
import './adminPages.scss';
import {Button, Col, Input, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane} from "reactstrap";
import moment from "moment";
import {DeleteIcon, EditIcon} from "../../component/Icons";
import {getDailySchedule, getRoomListAction, getTeacherSalaryListAction} from "../../redux/actions/AppActions";
import {connect} from "react-redux";

class Dashboard extends Component {

    componentDidMount() {
        this.props.dispatch(getRoomListAction())
        const {currentObject, activeTab, startHour, endHour, minute, list} = this.state;
            let arr = []
            for(let i = startHour; i < endHour; i++) {
                for (let g = 0; g < 2; g++ ) {
                    if (g === 0) {
                        if (i < 10) {
                            arr.push("0" + i + ":" + "00")
                        } else {
                            arr.push(i + ":" + "00")
                        }
                    } else {
                        if (i < 10) {
                            arr.push("0" + i + ":" + "30")
                        } else {
                            arr.push(i + ":" + "30")
                        }
                    }
                }
            }
            this.setState({
                list: arr
            })


    }

    state = {
        activeTab: "1",
        startHour: 7,
        endHour: 22,
        minute: 0,
        list: "",

    }

    render() {
        const {currentObject, activeTab, startHour, endHour, minute, list} = this.state;
        const {
            dispatch,
            teacherSalaryList,
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



        const c = (startTime, finishTime) => {
            let start = list.findIndex(start => start === startTime)
            let finish = list.findIndex(finish => finish === finishTime)
            return finish - start
        }

        const d = (id) => {
            let roomsIndex = rooms.findIndex(r => r.id === id)
            let arr = []
            for (let i = 0;i < roomsIndex;i++) {
                arr.push(
                    <td></td>
                )
            }
            return arr;
        }
        const  l = (e) => {
            this.props.dispatch(getDailySchedule(e.target.value))
        }


        console.log(dailySchedule)


        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
               <div>
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

                       <Input label={"To'lov turi"}  type={"select"} onChange={l}>
                           <option value={"MONDAY"}>Dushanba</option>
                           <option value={"TUESDAY"}>Seshanba</option>
                           <option value={"WEDNESDAY"}>Chorshanba</option>
                           <option value={"THURSDAY"}>Payshanba</option>
                           <option value={"FRIDAY"}>Juma</option>
                           <option value={"SATURDAY"}>Shanba</option>
                           <option value={"SUNDAY"}>Yakshanba</option>
                       </Input>

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
                                   <Table bordered>
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
                                           list ? list.map((item, i) =>
                                               <tr key={i}>
                                                   <td>{item}</td>
                                                   {rooms ? rooms.map((item2, i) =>
                                                       dailySchedule ? dailySchedule.map((item3, i) =>
                                                           item === item3.startTime ?
                                                               item3 && item3.room && item3.room.id === item2.id ?
                                                                   <>
                                                                       {d(item3.room.id)}
                                                                       <td rowSpan={c(item3.startTime, item3.finishTime)}>
                                                                           {item3.name}
                                                                       </td>
                                                                   </>
                                                                   : ''
                                                               : ''
                                                       ) : ''
                                                   ) : ''}

                                               </tr>
                                           ) : ''
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
