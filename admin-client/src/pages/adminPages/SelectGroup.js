import React, {Component} from 'react';
import {
    Button,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table,
    Input,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane
} from "reactstrap";
import AsyncSelect from "react-select";
import {AvForm, AvField, AvCheckboxGroup, AvCheckbox} from "availity-reactstrap-validation";
import {
    changeStudentGroupStatusAction,
    deleteGroupAction, getAttendanceListAction,
    getCoursesAction,
    getGroupAction, getGroupsForSelectAction, getGroupStudentsAction,
    getRoomListAction, getStudentOnSearchAction, getStudentPaymentAction,
    getTeachersForSelectAction, saveAttendanceAction,
    saveGroupAction, saveStudentToGroupAction,
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {DeleteIcon, EditIcon} from "../../component/Icons";
import AdminLayout from "../../component/AdminLayout";
import {Link} from "react-router-dom";
import moment from "moment";
import {formatPhoneNumber} from "../../utils/addFunctions";
import Select from "react-select";
import {AiOutlinePlusCircle, FaRegCalendarCheck, FaRegCalendarPlus} from "react-icons/all";

class SelectGroup extends Component {
    componentDidMount() {
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            const {dispatch} = this.props
            id = this.props.match.params.id;
            dispatch(getGroupAction({id: id}))
            dispatch(getGroupStudentsAction({id: id}))
            dispatch(getRoomListAction())
            dispatch(getCoursesAction())
            dispatch(getGroupsForSelectAction())
            dispatch(getTeachersForSelectAction())
            dispatch(getAttendanceListAction(id))

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
        }
    }

    state = {
        showModal: false,
        currentObject: "",
        dropdownOpen: false,
        activeTab: "1",
        groupInput: false,
        newGroup: [],
        days: ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Ju', 'Shan'],
        months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktyabr", "Noyabr", "Dekabr"],
        year: '',
        month: '',
        selectedOption: [],
        selectedStudent: [],
        optionsOfStudent: [],
        daysOfMonth: [],
        openModal1: false,
        showOptionDiv: false,
        currentDay: '',
        allAttendance: [],
        oneAttendDate: ''
    }

    render() {
        const {
            days, months, year, month, daysOfMonth, activeTab, openModal1, currentDay, currentObject
        } = this.state
        const {
            selectItems,
            changeStatusModal,
            students,
            history,
            dispatch,
            showModal,
            deleteModal,
            addStudentInGroupModal,
            currentItem,
            teachers,
            getItems,
            rooms,
            studentsOption,
            attendanceList
        } = this.props;

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
        const openModal = (item) => {
            if (item && item.id) {
                this.setState({currentObject: item})
                dispatch({
                    type: "updateState",
                    payload: {
                        showModal: !showModal
                    }
                })
            } else {
                if (showModal) {
                    dispatch({
                        type: "updateState",
                        payload: {
                            showModal: !showModal
                        }
                    })
                }
            }
        }
        const changeStatusOpenModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    changeStatusModal: !changeStatusModal
                }
            })
        }
        const openDeleteModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    deleteModal: !deleteModal
                }
            })
        }
        const deleteItem = (item) => {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                let id = this.props.match.params.id;
                dispatch(deleteGroupAction({...item, history: history, courseCategoryId: id}))
            }
        }
        const openGroupSelects = (e, v) => {
            if (v === "TRANSFER") {
                this.setState({groupInput: true})
            } else {
                this.setState({groupInput: false})
            }
        }
        const changeStudentStatus = (e, v) => {
            if (this.props.match && this.props.match.params && this.props.match.params.id) {
                v.groupId = this.props.match.params.id;
                v.studentId = currentObject.id
                if (v.situation === "TRANSFER")
                    v.newGroupId = this.state.newGroup
                dispatch(changeStudentGroupStatusAction(v))
            }
        }
        const getTransferGroup = (e, v) => {
            this.setState({newGroup: e.value})
        }
        const saveItem = (e, v) => {
            if (currentObject && currentObject.id) {
                v.id = currentObject.id
                v.finishDate = moment(v.finishDate).format('DD/MM/YYYY hh:mm:ss').toString()
                v.startDate = moment(v.startDate).format('DD/MM/YYYY hh:mm:ss').toString()
                dispatch(saveGroupAction(v))
            }
        }
        const checkAttendence = (bool, id, isDesktop) => {
            console.log(bool, id, isDesktop)
            if (!isDesktop) {
                let activeBtn = document.getElementById("active" + id);
                let notActiveBtn = document.getElementById("notActive" + id);
                if (bool) {
                    activeBtn.classList.remove("not-active-btn-style");
                    activeBtn.classList.add("active-btn-style");
                    notActiveBtn.classList.remove("active-btn-style");
                    notActiveBtn.classList.add("not-active-btn-style");
                } else {
                    notActiveBtn.classList.remove("not-active-btn-style");
                    notActiveBtn.classList.add("active-danger-btn-style");
                    activeBtn.classList.remove("active-btn-style");
                    activeBtn.classList.add("not-active-btn-style");
                }
            }
            let array = this.state.allAttendance;
            if (array.length > 0) {
                for (let i = 0; i < array.length; i++) {
                    let studentId = isDesktop ? "desktop" + array[i].studentId : array[i].studentId;
                    if (studentId === id) {
                        array[i].attended = bool;
                        break;
                    }
                }
            } else {
                array[0].attended = false;
                array[0].studentId = id;
                array[0].student = id;
                for (let i = 0; i < array.length; i++) {
                    let studentId = isDesktop ? "desktop" + array[i].studentId : array[i].studentId;
                    if (studentId === id) {
                        array[i].attended = bool;
                        break;
                    }
                }
            }
            console.log(array);
            this.setState({allAttendence: array})
        }
        const saveAttendance = (e, v, fromMobile) => {
            let arr = []
            if (fromMobile) {
                this.state.allAttendance.map(item => {
                    arr.push({
                        studentId: item.studentId,
                        active: item.attended
                    })
                })
            } else {
                students.map(item =>
                    item.studentGroupDto.studentGroupStatus === "ACTIVE" ? (
                        arr.push({
                            studentId: item.id,
                            active: document.getElementById("desktop" + item.id).checked
                        })
                    ) : ""
                )
            }
            v.studentList = arr
            v.date = moment(v.date).format('YYYY-MM-DD').toString()
            showHideModal()
            this.props.dispatch(saveAttendanceAction(v))
        }
        const saveAttendanceMobile = (e, v) => {
            saveAttendance(e, v, true)
        }
        const gg = {
            overflowX: "scroll",
            overflowY: "auto",
            marginTop: "20px",
            fontSize: "14px",
        }
        const tableStyle = {
            backgroundColor: "white"
        }
        const showHideModal = (year, month, item) => {
            let oneDate = moment(new Date(year, month, item)).format("DD-MM-yyyy");
            let attends = [];
            let hasThisDate = true;
            let array = []
            attendanceList.map(e => {
                if (e.student.studentGroup && e.student.studentGroup[0].studentGroupStatus === 'ACTIVE') {
                    let date = moment(e.attendDate).format('DD-MM-yyyy');
                    if (oneDate === date) {
                        hasThisDate = false;
                        attends.push({
                            attended: e.attandanceEnum === 'YES',
                            student: e.student.user.fullName,
                            studentId: e.student.id
                        })
                    }
                }
            })
            if (hasThisDate) {
                students && students.map(student => {
                        if (student.studentGroupDto && student.studentGroupDto.studentGroupStatus === 'ACTIVE') {
                            array.push({
                                attended: '',
                                student: student.fullName,
                                studentId: student.id
                            })
                        }
                    }
                )
                attends = array;
            }
            this.setState({allAttendance: attends});
            if (item) {
                this.setState({
                    openModal1: !openModal1,
                    currentDay: year + "-" + ((month + 1) > 9 ? (month + 1) : "0" + (month + 1)) + "-" + (item > 9 ? item : "0" + item)
                })
            } else {
                this.setState({
                    openModal1: !openModal1,
                    currentDay: ""
                })
            }
        }
        const toggle = tab => {
            if (activeTab !== tab)
                this.setState({activeTab: tab})
            if (tab === "2") {
                if (this.props.match && this.props.match.params && this.props.match.params.id) {
                    dispatch(getStudentPaymentAction(this.props.match.params.id))
                }
            }
        }
        const openAddStudentModal = (item) => {
            if (item && item.id) {
                this.setState({currentObject: item})
                dispatch({
                    type: "updateState",
                    payload: {
                        addStudentInGroupModal: !addStudentInGroupModal
                    }
                })
            } else {
                if (addStudentInGroupModal) {
                    dispatch({
                        type: "updateState",
                        payload: {
                            addStudentInGroupModal: !addStudentInGroupModal
                        }
                    })
                }
            }
        }
        const openAddStudentInGroupModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    addStudentInGroupModal: !addStudentInGroupModal
                }
            })
            dispatch(getStudentOnSearchAction({name: ""}))
        }
        const selectStudentOption = (e) => {
            if (e)
                this.setState({selectedStudent: {name: e.label, id: e.id}})
            else
                this.setState({selectedStudent: ''})
        }
        const handleInputChange = (e) => {
            if (e.length > 0) {
                dispatch(getStudentOnSearchAction({name: e, id: currentItem.id}))
            } else {
                dispatch({
                    type: 'updateState',
                    payload: {
                        studentsOption: []
                    }
                })
            }
        }
        const selectedOptions = (e) => {
            console.log("selected options")
        }
        const addStudentSaveItem = (e, v) => {
            let obj = {
                name: this.state.selectedStudent.name,
                studentId: this.state.selectedStudent.id,
                groupId: currentItem.id
            }
            this.props.dispatch(saveStudentToGroupAction(obj));
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <Row>
                        <Col md={4}>
                            <hgroup className={"course-select-header"}>
                                <h3>{currentItem && currentItem.name} </h3>

                                <Link
                                    to={"/admin/groups"} className={"text-decoration-none"}><span
                                    className={""}>Guruhlar</span>
                                </Link>
                            </hgroup>
                            <div className="row">
                                {currentItem && currentItem.id ?
                                    <>
                                        <div className={"m-2 p-3 bg-white box-shadow rounded col-md-12 col-10"}>
                                            <div className="row">
                                                <div className="col-8">
                                                    <hgroup>
                                                        <small className={"text-secondary"}>Nomi</small>
                                                        <h5>{currentItem.name}</h5>
                                                    </hgroup>
                                                    <hgroup>
                                                        <small className={"text-secondary"}>Kurs: </small>
                                                        <h6>{currentItem.course ? currentItem.course.name : ""} </h6>
                                                    </hgroup>
                                                    <hgroup>
                                                        <small className={"text-secondary"}>O'qituvchi: </small>
                                                        <h6>{currentItem.teacher && currentItem.teacher.user &&
                                                        currentItem.teacher.user.fullName} </h6>
                                                    </hgroup>
                                                    <hgroup>
                                                        <small className={"text-secondary"}>Vaqti: </small>
                                                        <h6>{currentItem.weekdays && currentItem.weekdays.map(i =>
                                                            <span> {i}, </span>)}</h6>
                                                        <h6>{currentItem.startTime + " - " + currentItem.finishTime}</h6>
                                                    </hgroup>
                                                    <hgroup>
                                                        <small className={"text-secondary"}>Guruh muddati: </small>
                                                        <h6>{
                                                            moment(currentItem.startDate).format("DD-MM-yyyy") + " -- " +
                                                            moment(currentItem.finishDate).format("DD-MM-yyyy")
                                                        }</h6>
                                                    </hgroup>
                                                    <hgroup>
                                                        <small className={"text-secondary"}>Xona: </small>
                                                        <h6>{currentItem.room && currentItem.room.name}</h6>
                                                    </hgroup>
                                                    <hgroup>
                                                        <small className={"text-secondary"}>Tavsif: </small>
                                                        <h6>{currentItem.description}</h6>
                                                    </hgroup>
                                                    <div>
                                                        <Button onClick={() => openAddStudentInGroupModal()}>
                                                            <AiOutlinePlusCircle/>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <Button className="table-icon"
                                                            onClick={() => openModal(currentItem)}>
                                                        <EditIcon/>
                                                    </Button>
                                                    <Button className="table-icon"
                                                            onClick={() => openDeleteModal(currentItem)}>
                                                        <DeleteIcon/>
                                                    </Button>
                                                </div>
                                            </div>
                                            {/* START GURUHDAGI STUDENTLAR RO'YHATI*/}
                                            <div className={"student-list border-top py-3 px-1"}>
                                                {students && students.length > 0 && students.map((student, i) =>
                                                        <div key={i} className={"row"}>
                                                            {student.studentGroupDto ?
                                                                <div className="col-6">
                                                    <span
                                                        className={"px-1 " + (student.studentGroupDto.studentGroupStatus === "TRANSFER" ?
                                                            "bg-light text-secondary" :
                                                            student.studentGroupDto.studentGroupStatus === "ACTIVE" ?
                                                                "text-success" :
                                                                student.studentGroupDto.studentGroupStatus === "ARCHIVE" ?
                                                                    "text-light bg-secondary" :
                                                                    student.studentGroupDto.studentGroupStatus === "FROZEN" ?
                                                                        "bg-info text-white" :
                                                                        student.studentGroupDto.studentGroupStatus === "TEST_LESSON" ?
                                                                            "bg-warning text-dark" :
                                                                            "")}>
                                                {<Link className={"text-dark"}
                                                       to={"/admin/student/" + (student.id)}>{student.fullName}</Link>}
                                                </span>
                                                                </div>
                                                                : ""}
                                                            <div
                                                                className="col-4 small">{formatPhoneNumber(student.phoneNumber)}</div>
                                                            <div className="col-2">
                                                                <Button className="table-icon"
                                                                        onClick={() => changeStatusOpenModal(student)}>
                                                                    <EditIcon/>
                                                                </Button>

                                                            </div>
                                                        </div>
                                                )}
                                            </div>
                                            {/* FINISH GURUHDAGI STUDENTLAR RO'YHATI*/}
                                        </div>
                                        <div>

                                        </div>
                                    </>
                                    : ""}
                            </div>
                        </Col>
                        <Col md={8}>
                            {currentItem !== "" ?
                                <div className={"mt-5"}>
                                    <Nav tabs className={"selectGroupNav"}>
                                        <NavItem
                                            className={activeTab === '1' ? "tab-item-style-active1" : "tab-item-style-default1"}>
                                            <NavLink
                                                onClick={() => {
                                                    toggle('1');
                                                }}
                                            >
                                                Davomat &#128467;
                                            </NavLink>
                                        </NavItem>
                                        <NavItem
                                            className={activeTab === '2' ? "tab-item-style-active1" : "tab-item-style-default1"}>
                                            <NavLink
                                                onClick={() => {
                                                    toggle('2');
                                                }}
                                            >
                                                Chegirmalar
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <div style={tableStyle} id={"tableStyleInSelectGroup"} className={"p-4"}>
                                                <div className={"dateOfTable"}>
                                                    <div className={"dataOfMobile"}>
                                                        <div className={"row"}>
                                                            <div className={"col-auto"}>
                                                                <Button onClick={minusM}
                                                                        className={"border btn btn-light"}>
                                                                    <i className="fas fa-angle-left"/>
                                                                </Button>
                                                            </div>
                                                            <div className={"col-auto pt-2"}>
                                                                {" " + year + " - yil, " + months[month] + " "}
                                                            </div>
                                                            <div className={"col-auto"}>
                                                                <Button onClick={plusM}
                                                                        className={"border btn btn-light"}>
                                                                    <i className="fas fa-angle-right"/>
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={gg}>
                                                    <Table>
                                                        <tr>
                                                            <td className={"py-2"}>Talaba</td>
                                                            {
                                                                daysOfMonth && daysOfMonth.length > 0 ? daysOfMonth.map(item =>
                                                                    currentItem && currentItem.weekdays ? currentItem.weekdays.map(c_item =>
                                                                        c_item === days[new Date(year, month, item).getDay()] ?
                                                                            <td className={"text-center py-2 attandance-block_table_td__days"}>
                                                                                {item}/{days[new Date(year, month, item).getDay()]}
                                                                            </td>
                                                                            : ''
                                                                    ) : ''
                                                                ) : ''
                                                            }
                                                        </tr>
                                                        {students ? students.map((item, i) =>
                                                            item.studentGroupDto && item.studentGroupDto.studentGroupStatus === "ACTIVE" ? (
                                                                <tr key={i}>
                                                                    <td className={"attandance-block_td py-auto"}>{item.fullName}</td>

                                                                    {daysOfMonth && daysOfMonth.length > 0 ? daysOfMonth.map(item2 =>
                                                                        currentItem && currentItem.weekdays ? currentItem.weekdays.map(c_item =>
                                                                            c_item === days[new Date(year, month, item2).getDay()] ?
                                                                                <td className={"text-center py-auto"}>
                                                                                    {
                                                                                        attendanceList ? attendanceList.map(item3 =>
                                                                                            (year + "-" + ((month + 1) > 9 ? (month + 1) : "0" + (month + 1)) + "-" + (item2 > 9 ? item2 : "0" + item2)) === moment(item3.attendDate).format('YYYY-MM-DD') && item.id === item3.student.id && item3.attandanceEnum === "YES" ?
                                                                                                <FaRegCalendarCheck
                                                                                                    color={"#33cc33"}
                                                                                                    className={"my-2"}
                                                                                                /> : ''
                                                                                        ) : ''
                                                                                    }
                                                                                </td>
                                                                                : ''
                                                                        ) : ''
                                                                    ) : ''}
                                                                </tr>
                                                            ) : ""
                                                        ) : ''}
                                                        <tr>
                                                            <td></td>
                                                            {
                                                                daysOfMonth && daysOfMonth.length > 0 ? daysOfMonth.map(item =>
                                                                    currentItem && currentItem.weekdays ? currentItem.weekdays.map(c_item =>
                                                                        c_item === days[new Date(year, month, item).getDay()] ?
                                                                            <td className={"text-center"}>
                                                                                <FaRegCalendarPlus
                                                                                    color={"#EE8033"}
                                                                                    onClick={() => showHideModal(year, month, item)}
                                                                                />
                                                                            </td>
                                                                            : ''
                                                                    ) : ''
                                                                ) : ''
                                                            }
                                                        </tr>
                                                    </Table>
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <div style={tableStyle} className={"p-4"}>
                                                <br/>
                                                Hozircha chegirmalar y'oq
                                                <br/>
                                                <br/>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </div>
                                :
                                ''
                            }
                        </Col>
                    </Row>
                </div>
                <Modal id={"allModalStyle"} isOpen={showModal}
                       toggle={() => openModal("")} className={""}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            {currentObject ? "Kursni tahrirlash" : "Yangi kurs qo'shish"}
                        </ModalHeader>
                        <ModalBody>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.name : ""}
                                        type={"text"}
                                        label={"Nomi"} name={"name"}
                                        className={"form-control"}
                                        placeholer={"nomi"} required/>
                                    <AvField className={'form-control'} label={'Kurs:'}
                                             type="select"
                                             name="courseId"
                                             defaultValue={currentObject &&
                                             currentObject.course && currentObject.course.courseCategory &&
                                             currentObject.course.courseCategory &&
                                             currentObject.course.courseCategory.id ?
                                                 currentObject.course.courseCategory.id : "0"}>
                                        <option key={0} value={"0"}>Kursni tanlang</option>
                                        {getItems ? getItems.map((item, i) =>
                                            <option key={i}
                                                    value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>
                                    <AvField className={'form-control'}
                                             label={"O'qituvchi:"} type="select"
                                             name="teacherId"
                                             defaultValue={currentObject
                                             && currentObject.teacher && currentObject.teacher.user &&
                                             currentObject.teacher.user.fullName ? currentObject.teacher.user.fullName : "0"}>
                                        <option key={0} value={"0"}>O'qituvchini tanlang</option>
                                        {teachers && teachers.length > 0 ? teachers.map((item, i) =>
                                            <option key={i}
                                                    value={item.uuid}>{item.name}</option>
                                        ) : ""}
                                    </AvField>

                                    <AvCheckboxGroup inline name="weekdays"
                                                     label="Dars kunlari" required>
                                        <AvCheckbox label="Dush" value="MONDAY"/>
                                        <AvCheckbox label="Sesh" value="TUESDAY"/>
                                        <AvCheckbox label="Chor" value="WEDNESDAY"/>
                                        <AvCheckbox label="Pay" value="THURSDAY"/>
                                        <AvCheckbox label="Ju" value="FRIDAY"/>
                                        <AvCheckbox label="Shan" value="SATURDAY"/>
                                        <AvCheckbox label="Yak" value="SUNDAY"/>
                                    </AvCheckboxGroup>

                                    <AvField className={'form-control'} label={"Xona:"}
                                             type="select"
                                             name="roomId"
                                             defaultValue={currentObject && currentObject.room ? currentObject.room.id : "0"}>
                                        <option key={0} value={"0"}> tanlang</option>
                                        {rooms && rooms.length > 0 ? rooms.map((item, i) =>
                                            <option key={i}
                                                    value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>
                                    <Row>
                                        <Col md={6}>
                                            <AvField type="time"
                                                     defaultValue={currentObject ? currentObject.startTime : false}
                                                     label={"Boshlanish vaqti"}
                                                     name={"startTime"}/>
                                        </Col>
                                        <Col md={6}>
                                            <AvField type="time"
                                                     defaultValue={currentObject ? currentObject.finishTime : false}
                                                     label={"Tugash vaqti"}
                                                     name={"finishTime"}/>
                                        </Col>
                                    </Row>
                                    <AvField type="date"
                                             defaultValue={currentObject && currentObject.startDate ? moment(currentObject.startDate).format('YYYY-MM-DD') : ""}
                                             label={"Kursning boshlanish sanasi"}
                                             name={"startDate"}/>
                                    <AvField type="date"
                                             defaultValue={currentObject && currentItem.finishDate ? moment(currentObject.finishDate).format('YYYY-MM-DD') : ""}
                                             label={"Kursning tugash sanasi"}
                                             name={"finishDate"}/>
                                    <AvField type="checkbox"
                                             defaultValue={currentObject ? currentObject.active : false}
                                             label={"Active"} name={"active"}/>
                                </div>
                            </ModalBody>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={openModal}>Bekor
                                qilish</Button>
                            <Button color="primary">Saqlash</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>
                <Modal isOpen={deleteModal} toggle={() => openDeleteModal("")}
                       className={""}>
                    <ModalHeader isOpen={deleteModal} toggle={() => openDeleteModal("")}
                                 charCode="X">O'chirish</ModalHeader>
                    <ModalBody>
                        Rostdan ham ushbu elementni o'chirishni istaysizmi?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary"
                                onClick={() => openDeleteModal("")}>Yo'q</Button>
                        <Button color="light"
                                onClick={() => deleteItem(currentObject)}>Ha</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={changeStatusModal}
                       toggle={() => changeStatusOpenModal("")} className={""}>
                    <AvForm onValidSubmit={changeStudentStatus}>
                        <ModalHeader isOpen={changeStatusModal}
                                     toggle={() => changeStatusOpenModal("")}
                                     charCode="X">O'chirish</ModalHeader>
                        <ModalBody>
                            <AvField className={'form-control'}
                                     onChange={openGroupSelects} label={"Status:"}
                                     type="select"
                                     name="situation" required>
                                <option value={"0"}>Statusni tanglang</option>
                                <option value={"TRANSFER"}>Boshqa guruhga ko'chirish
                                </option>
                                <option value={"ACTIVE"}>Faollashtirish</option>
                                <option value={"FROZEN"}>Muzlatish</option>
                                <option value={"ARCHIVE"}>Arxivlash</option>
                            </AvField>
                            {this.state.groupInput ?
                                <Select
                                    placeholder="Guruhni tanlang..."
                                    name="newGroupId"
                                    isSearchable={true}
                                    options={selectItems}
                                    onChange={getTransferGroup}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                                : ""}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary"
                                    onClick={() => changeStatusOpenModal("")}>Yo'q</Button>
                            <Button color="primary">Saqlash</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>
                <Modal isOpen={openModal1}>
                    {/*<Modal isOpen={true}>*/}
                    <ModalHeader>Kunlik davomat jhgf</ModalHeader>

                    <ModalBody>
                        <AvForm className={"modalDesktop"} onValidSubmit={saveAttendance}>
                            <AvField type={"hidden"} name={"date"}
                                     defaultValue={currentDay ? currentDay : ''}
                                     pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
                            <AvField type={"hidden"} name={"teacherId"}
                                     defaultValue={currentItem && currentItem.teacher ? currentItem.teacher.id : ''}/>
                            <AvField type={"hidden"} name={"groupId"}
                                     defaultValue={currentItem ? currentItem.id : ''}/>
                            <Table>
                                {this.state.allAttendance && this.state.allAttendance.map((item, i) =>
                                    <tr key={i}>
                                        <td>{item.student}</td>
                                        <td>
                                            <Input type={"checkbox"} checked={item.attended}
                                                   onChange={() => checkAttendence(!item.attended, "desktop" + item.studentId, true)}
                                                   id={"desktop" + item.studentId}/>
                                        </td>
                                    </tr>
                                )}
                            </Table>

                            <ModalFooter>
                                <Button outline onClick={showHideModal}>Bekor
                                    qilish</Button>
                                <Button outline color={"primary"}
                                        type={"submit"}>Saqlash</Button>
                            </ModalFooter>
                        </AvForm>

                        <AvForm className={"modalMobile h-100"} onValidSubmit={saveAttendanceMobile}>
                            <AvField type={"hidden"} name={"date"}
                                     defaultValue={currentDay ? currentDay : ''}
                                     pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
                            <AvField type={"hidden"} name={"teacherId"}
                                     defaultValue={currentItem && currentItem.teacher ? currentItem.teacher.id : ''}/>
                            <AvField type={"hidden"} name={"groupId"}
                                     defaultValue={currentItem ? currentItem.id : ''}/>
                            <div className={"px-3"}>
                                {
                                    this.state.allAttendance && this.state.allAttendance.map(item => (
                                        <div key={item.studentId} className={"mt-2 mb-3"}>
                                            <div className={"my-1"}>{item.student}</div>
                                            <div className={"row"}>
                                                <div className={"col-6"}>
                                                    <button
                                                        className={item.attended === '' ? "btn w-100 btn-outline-danger" : item.attended ? "btn w-100 btn-outline-danger not-active-btn-style" : "btn w-100 btn-outline-danger active-danger-btn-style"}
                                                        type={"button"}
                                                        id={"notActive" + item.studentId}
                                                        onClick={() => checkAttendence(false, item.studentId)}>Kelmadi
                                                    </button>
                                                </div>
                                                <div className={"col-6"}>
                                                    <button
                                                        className={item.attended === '' ? "btn w-100 btn-outline-success" : item.attended ? "btn w-100 btn-outline-success active-btn-style" : "btn w-100 btn-outline-success not-active-btn-style"}
                                                        type={"button"}
                                                        id={"active" + item.studentId}
                                                        onClick={() => checkAttendence(true, item.studentId)}>Keldi
                                                    </button>
                                                </div>
                                            </div>
                                        </div>))

                                }
                            </div>
                            <ModalFooter>
                                <Button outline onClick={showHideModal}>Bekor
                                    qilish</Button>
                                <Button outline color={"primary"}
                                        type={"submit"}>Saqlash</Button>
                            </ModalFooter>
                        </AvForm>
                    </ModalBody>

                </Modal>

                <Modal isOpen={addStudentInGroupModal} method={"post"}
                       toggle={() => openAddStudentModal("")}
                       className={""}>
                    <AvForm onValidSubmit={addStudentSaveItem}>
                        <ModalHeader>
                            <p>Guruhga o'quvchi qo'shish : </p>
                        </ModalHeader>
                        <ModalBody className={"ml-1"}>
                            <AsyncSelect
                                placeholder={"Qidirish..."}
                                onChange={selectStudentOption}
                                isSearchable={true}
                                onInputChange={handleInputChange}
                                loadOptions={selectedOptions}
                                isClearable={true}
                                options={studentsOption}
                                classNamePrefix={"select"}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color={"success"} type={"submit"}>Qo'shish</Button>
                            <Button color="secondary"
                                    onClick={openAddStudentInGroupModal}>Bekor
                                qilish</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>
            </AdminLayout>
        );
    }
}

SelectGroup
    .propTypes = {};

export default connect(
    ({
         app: {
             selectItems,
             changeStatusModal,
             students,
             teachers,
             getItems,
             rooms,
             groups,
             currentItem,
             addStudentInGroupModal,
             studentsOption,
             loading,
             showModal,
             deleteModal,
             parentItems,
             courseCategories,
             durationTypes,
             readModal,
             attendanceList,
         }
         ,
     }
    ) =>
        ({
            selectItems,
            changeStatusModal,
            students,
            teachers,
            getItems,
            rooms,
            groups,
            currentItem,
            attendanceList,
            addStudentInGroupModal,
            studentsOption,
            loading, durationTypes, showModal, deleteModal, parentItems, courseCategories, readModal
        })
)
(SelectGroup);
