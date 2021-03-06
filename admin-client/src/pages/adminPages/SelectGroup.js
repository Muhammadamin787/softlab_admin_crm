import React, {Component} from 'react';
import {
    Button,
    Col,
    CustomInput,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Container, Table, Input
} from "reactstrap";
import {AvForm, AvField, AvCheckboxGroup, AvCheckbox} from "availity-reactstrap-validation";
import {
    changeStudentGroupStatusAction,
    deleteCourseAction, deleteGroupAction, getAttendanceListAction,
    getCoursesAction,
    getGroupAction, getGroupsForSelectAction, getGroupStudentsAction,
    getRoomListAction, getStudentsByGroupAction,
    getTeachersForSelectAction, saveAttendanceAction,
    saveGroupAction,
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {DeleteIcon, EditIcon} from "../../component/Icons";
import AdminLayout from "../../component/AdminLayout";
import {Link} from "react-router-dom";
import moment from "moment";
import {formatPhoneNumber} from "../../utils/addFunctions";
import Select from "react-select";

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
            dispatch(getStudentsByGroupAction(id))

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
        setDropdownOpen: false,
        groupInput: false,
        newGroup: [],
        days: ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Ju', 'Shan'],
        months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktyabr", "Noyabr", "Dekabr"],

        year: '',
        //Bitta kam sanaladi
        month: '',
        day: '',

        daysOfMonth: [],

        groupSelect: [],
        currentGroup: "",
        openModal1: false,
        currentDay: ''
    }

    render() {
        const {
            days, months, year, month, daysOfMonth, day, dayName, groupSelect,
            currentGroup, openModal1, currentDay, currentObject, dropdownOpen, setDropdownOpen
        } = this.state
        const {
            selectItems,
            changeStatusModal,
            students,
            history,
            dispatch,
            showModal,
            deleteModal,
            currentItem,
            teachers,
            getItems,
            rooms,
            attendanceList,
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
        const showDropdown = (item) => {
            this.setState({dropdownOpen: !dropdownOpen})
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

        const saveAttendance = (e, v) => {

            let arr = []
            students.map(item => {
                arr.push({
                    studentId: item.id,
                    active: document.getElementById(item.id).checked
                })
            })
            v.studentList = arr

            this.props.dispatch(saveAttendanceAction(v))
            showHideModal()
        }

        const gg = {
            overflowX: "scroll",
            overflowY: "auto",
            marginTop: "20px"
        }

        const showHideModal = (item) => {
            if (item) {
                this.setState({
                    openModal1: !openModal1,
                    currentDay: year + "-" + ((month) > 9 ? (month) : "0" + (month)) + "-" + (item > 9 ? item : "0" + item)
                })
            } else {

                this.setState({
                    openModal1: !openModal1,
                    currentDay: ""
                })
            }
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
                                    className={""}> Guruhlar</span>
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
                                                            {student.studentGroup ?
                                                                <div className="col-6">
                                                    <span
                                                        className={"px-1 " + (student.studentGroup.studentGroupStatus === "TRANSFER" ?
                                                            "bg-light text-secondary" :
                                                            student.studentGroup.studentGroupStatus === "ACTIVE" ?
                                                                "text-success" :
                                                                student.studentGroup.studentGroupStatus === "ARCHIVE" ?
                                                                    "text-light bg-secondary" :
                                                                    student.studentGroup.studentGroupStatus === "FROZEN" ?
                                                                        "bg-info text-white" :
                                                                        student.studentGroup.studentGroupStatus === "TEST_LESSON" ?
                                                                            "bg-warning text-dark" :
                                                                            "")}>
                                                {student.fullName}
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
                                <>
                                    <Button onClick={minusM}>-</Button>
                                    {" " + year + " - yil, " + months[month] + " "}
                                    <Button onClick={plusM}>+</Button>

                                    <br/>
                                    <div style={gg}>
                                        <Table className={"p-0 m-0"}>
                                            <tr className={"p-0 m-0"}>
                                                <td className={"test123"}>#</td>
                                                <td className={"test123"}>Student</td>
                                                {
                                                    daysOfMonth ? daysOfMonth.map(item =>
                                                        currentItem ? currentItem.weekdays.map(c_item =>
                                                            c_item === days[new Date(year, month, item).getDay()] ?
                                                                <td className={"text-center test123 attandance-block_table_td__days"}>
                                                                    {item}/{days[new Date(year, month, item).getDay()]}
                                                                </td>
                                                                : ''
                                                        ) : ''
                                                    ) : ''
                                                }
                                            </tr>
                                            {students ? students.map((item, i) =>
                                                <tr className={"test123 p-0 m-0"} key={i}>
                                                    <td className={"attandance-block_td test123"}>{i + 1}</td>
                                                    <td className={"attandance-block_td test123"}>{item.fullName}</td>

                                                    {daysOfMonth ? daysOfMonth.map(item2 =>
                                                        currentItem ? currentItem.weekdays.map(c_item =>
                                                            c_item === days[new Date(year, month, item2).getDay()] ?
                                                                attendanceList ? attendanceList.map(item3 =>
                                                                    (year + "-" + ((month) > 9 ? (month) : "0" + (month)) + "-" + (item2 > 9 ? item2 : "0" + item2)) === moment(item3.attendDate).format('YYYY-MM-DD') && item.id === item3.student.id && item3.attandanceEnum === "YES" ?
                                                                        <td className={"text-center"}>
                                                                            <i className={"fa fa-calendar-check my-2"}></i>
                                                                        </td> : ''
                                                                ) : ''


                                                                : ''
                                                        ) : ''
                                                    ) : ''}
                                                </tr>
                                            ) : ''}
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                {
                                                    daysOfMonth ? daysOfMonth.map(item =>
                                                        currentItem ? currentItem.weekdays.map(c_item =>
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
                                </>
                                :
                                ''
                            }
                        </Col>
                    </Row>
                </div>
                <Modal id={"allModalStyle"} isOpen={showModal} toggle={() => openModal("")} className={""}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            {currentObject ? "Kursni tahrirlash" : "Yangi kurs qo'shish"}
                        </ModalHeader>
                        <ModalBody>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                             label={"Nomi"} name={"name"} className={"form-control"}
                                             placeholer={"nomi"} required/>
                                    <AvField className={'form-control'} label={'Kurs:'} type="select"
                                             name="courseId"
                                             defaultValue={currentObject &&
                                             currentObject.course && currentObject.course.id ? currentObject.course.id : "0"}>
                                        <option key={0} value={"0"}>Kursni tanlang</option>
                                        {getItems ? getItems.map((item, i) =>
                                            <option key={i} value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>
                                    <AvField className={'form-control'} label={"O'qituvchi:"} type="select"
                                             name="teacherId"
                                             defaultValue={currentObject
                                             && currentObject.teacher && currentObject.teacher.id ? currentObject.teacher.id : "0"}>
                                        <option key={0} value={"0"}>O'qituvchini tanlang</option>
                                        {teachers && teachers.length > 0 ? teachers.map((item, i) =>
                                            <option key={i} value={item.uuid}>{item.name}</option>
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

                                    <AvField className={'form-control'} label={"Xona:"} type="select"
                                             name="roomId"
                                             defaultValue={currentObject && currentObject.room ? currentObject.room.id : "0"}>
                                        <option key={0} value={"0"}> tanlang</option>
                                        {rooms && rooms.length > 0 ? rooms.map((item, i) =>
                                            <option key={i} value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>
                                    <Row>
                                        <Col md={6}>
                                            <AvField type="time"
                                                     defaultValue={currentObject ? currentObject.startTime : false}
                                                     label={"Boshlanish vaqti"} name={"startTime"}/>
                                        </Col>
                                        <Col md={6}>
                                            <AvField type="time"
                                                     defaultValue={currentObject ? currentObject.finishTime : false}
                                                     label={"Tugash vaqti"} name={"finishTime"}/>
                                        </Col>
                                    </Row>
                                    <AvField type="date"
                                             defaultValue={currentObject && currentObject.startDate ? moment(currentObject.startDate).format('YYYY-MM-DD') : ""}
                                             label={"Kursning boshlanish sanasi"} name={"startDate"}/>
                                    <AvField type="date"
                                             defaultValue={currentObject && currentItem.finishDate ? moment(currentObject.finishDate).format('YYYY-MM-DD') : ""}
                                             label={"Kursning tugash sanasi"} name={"finishDate"}/>
                                    <AvField type="checkbox" defaultValue={currentObject ? currentObject.active : false}
                                             label={"Active"} name={"active"}/>
                                </div>
                            </ModalBody>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={openModal}>Bekor qilish</Button>
                            <Button color="primary">Saqlash</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>
                <Modal isOpen={deleteModal} toggle={() => openDeleteModal("")} className={""}>
                    <ModalHeader isOpen={deleteModal} toggle={() => openDeleteModal("")}
                                 charCode="X">O'chirish</ModalHeader>
                    <ModalBody>
                        Rostdan ham ushbu elementni o'chirishni istaysizmi?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => openDeleteModal("")}>Yo'q</Button>
                        <Button color="light" onClick={() => deleteItem(currentObject)}>Ha</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={changeStatusModal} toggle={() => changeStatusOpenModal("")} className={""}>
                    <AvForm onValidSubmit={changeStudentStatus}>
                        <ModalHeader isOpen={changeStatusModal} toggle={() => changeStatusOpenModal("")}
                                     charCode="X">O'chirish</ModalHeader>
                        <ModalBody>
                            <AvField className={'form-control'} onChange={openGroupSelects} label={"Status:"}
                                     type="select"
                                     name="situation" required>
                                <option value={"0"}>Statusni tanglang</option>
                                <option value={"TRANSFER"}>Boshqa guruhga ko'chirish</option>
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
                            <Button color="secondary" onClick={() => changeStatusOpenModal("")}>Yo'q</Button>
                            <Button color="primary">Saqlash</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>

                <Modal isOpen={openModal1}>
                    <ModalHeader>Kunlik davomat</ModalHeader>
                    <ModalBody>
                        <AvForm onValidSubmit={saveAttendance}>
                            {/*<AvField type={"date"} name={"date"}/>*/}
                            <AvField type={"hidden"} name={"date"} defaultValue={currentDay ? currentDay : ''}
                                     pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
                            <AvField type={"hidden"} name={"teacherId"}
                                     defaultValue={currentItem && currentItem.teacher ? currentItem.teacher.id : ''}/>
                            <AvField type={"hidden"} name={"groupId"} defaultValue={currentItem ? currentItem.id : ''}/>
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
        );
    }
}

SelectGroup.propTypes = {};

export default connect(({
                            app: {
                                selectItems,
                                changeStatusModal,
                                students,
                                teachers,
                                getItems,
                                rooms,
                                groups,
                                currentItem,
                                loading,
                                showModal,
                                deleteModal,
                                parentItems,
                                courseCategories,
                                durationTypes,
                                readModal,
                                attendanceList,
                            },
                        }) => ({
        selectItems,
        changeStatusModal,
        students,
        teachers,
        getItems,
        rooms,
        groups,
        currentItem,
        attendanceList,
        loading, durationTypes, showModal, deleteModal, parentItems, courseCategories, readModal
    })
)(SelectGroup);
