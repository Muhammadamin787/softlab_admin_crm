import React, {Component} from 'react';
import {Button, Col, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {AvForm, AvField, AvRadioGroup, AvRadio} from "availity-reactstrap-validation";
import {
    deleteCourseAction,
    deleteStudentAction,
    getPayTypeListAction,
    getRegionsAction,
    getStudentAction,
    saveCourseAction,
    saveStudentAction,
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {DeleteIcon, EditIcon} from "../../component/Icons";
import AdminLayout from "../../component/AdminLayout";
import {Link} from "react-router-dom";
import moment from "moment";
import {formatPhoneNumber} from "../../utils/addFunctions";

class SelectStudent extends Component {
    componentDidMount() {
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
            this.props.dispatch(getStudentAction({id: id}))
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
        const {currentObject, showPaymentModal} = this.state;
        const {
            history,
            dispatch,
            showModal,
            deleteModal,
            currentItem,
            regions,
            payTypes
        } = this.props;
        const openModal = (item) => {
            this.setState({currentObject: item, showPaymentModal: false})
            dispatch({
                type: "updateState",
                payload: {
                    showModal: !showModal
                }
            })
        }
        const openPaymentModal = (item) => {
            this.setState({currentObject: item, showPaymentModal: !showPaymentModal})
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
            dispatch(deleteStudentAction({...item, history: history}))
        }
        const saveItem = (e, v) => {
            if (currentObject && currentObject.id) {
                v.id = currentObject.id
                v.birthDate = moment(v.birthDate).format('DD/MM/YYYY hh:mm:ss').toString()
                dispatch(saveStudentAction(v))
            }
        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>{currentItem && currentItem.fullName} </h3>
                        <Link
                            to={"/admin/students"}
                            className={"text-decoration-none"}>
                        <span
                            className={""}> Oqituvchilar</span>
                        </Link>
                    </hgroup>
                    <div className="row">
                        {currentItem && currentItem.id ?
                            <div className={"m-2 p-3 bg-white rounded col-md-4 col-10 col-8 select-student-style"}>
                                <div className="row">
                                    <div className="col-8">
                                        <hgroup>
                                            <small className={"text-secondary"}>FISH: </small>
                                            <p className={"d-inline"}> {currentItem.fullName}</p>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>Telefon raqam: </small>
                                            <p className={"d-inline"}> {formatPhoneNumber(currentItem.phoneNumber)} </p>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>Balans: </small>
                                            <p className={"d-inline"}> {currentItem.balans} UZS</p>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>Tug'ilgan sana: </small>
                                            <p className={"d-inline"}> {moment(currentItem.birthDate).format("DD-MM-yyyy")}</p>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>Manzil: </small>
                                            <p className={"d-inline"}>{currentItem.region && currentItem.region.name}</p>
                                        </hgroup>
                                        <hgroup>
                                            <small className={"text-secondary"}>Tavsif: </small>
                                            <p className={"d-inline"}> {currentItem.description}</p>
                                        </hgroup>
                                        <div className="button-block">
                                            <Button className="table-icon px-2"
                                                    onClick={() => openPaymentModal(currentItem)}>
                                                <span className="icon icon-wallet bg-success "/>
                                            </Button>
                                        </div>
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
                            {showPaymentModal ? "To'lov qo'shish" : "Talabani tahrirlash"}
                        </ModalHeader>
                        <ModalBody>
                            <div className={"w-100 modal-form"}>
                                <AvField
                                    defaultValue={currentObject ? currentObject.fullName : ""}
                                    disabled={showPaymentModal}
                                    type={"text"}
                                    label={"FISH"} name={"fullName"} className={"form-control"}
                                    placeholer={"nomi"} required/>
                                {showPaymentModal ?
                                    <>
                                        <AvField className={'form-control'} label={'Guruh:'} type="select"
                                                 name="groupId"
                                            // defaultValue={currentObject && currentObject.region ? currentObject.region.id : "0"}
                                        >
                                            <option key={0} value={"0"}>Guruhni tanlang</option>
                                            {/*{regions ? regions.map((item, i) =>*/}
                                            {/*    <option key={i} value={item.id}>{item.name}</option>*/}
                                            {/*) : ""}*/}
                                        </AvField>
                                        To'lov usuli
                                        <AvRadioGroup name="payTypeId"
                                            // defaultValue={currentObject ? currentObject.gender : ""}
                                                      label="" required className="pay-form-style d-block"
                                                      errorMessage="Birini tanlang!">
                                            {payTypes ? payTypes.map((item, i) =>
                                                <AvRadio key={i} className="d-block" label={item.name} value={item.id}/>
                                            ) : ""}
                                        </AvRadioGroup>
                                        <AvField
                                            // defaultValue={currentObject ? currentObject.phoneNumber : ""}
                                            type={"number"}
                                            label={"So'm"} name={"amount"} className={"form-control"}
                                            placeholer={""} required/>
                                    </>
                                    :
                                    <>
                                        <AvField
                                            defaultValue={currentObject ? currentObject.phoneNumber : ""}
                                            type={"number"}
                                            label={"Telefon raqam"} name={"phoneNumber"} className={"form-control"}
                                            placeholer={"nomi"} required/>
                                        <AvField
                                            type={"date"}
                                            defaultValue={currentObject ? moment(currentObject.birthDate).format('YYYY-MM-DD')
                                                : ""}
                                            label={"Tug'ilgan sana"} name={"birthDate"} className={"form-control"}
                                            required/>
                                        <AvField className={'form-control'} label={'Hudud:'} type="select"
                                                 name="regionId"
                                                 defaultValue={currentObject && currentObject.region ? currentObject.region.id : "0"}>
                                            <option key={0} value={"0"}>Ota hududni tanlang</option>
                                            {regions ? regions.map((item, i) =>
                                                <option key={i} value={item.id}>{item.name}</option>
                                            ) : ""}
                                        </AvField>
                                        <AvRadioGroup name="gender"
                                                      defaultValue={currentObject ? currentObject.gender : ""}
                                                      label="Jins" required className=""
                                                      errorMessage="Birini tanlang!">
                                            <AvRadio className="" label="Erkak" value="MALE"/>
                                            <AvRadio className="" label="Ayol" value="FEMALE"/>
                                        </AvRadioGroup>
                                    </>
                                }
                                <AvField
                                    defaultValue={currentObject ? currentObject.description : ""}
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

SelectStudent.propTypes = {};

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
)(SelectStudent);
