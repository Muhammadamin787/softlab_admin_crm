import React, {Component} from 'react';
import {

    getEmployeeListAction,
    deleteEmployeeAction,
    saveEmployeeAction,
    getRegionsAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {AvField, AvForm, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";
import AdminLayout from "../../component/AdminLayout";
import moment from "moment";
import {Link} from "react-router-dom";
import {formatPhoneNumber} from "../../utils/addFunctions";
import Pagination from "react-js-pagination";

class Staff extends Component {

    componentDidMount() {
        this.props.dispatch(getEmployeeListAction({page: 0, size: this.props.size}))
        this.props.dispatch(getRegionsAction())
    }

    state = {
        showModal: false,
        showDeleteModal: false,
        currentObject: ''
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getEmployeeListAction({page: (pageNumber - 1), size: this.props.size}))
    }

    render() {
        const {currentObject} = this.state;
        const {
            dispatch,
            showModal,
            deleteModal,
            employees,
            regions,
            page,
            size,
            totalElements,
        } = this.props;
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
            let employeeDto
            employeeDto = {
                fullName: v.fullName,
                gender: v.gender,
                phoneNumber: v.phoneNumber,
                parentPhone: v.parentPhone,
                avatarId: v.attachmentId,
                // regionId: v.regionId,
                description: v.description,
                birthDate: moment(v.birthDate).format('DD-MM-YYYY').toString(),
                password: v.password,
                roleName: v.roleName
            }
            dispatch(saveEmployeeAction(employeeDto))
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h1>Xodimlar</h1>
                    <div align={"right"}>
                        <Button color={"success"} onClick={openModal} className={"mb-2 add-button px-4"}>Yangisini
                            qo'shish
                        </Button>

                    </div>
                    <Table className={"table-style"}>
                        <thead>
                        <tr className={"text-center"}>
                            <th>№</th>
                            <th>ISMI</th>
                            <th className={"mb-0"}>TELEFON</th>
                            <th>KASBI</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            employees && employees.length > 0 ? employees.map((item, i) =>
                                <tr key={i} className={"table-tr"}>
                                    <td>{page > 0 ? page * size + i + 1 : i + 1}</td>
                                    <td><Link className={"text-dark"}
                                              to={"/admin/staff/" + (item.id)}>{item.fullName}</Link>
                                    </td>
                                    <td>
                                        {item.phoneNumber && item.phoneNumber.length === 9 ? formatPhoneNumber(item.phoneNumber) : item.phoneNumber}
                                    </td>
                                    <td>{item.roleName === "ADMIN" ? "Menejr" : item.roleName === "RECEPTION" ? "Reception" : item.roleName === "FINANCIER" ? "Hisobchi" : ""}</td>
                                </tr>
                            ) : ''}
                        </tbody>
                    </Table>

                    <Pagination
                        activePage={page + 1}
                        itemsCountPerPage={size}
                        totalItemsCount={totalElements}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)} itemClass="page-item"
                        linkClass="page-link"
                    />


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
                                        validate={{
                                            required: {value: true},
                                            pattern: {value: "^[0-9]+$"},
                                            minLength: {value: 9},
                                            maxLength: {value: 9}
                                        }}
                                        placeholer={"nomi"} required/>
                                    <AvField
                                        type={"date"}
                                        defaultValue={currentObject && currentObject.birthDate ? moment(currentObject.birthDate).format('YYYY-MM-DD')
                                            : ""}
                                        label={"Tug'ilgan sana"} name={"birthDate"} className={"form-control"}
                                    />
                                    {/*<AvField className={'form-control'} label={'Hudud:'} type="select"*/}
                                    {/*         name="regionId"*/}
                                    {/*         defaultValue={currentObject && currentObject.region ? currentObject.region.id : "0"}>*/}
                                    {/*    <option key={0} value={"0"}>Ota hududni tanlang</option>*/}
                                    {/*    {regions ? regions.map((item, i) =>*/}
                                    {/*        <option key={i} value={item.id}>{item.name}</option>*/}
                                    {/*    ) : ""}*/}
                                    {/*</AvField>*/}
                                    <AvRadioGroup name="roleName"
                                                  defaultValue={currentObject ? currentObject.roleName : ""}
                                                  label="Kasbi" required
                                                  errorMessage="Birini tanlang!">
                                        <AvRadio label="Reception" value="RECEPTION"/>
                                        <AvRadio label="Hisobchi" value="FINANCIER"/>
                                        <AvRadio label="Menejr" value="ADMIN"/>
                                    </AvRadioGroup>
                                    <AvRadioGroup name="gender"
                                                  defaultValue={currentObject ? currentObject.gender : ""}
                                                  label="Jins" required
                                                  errorMessage="Birini tanlang!">
                                        <AvRadio label="Erkak" value="MALE"/>
                                        <AvRadio label="Ayol" value="FEMALE"/>
                                    </AvRadioGroup>
                                    <AvField
                                        defaultValue={currentObject && currentObject.userDto ? currentObject.userDto.description : ""}
                                        type={"textarea"}
                                        label={"Izoh"} name={"description"} className={"form-control"}
                                    />
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

Staff.propTypes = {}
export default connect(({
                            app: {
                                loading,
                                employees,
                                showModal,
                                deleteModal,
                                regions,
                                page,
                                size,
                                totalElements,
                            }
                        }) => ({
        loading,
        employees,
        showModal,
        deleteModal,
        regions,
        page,
        size,
        totalElements,

    })
)(Staff);