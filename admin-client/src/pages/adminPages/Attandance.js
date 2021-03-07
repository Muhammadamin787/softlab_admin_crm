import React, {Component} from 'react';
import AdminLayout from "../../component/AdminLayout";
import {Row, Button, Col, Input, Table, Container, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {connect} from "react-redux";
import {
    getAttendanceListAction,
    getGroupsAction,
    getStudentsByGroupAction,
    saveAttendanceAction
} from "../../redux/actions/AppActions";
import Select from "react-select";
import {AvForm, AvField} from "availity-reactstrap-validation"
import moment from "moment";

class Attandance extends Component {
    componentDidMount() {
        this.props.dispatch(getGroupsAction({page: 0, size: this.props.size}))
        console.clear()

        let year = new Date().getFullYear()
        let month = new Date().getMonth()
        let date = new Date().getDate()


        let arr = []
        for (let i = 1; i <= new Date(this.state.year, this.state.month + 1, 0).getDate(); i++) {
            arr.push(i)
        }
        this.setState({
            daysOfMonth: arr,
            year: year,
            month: month,
            day: date
        })


        let array = []
        this.props.groups.forEach(item =>
            array.push({
                value: item.id,
                label: item.name + "/" + item.courseName + " [" + item.startTime + " " + item.finishTime + "]"
            })
        )
        this.setState({groupSelect: array})
    }

    state = {
        days: ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Ju', 'Shan'],
        months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktyabr", "Noyabr", "Dekabr"],

        year: '',
        //Bitta kam sanaladi
        month: '',
        day: '',

        daysOfMonth: [],

        groupSelect: [],
        currentGroup: "",
        openModal: false,
        currentDay: ''
    }

    render() {

        const {days, months, year, month, daysOfMonth, day, dayName, groupSelect, currentGroup, openModal, currentDay} = this.state
        const {groups, attendanceList, students} = this.props

        console.log(attendanceList)

        const plusM = () => {
            if (month === 11) {
                this.setState({month: 0})
                this.setState({year: year + 1})
            } else {
                this.setState({month: month + 1})
            }

            let arr = []
            for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
                arr.push(i)
            }
            this.setState({daysOfMonth: arr})


        }

        const minusM = () => {
            if (month === 0) {
                this.setState({month: 11})
                this.setState({year: year - 1})
            } else {
                this.setState({month: month - 1})
            }
            let arr = []
            for (let i = 1; i <= new Date(year, month, 0).getDate(); i++) {
                arr.push(i)
            }
            this.setState({daysOfMonth: arr})
        }

        const getAttendance = (e) => {
            this.props.dispatch(getAttendanceListAction(e.value))
            this.props.dispatch(getStudentsByGroupAction(e.value))

            groups.forEach(item =>
                item.id === e.value ?
                    (
                        this.setState({currentGroup: item})
                    )
                    : ""
            )
        }

        const saveAttendance = (e, v) => {
            let arr = []
            students.map(item => {
                arr.push({
                    studentId: item.id,
                    active: document.getElementById(item.id).checked
                })
            })
            v.studentList = arr
            console.log(v)
            this.props.dispatch(saveAttendanceAction(v))
            showHideModal()
        }

        const gg = {
            overflowX: "scroll",
            overflowY: "auto",
            marginTop: "20px",
        }

        const showHideModal = (item) => {
            if (item) {
                this.setState({
                    openModal: !openModal,
                    currentDay: year + "-" + ((month) > 9 ? (month) : "0" + (month)) + "-" + (item > 9 ? item : "0" + item)
                })
            } else {
                this.setState({
                    openModal: !openModal,
                    currentDay: ""
                })
            }

        }


        return (
            <div>
                <AdminLayout pathname={this.props.location.pathname}>
                    <Container>
                        <Row>
                            <Col>
                                <Select
                                    placeholder="Guruhni tanlang..."
                                    isSearchable={true}
                                    options={groupSelect}
                                    onChange={getAttendance}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Container>
                    <hr/>
                    {currentGroup !== "" ?
                        <div className={"position-relative test12345 px-3 pt-3 p-0 mr-3"}>
                            <div>
                                <Row>
                                    <Col md={1}>
                                        <i onClick={minusM} className="fas fa-angle-left"/>
                                    </Col>
                                    <Col md={2}>
                                        {" " + year + " - yil, " + months[month] + " "}
                                    </Col>
                                    <Col md={1}>
                                        <i onClick={plusM} className="fa fa-angle-right"/>
                                    </Col>
                                </Row>
                            </div>
                            <div style={gg}>
                                <Table className={"mb-0"} >
                                <tr>
                                    <td>#</td>
                                    <td>Student</td>
                                    {
                                        daysOfMonth ? daysOfMonth.map(item =>
                                            currentGroup ? currentGroup.weekdays.map(c_item =>
                                                c_item === days[new Date(year, month, item).getDay()] ?
                                                    <td className={"text-center attandance-block_table_td__days"}>
                                                        {item}/{days[new Date(year, month, item).getDay()]}
                                                    </td>
                                                    : ''
                                            ) : ''
                                        ) : ''
                                    }
                                </tr>
                                {students ? students.map((item, i) =>
                                    <tr key={i}>
                                        <td className={"attandance-block_td"}>{i + 1}</td>
                                        <td className={"attandance-block_td"}>{item.fullName}</td>
                                        {daysOfMonth ? daysOfMonth.map(item2 =>
                                            currentGroup ? currentGroup.weekdays.map(c_item =>
                                                c_item === days[new Date(year, month, item2).getDay()] ?
                                                    <td className={"text-center"}>
                                                        {
                                                            attendanceList ? attendanceList.map(item3 =>
                                                                (year + "-" + ((month) > 9 ? (month) : "0" + (month)) + "-" + (item2 > 9 ? item2 : "0" + item2)) === moment(item3.attendDate).format('YYYY-MM-DD') && item.id === item3.student.id && item3.attandanceEnum === "YES" ?
                                                                    <i className="far fa-calendar-check my-2"/> : ''
                                                            ) : ''
                                                        }
                                                    </td>
                                                    : ''
                                            ) : ''
                                        ) : ''}
                                    </tr>
                                ) : ''}
                                <tr>
                                    <td/>
                                    <td/>
                                    {
                                        daysOfMonth ? daysOfMonth.map(item =>
                                            currentGroup ? currentGroup.weekdays.map(c_item =>
                                                c_item === days[new Date(year, month, item).getDay()] ?
                                                    <td className={"text-center"}>
                                                        <i onClick={() => showHideModal(item)}
                                                           className="far fa-calendar-plus"/>
                                                    </td>
                                                    : ''
                                            ) : ''
                                        ) : ''
                                    }
                                </tr>
                            </Table>
                            </div>
                        </div>
                        :
                        ''
                    }
                    <Modal isOpen={openModal}>
                        <ModalHeader>Kunlik davomat</ModalHeader>
                        <ModalBody>
                            <AvForm onValidSubmit={saveAttendance}>
                                {/*<AvField type={"date"} name={"date"}/>*/}
                                <AvField type={"hidden"} name={"date"} defaultValue={currentDay ? currentDay : ''}
                                         pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
                                <AvField type={"hidden"} name={"teacherId"}
                                         defaultValue={currentGroup ? currentGroup.teacherId : ''}/>
                                <AvField type={"hidden"} name={"groupId"}
                                         defaultValue={currentGroup ? currentGroup.id : ''}/>
                                <Table>
                                    {students ? students.map((item, i) =>
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item.fullName}</td>
                                            <td>
                                                <Input type={"checkbox"} id={item.id}/>
                                            </td>
                                        </tr>
                                    ) : ''}
                                </Table>
                                <ModalFooter>
                                    <Button outline onClick={showHideModal}>Bekor qilish</Button>
                                    <Button outline color={"primary"} type={"submit"}>Saqlash</Button>
                                </ModalFooter>
                            </AvForm>
                        </ModalBody>
                    </Modal>
                </AdminLayout>
            </div>
        );
    }
}

Attandance.propTypes = {};

export default connect((
    {
        app: {size, groups, attendanceList, students},
    }) => ({
        size, groups, attendanceList, students
    })
)(Attandance);