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
    DropdownItem
} from "reactstrap";
import {AvForm, AvField, AvCheckboxGroup, AvCheckbox} from "availity-reactstrap-validation";
import {
    deleteCourseAction, deleteGroupAction,
    getCoursesAction,
    getGroupAction, getGroupStudentsAction,
    getRoomListAction,
    getTeachersForSelectAction,
    saveGroupAction,
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {DeleteIcon, EditIcon} from "../../component/Icons";
import AdminLayout from "../../component/AdminLayout";
import {Link} from "react-router-dom";
import moment from "moment";
import {formatPhoneNumber} from "../../utils/addFunctions";

class SelectGroup extends Component {
    componentDidMount() {
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
            this.props.dispatch(getGroupAction({id: id}))
            this.props.dispatch(getGroupStudentsAction({id: id}))
            this.props.dispatch(getRoomListAction())
            this.props.dispatch(getCoursesAction())
            this.props.dispatch(getTeachersForSelectAction())
        }
    }

    state = {
        showModal: false,
        currentObject: "",
        dropdownOpen: false,
        setDropdownOpen: false
    }

    render() {
        const {currentObject, dropdownOpen, setDropdownOpen} = this.state;
        const {
            students,
            history,
            dispatch,
            showModal,
            deleteModal,
            currentItem,
            teachers,
            getItems,
            rooms
        } = this.props;
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
        const saveItem = (e, v) => {
            if (currentObject && currentObject.id) {
                v.id = currentObject.id
                v.finishDate = moment(v.finishDate).format('DD/MM/YYYY hh:mm:ss').toString()
                v.startDate = moment(v.startDate).format('DD/MM/YYYY hh:mm:ss').toString()
                dispatch(saveGroupAction(v))
            }
        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>{currentItem && currentItem.name} </h3>

                        <Link
                            to={"/admin/groups"} className={"text-decoration-none"}><span
                            className={""}> Guruhlar</span>
                        </Link>
                    </hgroup>
                    <div className="row">
                        {currentItem && currentItem.id ?
                            <div className={"m-2 p-3 bg-white box-shadow rounded col-md-4 col-10"}>
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
                                                moment(currentItem.startDate).format("DD-mm-yyyy") + " -- " +
                                                moment(currentItem.finishDate).format("DD-mm-yyyy")
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
                                        <Button className="table-icon" onClick={() => openModal(currentItem)}>
                                            <EditIcon/>
                                        </Button>
                                        <Button className="table-icon" onClick={() => openDeleteModal(currentItem)}>
                                            <DeleteIcon/>
                                        </Button>
                                    </div>
                                </div>
                                <div className={"student-list border-top p-3"}>
                                    {students && students.length > 0 && students.map((student, i) =>
                                        <div key={i} className={"row"}>
                                            <div className="col-5">{student.user && student.user.fullName}</div>
                                            <div
                                                className="col-5">{student.user && formatPhoneNumber(student.user.phoneNumber)}</div>
                                            <div className="col-2">
                                                <Dropdown id={"id" + i} isOpen={dropdownOpen} toggle={showDropdown}>
                                                    <DropdownToggle caret>
                                                        ...
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem header>Header</DropdownItem>
                                                        <DropdownItem>Some Action</DropdownItem>
                                                        <DropdownItem text>Dropdown Item Text</DropdownItem>
                                                        <DropdownItem disabled>Action (disabled)</DropdownItem>
                                                        <DropdownItem divider/>
                                                        <DropdownItem>Foo Action</DropdownItem>
                                                        <DropdownItem>Bar Action</DropdownItem>
                                                        <DropdownItem>Quo Action</DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            : ""}
                    </div>
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
                                        <AvCheckbox label="Dush"
                                                    value="MONDAY"
                                            defaultChecked={true}
                                                    defaultValue={true}
                                            defaultChecked={currentObject && currentObject.weekdays.some(item => "MONDAY")}
                                        />
                                        <AvCheckbox label="Sesh" value="TUESDAY"
                                                    defaultChecked={currentObject && currentObject.weekdays.some(item => "TUESDAY")}/>
                                        <AvCheckbox label="Chor" value="WEDNESDAY"
                                                    defaultChecked={currentObject && currentObject.weekdays.some(item => "WEDNESDAY")}/>
                                        <AvCheckbox label="Pay" value="THURSDAY"
                                                    defaultChecked={currentObject && currentObject.weekdays.some(item => "THURSDAY")}/>
                                        <AvCheckbox label="Ju" value="FRIDAY"
                                                    defaultChecked={currentObject && currentObject.weekdays.some(item => "FRIDAY")}/>
                                        <AvCheckbox label="Shan" value="SATURDAY"
                                                    defaultChecked={currentObject && currentObject.weekdays.some(item => "SATURYDAY")}/>
                                        <AvCheckbox label="Yak" value="SUNDAY"
                                                    defaultChecked={currentObject && currentObject.weekdays.some(item => "SUNDAY")}/>
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

            </AdminLayout>
        );
    }
}

SelectGroup.propTypes = {};

export default connect(({
                            app: {
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
                                readModal
                            },
                        }) => ({
        students,
        teachers,
        getItems,
        rooms,
        groups,
        currentItem,
        loading, durationTypes, showModal, deleteModal, parentItems, courseCategories, readModal
    })
)(SelectGroup);
