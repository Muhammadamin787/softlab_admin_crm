import React, {Component} from 'react';
import {
    deleteReklamaAction,
    getAppealListByEnumTypeAction,
    getCourseListForSelectAction,
    getCoursesAction,
    getOneAppeal,
    getOneToplamAction,
    getReklamaAction,
    getTeachersForSelectAction,
    getToplamListAction,
    saveReklamaAction,
    saveToplamAction
} from "../../redux/actions/AppActions";
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {connect} from "react-redux";
import {AvForm, AvField, AvCheckbox, AvCheckboxGroup} from "availity-reactstrap-validation"
import {toast} from "react-toastify";
import AdminLayout from "../../component/AdminLayout";
import {DeleteIcon, EditIcon} from "../../component/Icons";
import Pagination from "react-js-pagination";
import {formatPhoneNumber, formatSelectList} from "../../utils/addFunctions";
import Select from "react-select";
import {Link} from "react-router-dom";
import moment from "moment";


class Toplam extends Component {
    componentDidMount() {
        const {dispatch} = this.props
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
            dispatch(getOneToplamAction({id: id}))
        }
        dispatch(getTeachersForSelectAction())
        dispatch(getCourseListForSelectAction())
    }

    state = {
        showModal: false,
        currentObject: "",
        courseId: "",
        teacherId: "",
        selectReklama: [],
        selectParentReklama: "",
        parentReklamaDisable: false
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getAppealListByEnumTypeAction({
            enumType: "REQUEST",
            page: (pageNumber - 1),
            size: this.props.size
        }))
    }

    render() {
        const {
            currentItem,
            dispatch, showModal, deleteModal, reklamas, toplamList, size,
            teachers, getItems
        } = this.props
        const {currentObject} = this.state

        const openModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    showModal: !showModal
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
        const saveToplam = (e, v) => {
            v.teacherId = this.state.teacherId
            v.courseId = this.state.courseId
            console.log(v);
            if (v.courseId && v.teacherId)
                dispatch(saveToplamAction(v))
        }
        const deleteNumber = (item) => {
        }
        const setToplamCourse = (e, v) => {
            this.setState({courseId: e.value})
        }
        const setToplamTeacher = (e, v) => {
            this.setState({teacherId: e.value})
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>
                            {currentItem && currentItem.name}
                        </h3>
                        <Link to={"/admin/appeals"}
                              className={"text-decoration-none"}>
                        <span
                            className={""}>Murojaatlar
                        </span>
                        </Link>
                    </hgroup>
                    <div className="row">
                        {currentItem ?
                            <>
                                <div className={"m-2 p-3 bg-white rounded col-md-4 col-10"}>
                                    <div className="row">
                                        <div className="col-8">
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Nomi: </small>
                                                    {currentItem.name}</h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Kurs: </small>
                                                    {currentItem.courseName}</h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>O'qitvchi: </small>
                                                    {currentItem.teacherName}</h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Dars kunlari: </small>
                                                    {currentItem.weekdays && currentItem.weekdays.length > 0 && currentItem.weekdays.map((week) =>
                                                        <span>{week}, </span>)} - {currentItem.time}
                                                </h6>
                                            </hgroup>
                                            <hgroup>
                                                <h6>
                                                    <small className={"text-secondary"}>Holati: </small>
                                                    {currentItem.active ? "Ochiq" : "Yopilgan"}</h6>
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
                                </div>
                                <div className={"col-md-7"}>
                                    <div className="row">
                                        {
                                            currentItem.clientAppealList && currentItem.clientAppealList.length > 0 ? currentItem.clientAppealList.map((item, i) =>
                                                    <div
                                                        className={"m-2 p-3 bg-white rounded courses-style category-courses"}>
                                                        <h5>{item.status + " - " + item.statusName}</h5>
                                                        <p>
                                                            <small className={"text-secondary"}>Vaqti: </small>
                                                            {moment(item.date).format("DD/MM/yyyy, HH:mm")}
                                                        </p>
                                                    </div>
                                                )
                                                :
                                                <Col>
                                                    <h5 className={"text-center"}>
                                                    </h5>
                                                </Col>
                                        }
                                    </div>
                                </div>
                            </>
                            : ""}
                    </div>


                    <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                        <AvForm className={""} onValidSubmit={saveToplam}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject && currentObject.id ? "To'plamni tahrirlash" : "Yangi to'plam qo`shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                             label={"Nomi"} name={"name"} className={"form-control"}
                                             placeholder={"nomi"} required/>
                                    <Select
                                        placeholder="Kursni tanlang..."
                                        name="courseId"
                                        isSearchable={true}
                                        options={getItems && getItems.length > 0 && formatSelectList(getItems)}
                                        onChange={setToplamCourse}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    <AvCheckboxGroup inline name="weekdays" label="Dars kunlari" required>
                                        <AvCheckbox label="Dush" value="MONDAY"/>
                                        <AvCheckbox label="Sesh" value="TUESDAY"/>
                                        <AvCheckbox label="Chor" value="WEDNESDAY"/>
                                        <AvCheckbox label="Pay" value="THURSDAY"/>
                                        <AvCheckbox label="Ju" value="FRIDAY"/>
                                        <AvCheckbox label="Shan" value="SATURDAY"/>
                                        <AvCheckbox label="Yak" value="SUNDAY"/>
                                    </AvCheckboxGroup>
                                    <Select
                                        placeholder="O'qituvchini tanlang..."
                                        name="teacherId"
                                        isSearchable={true}
                                        options={teachers && teachers.length > 0 && formatSelectList(teachers)}
                                        onChange={setToplamTeacher}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    <AvField type="time"
                                             defaultValue={currentObject ? currentObject.startTime : false}
                                             label={"Boshlanish vaqti"} name={"time"}/>
                                    <AvField defaultValue={currentObject ? currentObject.active : false}
                                             label={"Active"} type="checkbox" name={"active"}/>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={openModal}>Bekor qilish</Button>
                                <Button color="primary">Saqlash</Button>
                            </ModalFooter>
                        </AvForm>
                    </Modal>

                    <Modal isOpen={deleteModal} toggle={openDeleteModal} className={""}>
                        <ModalHeader isOpen={deleteModal} toggle={() => openDeleteModal("")} charCode="X"
                        >O`chirish</ModalHeader>
                        <ModalBody>Rostdan ham ushbu elementni o'chirishni istaysizmi?</ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => openDeleteModal("")}>Cancel</Button>
                            <Button color="light" onClick={() => deleteNumber(currentObject)}>Delete</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </AdminLayout>
        );
    }
}


Toplam.propTypes = {};

export default connect(({
                            app: {
                                currentItem,
                                getItems,
                                teachers,
                                toplamList,
                                loading, reklamas, showModal, deleteModal
                            },
                        }) => ({
        currentItem,
        getItems,
        teachers,
        toplamList,
        loading, reklamas, showModal, deleteModal
    })
)(Toplam);
