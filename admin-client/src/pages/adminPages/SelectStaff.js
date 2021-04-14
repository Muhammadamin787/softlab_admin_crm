import React, {Component} from 'react';
import {
    deleteCourseAction,
    deleteEmployeeAction,
    getEmployeeAction,
    getRegionsAction,
    saveEmployeeAction,
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {AvField, AvForm, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";
import AdminLayout from "../../component/AdminLayout";
import {DeleteIcon, EditIcon} from "../../component/Icons";
import moment from "moment";
import {formatPhoneNumber} from "../../utils/addFunctions";
import {Link} from "react-router-dom";

class SelectStaff extends Component {

    componentDidMount() {
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
            this.props.dispatch(getEmployeeAction({id: id}))
            this.props.dispatch(getRegionsAction())
        }

    }

    state = {
        showModal: false,
        showDeleteModal: false,
        currentObject: ''
    }

    render() {
        const {currentObject, isSuperAdmin} = this.state;
        const {dispatch, showModal, deleteModal, history, regions, currentItem} = this.props;
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
        const deleteItem = (item) => {
            // console.log(this.props.history);
            dispatch(deleteEmployeeAction({...item, history: history}))
            // console.log(history);
        }

        const saveItem = (e, v) => {
            v.id = currentObject.id
            console.log(v);
            v.birthDate = moment(v.birthDate).format('DD-MM-YYYY').toString()
            dispatch(saveEmployeeAction(v))
        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header ml-2"}>
                        <h3>{currentItem && currentItem.fullName} </h3>
                        <Link to={"/admin/staffs"} className={"text-decoration-none"}><span
                            className={""}> Xodimlar</span></Link>
                    </hgroup>

                    <div
                        className={"m-2 p-3 bg-white rounded col-md-4 col-10 col-8 select-staff-style"}>
                        <div className="row">
                            <div className="col-8">
                                <hgroup>
                                    <small className={"text-secondary"}>FISH: </small>
                                    <p className={"d-inline"}> {currentItem.fullName}</p>
                                </hgroup>
                                <hgroup>
                                    <small className={"text-secondary"}>Telefon
                                        raqam: </small>
                                    <p className={"d-inline"}> {formatPhoneNumber(currentItem.phoneNumber)} </p>
                                </hgroup>
                                <hgroup>
                                    <small className={"text-secondary"}>Tug'ilgan
                                        sana: </small>
                                    <p className={"d-inline"}> {moment(currentItem.birthDate).format("DD-MM-yyyy")}</p>
                                </hgroup>
                                <hgroup>
                                    <small className={"text-secondary"}>Manzil: </small>
                                    <p className={"d-inline"}>{currentItem.region && currentItem.region.name}</p>
                                </hgroup>
                                <hgroup>
                                    <small className={"text-secondary"}>Kasbi: </small>
                                    <p className={"d-inline"}>{currentItem && currentItem.roleName ? currentItem.roleName[0].roleName : ''}</p>
                                </hgroup>
                                <hgroup>
                                    <small className={"text-secondary"}>Jinsi: </small>
                                    <p className={"d-inline"}>{currentItem.gender === "MALE" ? "Erkak" : "Ayol"}</p>
                                </hgroup>
                                <hgroup>
                                    <small className={"text-secondary"}>Tavsif: </small>
                                    <p className={"d-inline"}> {currentItem.description}</p>
                                </hgroup>
                                <hgroup>
                                    <small className={"text-secondary"}>Parol: </small>
                                    <p className={"d-inline"}> {currentItem.password}</p>
                                </hgroup>
                            </div>
                            <div className="col-4 button-block">
                                <Button className="table-icon"
                                        onClick={() => openModal(currentItem)}>
                                    <EditIcon className="button-icon"/>
                                </Button>
                                <Button className="table-icon"
                                        onClick={() => openDeleteModal(currentItem)}>
                                    <DeleteIcon className="button-icon"/>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                        <AvForm className={""} onValidSubmit={saveItem}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject ? "Xodim tahrirlash" : "Yamgi xodim qo'shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.fullName : ""}
                                        type={"text"}
                                        label={"FISH"} name={"fullName"} className={"form-control"}
                                        placeholer={"nomi"} required/>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.phoneNumber : ""}
                                        type={"text"}
                                        label={"Telefon raqam"} name={"phoneNumber"} className={"form-control"}
                                        placeholer={"nomi"} required/>
                                    <AvField
                                        type={"date"}
                                        defaultValue={currentObject && currentObject.birthDate ? moment(currentObject.birthDate).format('YYYY-MM-DD')
                                            : ""}
                                        label={"Tug'ilgan sana"} name={"birthDate"} className={"form-control"}
                                    />
                                    <AvField className={'form-control'} label={'Hudud:'} type="select"
                                             name="regionId"
                                             defaultValue={currentObject && currentObject.region ? currentObject.region.id : "0"}>
                                        <option key={0} value={"0"}>Ota hududni tanlang</option>
                                        {regions ? regions.map((item, i) =>
                                            <option key={i} value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>
                                    <AvRadioGroup name="roleName"
                                                  defaultValue={
                                                      currentObject && currentObject.roles && currentObject.roles[0] && currentObject.roles[0].roleName === "ADMIN" ? "ADMIN" :
                                                          currentObject && currentObject.roles && currentObject.roles[0] && currentObject.roles[0].roleName === "RECEPTION" ? "RECEPTION" :
                                                              currentObject && currentObject.roles && currentObject.roles[0] && currentObject.roles[0].roleName === "FINANCIER" ? "FINANCIER" : ""}
                                                  label="Kasbi" required
                                                  errorMessage="Birini tanlang!">
                                        <AvRadio label="Adminstrator" value="RECEPTION"/>
                                        <AvRadio label="Hisobchi" value="FINANCIER"/>
                                        <AvRadio label="Admin" value="ADMIN"/>
                                    </AvRadioGroup>
                                    <AvRadioGroup name="gender"
                                                  defaultValue={currentObject ? currentObject.gender : ""}
                                                  label="Jins" required
                                                  errorMessage="Birini tanlang!">
                                        <AvRadio label="Erkak" value="MALE"/>
                                        <AvRadio label="Ayol" value="FEMALE"/>
                                    </AvRadioGroup>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.description : ""}
                                        type={"textarea"}
                                        label={"Izoh"} name={"description"} className={"form-control"}/>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.password : ""}
                                        type={"text"} placeholder={"abc_123!*"}
                                        label={"Parol"} name={"password"} className={"form-control"}
                                    />
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
                </div>
            </AdminLayout>
        );
    }
}

SelectStaff.propTypes = {}
export default connect(({
                            app: {loading, history, employees, currentItem, showModal, deleteModal, regions},
                            auth: {isSuperAdmin}
                        }) => ({
        loading, employees, showModal, history, currentItem, deleteModal, regions, isSuperAdmin
    })
)(SelectStaff);