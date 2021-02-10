import React, {Component} from 'react';
import {Button, Col, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {AvForm, AvField, AvRadioGroup, AvRadio} from "availity-reactstrap-validation";
import {
    deleteCourseAction, deleteGroupAction, deleteTeacherAction,
    getPayTypeListAction,
    getRegionsAction,
    getStudentAction,
    getTeacherAction,
    saveCourseAction,
    saveStudentAction, saveTeacherAction,
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {DeleteIcon, EditIcon} from "../../component/Icons";
import AdminLayout from "../../component/AdminLayout";
import {Link} from "react-router-dom";
import moment from "moment";
import {formatPhoneNumber} from "../../utils/addFunctions";

class SelectTeacher extends Component {
    componentDidMount() {
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
            this.props.dispatch(getTeacherAction({id: id}))
        }
        this.props.dispatch(getRegionsAction())
        this.props.dispatch(getPayTypeListAction())
    }

    state = {
        showModal: false,
        showPaymentModal: false,
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
            regions,
        } = this.props;
        const openModal = (item) => {
            console.log(item);
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
        const deleteItem = (item) => {
                dispatch(deleteTeacherAction({...item, history: history}))
        }
        const saveItem = (e, v) => {
            if (currentObject && currentObject.id && currentObject.userDto) {
                v.id = currentObject.id
                let teacherDto;
                teacherDto = {userDto: ""}
                teacherDto.userDto = {
                    id: currentObject.userDto.id,
                    fullName: v.fullName,
                    gender: v.gender,
                    phoneNumber: v.phoneNumber,
                    // avatarId: attachmentId,
                    regionId: v.regionId,
                    description: v.description,
                    birthDate: moment(v.birthDate).format('DD/MM/YYYY hh:mm:ss').toString(),
                }
                teacherDto.id = currentObject.id
                dispatch(saveTeacherAction(teacherDto))
            }

        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>{currentItem && currentItem.userDto && currentItem.userDto.fullName} </h3>
                        <Link
                            to={"/admin/teachers"}
                            className={"text-decoration-none"}>
                        <span
                            className={""}> O'qituvchilar</span>
                        </Link>
                    </hgroup>
                    {
                        console.log(currentItem)
                    }
                    <div className="row">
                        {currentItem.id && currentItem.id ?
                            <div className={"m-2 p-3 bg-white rounded col-md-4 col-10 col-8 select-student-style"}>
                                <div className="row">
                                    <div className="col-8">
                                        <hgroup>
                                            <small className={"text-secondary"}>FISH: </small>
                                            <p className={"d-inline"}> {currentItem.userDto && currentItem.userDto.fullName}</p>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>Telefon raqam: </small>
                                            <p className={"d-inline"}> {formatPhoneNumber(currentItem.userDto && currentItem.userDto.phoneNumber)} </p>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>Tug'ilgan sana: </small>
                                            <p className={"d-inline"}> {moment(currentItem.userDto && currentItem.birthDate).format("DD-MM-yyyy")}</p>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>Manzil: </small>
                                            <p className={"d-inline"}>{currentItem.userDto && currentItem.userDto.region && currentItem.userDto.region.name}</p>
                                        </hgroup>

                                        <hgroup>
                                            <small className={"text-secondary"}>Manzil: </small>
                                            <p className={"d-inline"}>{currentItem.userDto && currentItem.userDto.gender}</p>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>Tavsif: </small>
                                            <p className={"d-inline"}> {currentItem.userDto && currentItem.userDto.description}</p>
                                        </hgroup>

                                    </div>
                                    <div className="col-4 button-block">
                                        <Button className="table-icon" onClick={() => openModal(currentItem)}>
                                            <EditIcon className="button-icon"/>
                                        </Button>
                                        <Button className="table-icon" onClick={() => openDeleteModal(currentItem)}>
                                            <DeleteIcon className="button-icon"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            : ""}
                    </div>
                </div>
                <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            {currentObject && currentObject.id ? "Tahrirlash" : "Yangi o'qituvchi qo'shish"}
                        </ModalHeader>
                        <ModalBody>
                            <div className={"w-100 modal-form"}>
                                <AvField
                                    defaultValue={currentObject && currentObject.userDto ? currentObject.userDto.fullName : ""}
                                    type={"text"}
                                    label={"FISH"} name={"fullName"} className={"form-control"}
                                    placeholer={"nomi"} required/>
                                <AvField
                                    defaultValue={currentObject && currentObject.userDto ? currentObject.userDto.phoneNumber : ""}
                                    type={"text"}
                                    label={"Telefon raqam"} name={"phoneNumber"} className={"form-control"}
                                    placeholer={"nomi"} required/>
                                <AvField
                                    type={"date"}
                                    defaultValue={currentObject.userDto && currentObject.userDto.birthDate ? moment(currentObject.userDto.birthDate).format('YYYY-MM-DD')
                                        : ""}
                                    label={"Tug'ilgan sana"} name={"birthDate"} className={"form-control"}
                                    required/>
                                <AvField className={'form-control'} label={'Hudud:'} type="select"
                                         name="regionId"
                                         defaultValue={currentObject && currentObject.userDto && currentObject.userDto.region ? currentObject.userDto.region.id : "0"}>
                                    <option key={0} value={"0"}>Ota hududni tanlang</option>
                                    {regions ? regions.map((item, i) =>
                                        <option key={i} value={item.id}>{item.name}</option>
                                    ) : ""}
                                </AvField>
                                <AvRadioGroup name="gender"
                                              defaultValue={currentObject && currentObject.userDto ? currentObject.userDto.gender : ""}
                                              label="Jins" required
                                              errorMessage="Birini tanlang!">
                                    <AvRadio label="Erkak" value="MALE"/>
                                    <AvRadio label="Ayol" value="FEMALE"/>
                                </AvRadioGroup>
                                <AvField
                                    defaultValue={currentObject && currentObject.userDto ? currentObject.userDto.description : ""}
                                    type={"textarea"}
                                    label={"Izoh"} name={"description"} className={"form-control"}/>
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

SelectTeacher.propTypes = {};

export default connect(({
                            app: {
                                payTypes,
                                currentItem,
                                loading,
                                showModal,
                                deleteModal,
                                parentItems,
                                regions,
                                durationTypes,
                                getItems,
                                readModal
                            },
                        }) => ({
        payTypes,
        currentItem,
        loading, durationTypes, showModal, deleteModal, parentItems, regions, getItems, readModal
    })
)(SelectTeacher);
