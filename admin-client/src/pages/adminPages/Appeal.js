import React, {Component} from 'react';
import {
    getClientStatusListAction,
    getRegionsAction,
    getStudentsAction,
    saveStudentAction
} from "../../redux/actions/AppActions";
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {connect} from "react-redux";
import {AvForm, AvField, AvRadioGroup, AvRadio} from "availity-reactstrap-validation"
import {toast} from "react-toastify";
import AdminLayout from "../../component/AdminLayout";
import {Link} from "react-router-dom";
import Pagination from "react-js-pagination";
import {formatPhoneNumber, formatSelectList} from "../../utils/addFunctions";
import {DeleteIcon, EditIcon} from "../../component/Icons";
import moment from "moment";
import Select from "react-select";

class Appeal extends Component {
    componentDidMount() {
        this.props.dispatch(getClientStatusListAction({type: "REQUEST"}))
        this.props.dispatch(getRegionsAction())
    }

    state = {
        showModal: false,
        currentObject: "",
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getStudentsAction({page: (pageNumber - 1), size: this.props.size}))
    }


    render() {
        const {
            dispatch,
            showModal,
            regions,
            deleteModal,
            currentPage,
            clientStatusList,
            reklamas,
            selectItems
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
        const changePage = (item) => {
            dispatch({
                type: "updateState",
                payload: {
                    currentPage: item
                }
            })
        }
        const openDeleteModal = (item) => {
            dispatch({
                type: "updateState",
                payload: {
                    deleteModal: !deleteModal
                }
            })
        }
        const setClientStatus = (e, v) => {
            console.log(e);
        }
        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
                console.clear();
            }
            let studentDto;
            studentDto = {
                fullName: v.fullName,
                gender: v.gender,
                phoneNumber: v.phoneNumber,
                parentPhone: v.parentPhone,
                avatarId: v.attachmentId,
                regionId: v.regionId,
                description: v.description,
                birthDate: moment(v.birthDate).format('DD/MM/YYYY hh:mm:ss').toString(),
            }
            dispatch(saveStudentAction(studentDto))
        }

        return (
            <AdminLayout pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <hgroup className={"course-select-header"}>
                        <h3>Murojaatlar</h3>
                    </hgroup>
                    <div align={"right"}>
                        <Button color={"success"} onClick={openModal} className={"mb-2 add-button px-4"}>Yangisini
                            qo'shish
                        </Button>
                    </div>

                    <Row>
                        <Col md={9}>
                            <div className={"row"}>
                                <div className="col-md-3">
                                    <AvForm>
                                        <AvField type="select" name="selectSize"
                                            // onChange={changeSize}
                                            // defaultValue={size}
                                        >
                                            <option value="all">Barchasi</option>
                                            <option value="25">Telegram</option>
                                            <option value="50">Sayt</option>
                                            <option value="100">Ofis</option>
                                        </AvField>
                                    </AvForm>
                                </div>
                                <div className="col-md-3">
                                    <AvForm>
                                        <AvField type="search" name="searchWord"
                                                 placeholder="Qidirish"
                                            // onChange={changeSize}
                                            // defaultValue={size}
                                        />
                                    </AvForm>
                                </div>
                            </div>
                            <Table className={"table-style w-100"}>
                                <thead className={""}>
                                <tr className={""}>
                                    <th>No</th>
                                    <th>Ism</th>
                                    <th>Telefon</th>
                                    <th>Bo'lim</th>
                                    <th>Amal</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className={"table-tr"}>
                                    <td>1</td>
                                    <td>Mijoz Mijozov</td>
                                    <td>{formatPhoneNumber("991234567")}</td>
                                    <td>Telegram</td>
                                    <td>
                                        <Button className="table-icon"
                                            // onClick={() => openDeleteModal(item)}
                                        >
                                            <EditIcon/>
                                        </Button>
                                        <Button className="table-icon"
                                            // onClick={() => openDeleteModal(item)}
                                        >
                                            <DeleteIcon/>
                                        </Button>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                            <Pagination
                                activePage={1}
                                itemsCountPerPage={10}
                                totalItemsCount={110}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)} itemClass="page-item"
                                linkClass="page-link"
                            />
                        </Col>
                        <Col md={3}>
                            <button
                                onClick={() => changePage("")}
                                className={"btn btn-block appeal-button" + (currentPage === "" ? " appeal-button-active" : "")}>So'rovlar
                            </button>
                            <button
                                onClick={() => changePage("pending")}
                                className={"btn btn-block appeal-button" + (currentPage === "pending" ? " appeal-button-active" : "")}>Kutish
                            </button>
                            <button
                                onClick={() => changePage("set")}
                                className={"btn btn-block appeal-button " + (currentPage === "set" ? " appeal-button-active" : "")}>To'plam
                            </button>
                        </Col>
                    </Row>
                </div>
                <Modal id={""} isOpen={showModal} toggle={openModal} className={""} size={"md"}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            {currentObject && currentObject.id ? "Talabani tahrirlash" : "Yangi talaba qo'shish"}
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.fullName : ""}
                                        type={"text"}
                                        label={"FISH"} name={"fullName"} className={"form-control"}
                                        placeholer={"nomi"} required/>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.phoneNumber : ""}
                                        type={"number"}
                                        errorMessage="telefon raqam uzunligi 9 ta bo'lishi shart"
                                        validate={{
                                            required: {value: true},
                                            pattern: {value: "^[0-9]+$"},
                                            minLength: {value: 9},
                                            maxLength: {value: 9}
                                        }}
                                        label={"Telefon Raqam"} name={"phoneNumber"} className={"form-control"}
                                        placeholer={"991234567"} required/>
                                    <Select
                                        placeholder="Bo'limni tanlang..."
                                        name="groupId"
                                        isSearchable={true}
                                        options={clientStatusList && clientStatusList.length > 0 && formatSelectList(clientStatusList)}
                                        onChange={setClientStatus}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    <AvRadioGroup name="gender"
                                                  defaultValue={currentObject ? currentObject.gender : ""}
                                                  label="Jins" required
                                                  className={""}
                                                  errorMessage="Birini tanlang!">
                                        <Row>
                                            <Col>
                                                <AvRadio label="Erkak" value="MALE"/>
                                            </Col>
                                            <Col>
                                                <AvRadio label="Ayol" value="FEMALE"/>
                                            </Col>
                                        </Row>
                                    </AvRadioGroup>
                                </Col>
                                <Col>
                                    <AvField
                                        type={"number"}
                                        defaultValue={currentObject && currentObject.birthDate ? moment(currentObject.birthDate).format('YYYY-MM-DD')
                                            : ""}
                                        label={"Yoshingiz"} name={"birthDate"} className={"form-control"}
                                    />

                                    <AvField className={'form-control'} label={'Hudud:'} type="select"
                                             name="regionId"
                                             defaultValue={currentObject && currentObject.region ? currentObject.region.id : "0"}>
                                        <option key={0} value={"0"}>Hududni tanlang</option>
                                        {regions && regions.length > 0 ? regions.map((item, i) =>
                                            <option key={i} value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>

                                    <AvField
                                        defaultValue={currentObject ? currentObject.description : ""}
                                        type={"textarea"}
                                        label={"Izoh"} name={"description"} className={"form-control"}/>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={openModal}>Bekor qilish</Button>
                            <Button color="primary">Saqlash</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>

            </AdminLayout>
        );
    }
}


Appeal.propTypes = {};

export default connect(({
                            app: {clientStatusList, currentPage, regions, loading, reklamas, showModal, deleteModal},
                        }) => ({
        clientStatusList,
        regions, currentPage,
        loading, reklamas, showModal, deleteModal
    })
)(Appeal);
