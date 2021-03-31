import React, {Component} from 'react';
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {
    deleteCourseAction, getCourseAction, getCourseCategoriesAction,
    getGroupsByCourseAction, saveCourseAction,
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {DeleteIcon, EditIcon} from "../../component/Icons";
import AdminLayout from "../../component/AdminLayout";
import {Link} from "react-router-dom";

class SelectCourse extends Component {
    componentDidMount() {
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
            this.props.dispatch(getCourseAction({id: id}))
        }
        this.props.dispatch(getCourseCategoriesAction())
        this.props.dispatch(getGroupsByCourseAction(id))
    }

    state = {
        showModal: false,
        currentObject: ""
    }

    render() {
        const {currentObject} = this.state;
        const {
            history,
            dispatch,
            showModal,
            deleteModal,
            currentItem,
            courseCategories,
            byCource,
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
                            showModal: false
                        }
                    })
                }
            }
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
                dispatch(deleteCourseAction({...item, history: history, courseCategoryId: id}))
            }
        }
        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
                dispatch(saveCourseAction(v))
            }
        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>{currentItem && currentItem.name} </h3>
                        <Link
                            to={"/admin/course/" + (currentItem && currentItem.courseCategory && currentItem.courseCategory.id)}
                            className={"text-decoration-none"}>
                        <span
                            className={""}> {currentItem && currentItem.courseCategory && currentItem.courseCategory.name} kurslari</span>
                        </Link>
                    </hgroup>
                    <div className="row">
                        {currentItem && currentItem.id ?
                            <div className={"p-3 bg-white rounded col-md-4"}>
                                <div className="row">
                                    <div className="col-8">
                                        <hgroup>
                                            <small className={"text-secondary"}>Nomi</small>
                                            <h5>{currentItem.name}</h5>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>Kategoriyasi</small>
                                            <h6>{currentItem.courseCategory ? currentItem.courseCategory.name : ""} </h6>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>Tavsif</small>
                                            <h6>{currentItem.description} </h6>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>1 ta Dars Narxi</small>
                                            <h6>{currentItem.price} UZS</h6>
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
                            : ""}
                        <div className={"col-md-8"}>
                            {byCource ? byCource.map((item, i) =>
                                <div key={i} className="p-3 mb-2 bg-white rounded">
                                    {item.id ?
                                        <Row>
                                            <Col md={3}>
                                                <p className={"mb-0 SelectCourse-block_Col_p"}>
                                                    <Link to={"/admin/group/" + item.id}>{item.name}</Link>
                                                </p>
                                            </Col>
                                            <Col md={7}>
                                                <p className={"mb-0 SelectCourse-block_Col_p"}>
                                                    <Link
                                                        to={"/admin/teacher/" + item.teacherId}>{item.teacherName}</Link>
                                                </p>
                                            </Col>
                                            <Col md={2}>
                                                <Row>
                                                    <Col md={6}>
                                                        <p className={"mb-0 SelectCourse-block_Col_p"}>
                                                            {item.startTime}
                                                        </p>
                                                    </Col>
                                                    <Col md={6}>
                                                        <p className={"mb-0 SelectCourse-block_Col_p"}>
                                                            {item.finishTime}
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        // <div className={"col-md-6"}>
                                        //     <h4>Guruhlar</h4>
                                        //     <div className={" ml-2 bg-white student-group-block"}>
                                        //         {groups && groups.length > 0 ? groups.map((item, i) =>
                                        //             <Row key={i} className={"p-2"}>
                                        //                 <Col md={3} className={"text-center"}>
                                        //                 <span
                                        //                     className={"group-name"}> {item.name}</span>
                                        //                 </Col>
                                        //                 <Col md={4}>
                                        //                 <span
                                        //                     className={"text-left"}>{item.course && item.course.name}</span>
                                        //                 </Col>
                                        //                 <Col md={2}>
                                        //                     <p className={"text-secondary"}>{item.startTime + " - " + item.finishTime}</p>
                                        //                 </Col>
                                        //                 <Col md={3}>
                                        //                                     <span
                                        //                                         className={"text-secondary"}>{item.weekdays && item.weekdays.map(i =>
                                        //                                         <span> {i.weekdayName && i.weekdayName.length > 3 && i.weekdayName.charAt(0).toUpperCase() + i.weekdayName.substring(1, 3).toLowerCase()}, </span>)}
                                        //                                     </span>
                                        //                 </Col>
                                        //             </Row>
                                        //         ) : "Guruhlar topilmadi"}
                                        //     </div>
                                        // </div>
                                        : ""}
                                </div>
                            ) : ""}
                        </div>
                    </div>
                </div>
                <Modal id={"allModalStyle"} isOpen={showModal} toggle={() => openModal("")} className={""}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            {currentObject ? "Kursni tahrirlash" : "Yangi kurs qo'shish"}
                        </ModalHeader>
                        <ModalBody>
                            <div className={"w-100 modal-form"}>
                                <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                         label={"Nomi"} name={"name"} className={"form-control"}
                                         placeholer={"nomi"} required/>
                                <AvField className={'form-control'} label={"Kurs bo'limi:"} type="select"
                                         name="courseCategoryId"
                                         defaultValue={currentObject && currentObject.courseCategory ? currentObject.courseCategory.id : "0"}>
                                    <option key={100} value={"0"}>Kurs bo'limi</option>
                                    {courseCategories ? courseCategories.map((item, i) =>
                                        item.category ? "" :
                                            <option key={i} value={item.id}>{item.name}</option>
                                    ) : ""}
                                </AvField>
                                <AvField defaultValue={currentObject ? currentObject.price : ""} type={"number"}
                                         label={"Narxi"} name={"price"} className={"form-control"}
                                         placeholer={""} required/>
                                <AvField type="text"
                                         defaultValue={currentObject ? currentObject.description : false}
                                         label={"Description"} name={"description"} placeholder={"izoh"}/>
                                <AvField type="checkbox" defaultValue={currentObject ? currentObject.active : false}
                                         label={"Active"} name={"active"}/>
                            </div>
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

SelectCourse.propTypes = {};

export default connect(({
                            app: {
                                currentItem,
                                byCource,
                                loading,
                                showModal,
                                deleteModal,
                                parentItems,
                                courseCategories,
                                durationTypes,
                                getItems,
                                readModal
                            },
                        }) => ({
        currentItem,
        loading, durationTypes, byCource, showModal, deleteModal, parentItems, courseCategories, getItems, readModal
    })
)(SelectCourse);
