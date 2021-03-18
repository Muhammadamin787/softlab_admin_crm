import React, {Component} from 'react';
import {
    deleteEmployeeAction, getEmployeeAction, saveEmployeeAction


} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {AvField, AvForm, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";
import AdminLayout from "../../component/AdminLayout";
import {DeleteIcon, EditIcon} from "../../component/Icons";
import moment from "moment";
import {formatPhoneNumber} from "../../utils/addFunctions";
import {AiOutlineUsergroupAdd} from "react-icons/all";

class SelectStaff extends Component {

    componentDidMount() {
        let id = 0
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            id = this.props.match.params.id;
            this.props.dispatch(getEmployeeAction({id: id}))
        }
    }

    state = {
        showModal: false,
        showDeleteModal: false,
        currentObject: ''
    }

    render() {
        const {currentObject} = this.state;
        const {dispatch, showModal, deleteModal,regions,currentItem} = this.props;
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
            this.setState({currentObject: item.id, showDeleteModal: !this.state.showDeleteModal})
        }
        const deleteItem = () => {
            dispatch(deleteEmployeeAction(currentObject))
            this.setState({showDeleteModal: !this.state.showDeleteModal})
        }

        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
            }
            let employeeDto;
            employeeDto = {userDto: ""}
            employeeDto.userDto = {
                id: v.id,
                fullName: v.fullName,
                gender: v.gender,
                phoneNumber: v.phoneNumber,
                regionId: v.regionId,
                description: v.description,
                birthDate: moment(v.birthDate).format('YYYY-MM-DD').toString(),
            }
            employeeDto.roleName = v.roleName;
            employeeDto.id = currentObject.id
            dispatch(saveEmployeeAction(employeeDto))
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
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
                                    <small className={"text-secondary"}>Jinsi: </small>
                                    <p className={"d-inline"}>{currentItem.gender === "MALE" ? "Erkak" : "Ayol"}</p>
                                </hgroup>
                                <hgroup>
                                    <small className={"text-secondary"}>Tavsif: </small>
                                    <p className={"d-inline"}> {currentItem.description}</p>
                                </hgroup>
                                <div className="button-block">
                                    {/*<Button className="table-icon px-2"*/}
                                    {/*        onClick={() => openAddGroupModal(currentItem)}>*/}
                                    {/*    <AiOutlineUsergroupAdd*/}
                                    {/*        color={"#EE8033"}*/}
                                    {/*    />*/}
                                    {/*</Button>*/}
                                    {/*<Button className="table-icon px-2"*/}
                                    {/*        onClick={() => openPaymentModal(currentItem)}>*/}
                                    {/*    <span className="icon icon-wallet bg-success "/>*/}
                                    {/*</Button>*/}
                                </div>
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
                                    <AvRadioGroup name="roleName"
                                                  defaultValue={currentObject ? currentObject.roleName : ""}
                                                  label="Kasbi" required
                                                  errorMessage="Birini tanlang!">
                                        <AvRadio label="Adminstrator" value="Adminstrator"/>
                                        <AvRadio label="Hisobchi" value="Hisobchi"/>
                                        <AvRadio label="Admin" value="Admin"/>
                                    </AvRadioGroup>
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
                </div>
            </AdminLayout>
        );
    }
}

SelectStaff.propTypes = {}
export default connect(({
                            app: {loading, employees, showModal, deleteModal,regions},
                        }) => ({
        loading, employees, showModal, deleteModal,regions
    })
)(SelectStaff);