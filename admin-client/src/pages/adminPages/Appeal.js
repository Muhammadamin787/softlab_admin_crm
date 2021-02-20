import React, {Component} from 'react';
import {
    getAppealListByEnumTypeAction,
    getClientStatusListAction,
    getRegionsAction, getReklamaAction,
    getStudentsAction, saveAppealAction,
} from "../../redux/actions/AppActions";
import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {connect} from "react-redux";
import {AvForm, AvField, AvRadioGroup, AvRadio} from "availity-reactstrap-validation"
import AdminLayout from "../../component/AdminLayout";
import Pagination from "react-js-pagination";
import {formatPhoneNumber, formatSelectList, normalizeInput} from "../../utils/addFunctions";
import {DeleteIcon, EditIcon} from "../../component/Icons";
import moment from "moment";
import Select from "react-select";
import PhoneInput from "react-phone-number-input";

class Appeal extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getClientStatusListAction({type: "REQUEST"}))
        dispatch(getRegionsAction())
        dispatch(getReklamaAction())
        dispatch(getAppealListByEnumTypeAction({enumType: "REQUEST", page: 0, size: 20}))
    }

    state = {
        showModal: false,
        currentObject: "",
        reklamaId: "",
        statusTypeId: "",
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getStudentsAction({page: (pageNumber - 1), size: this.props.size}))
    }

    render() {
        const {
            size,
            page,
            totalElements,
            dispatch,
            showModal,
            regions,
            deleteModal,
            currentPage,
            clientStatusList,
            reklamas,
            selectItems,
            appealList
        } = this.props
        const {currentObject, reklamaId, statusTypeId} = this.state

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
            this.setState({statusTypeId: e.value})
        }
        const setClientRekalam = (e, v) => {
            this.setState({reklamaId: e.value})
        }
        const saveItem = (e, v) => {
            v.reklamaId = reklamaId
            v.clientStatusId = statusTypeId
            v.statusEnum = currentPage
            dispatch(saveAppealAction(v));
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
                                {appealList && appealList.length > 0 ? appealList.map((item, i) =>
                                    <tr key={i} className={"table-tr"}>
                                        <td>{i + 1}</td>
                                        <td>{item.fullName}</td>
                                        <td>{formatPhoneNumber(item.phoneNumber)}</td>
                                        <td>{item.statusName}</td>
                                        <td>
                                            <Button className="table-icon"
                                                    onClick={() => openModal(item)}
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
                                ) : "Murojaat mavjud emas"}
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
                        </Col>
                        <Col md={3}>
                            <button
                                onClick={() => changePage("REQUEST")}
                                className={"btn btn-block appeal-button" + (currentPage === "REQUEST" ? " appeal-button-active" : "")}>So'rovlar
                            </button>
                            <button
                                onClick={() => changePage("WAITING")}
                                className={"btn btn-block appeal-button" + (currentPage === "WAITING" ? " appeal-button-active" : "")}>Kutish
                            </button>
                            <button
                                onClick={() => changePage("SET")}
                                className={"btn btn-block appeal-button " + (currentPage === "SET" ? " appeal-button-active" : "")}>To'plam
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
                                        errorMessage={"Ismni yozish majburiy"}
                                        label={"FISH"} name={"fullName"} className={"form-control"}
                                        placeholer={"nomi"} required/>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.phoneNumber : ""}
                                        type={"text"}
                                        errorMessage="telefon raqam uzunligi 9 ta bo'lishi shart"
                                        validate={{
                                            required: {value: true},
                                            pattern: {value: "^[0-9]+$", errorMessage: "faqat raqam yozing"},
                                            minLength: {value: 9},
                                            maxLength: {value: 9}
                                        }}
                                        label={"Telefon Raqam"} name={"phoneNumber"} className={"form-control"}
                                        placeholer={"99 1234567"} required/>
                                    Murojaat bo'limi
                                    <Select
                                        placeholder="Bo'limni tanlang..."
                                        name="groupId"
                                        isSearchable={true}
                                        options={clientStatusList && clientStatusList.length > 0 && formatSelectList(clientStatusList)}
                                        onChange={setClientStatus}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    Jinsi
                                    <AvRadioGroup name="gender"
                                                  defaultValue={currentObject ? currentObject.gender : ""}
                                                  required
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
                                        defaultValue={currentObject && currentObject.age}
                                        label={"Yoshi"} name={"age"} className={"form-control"}
                                    />

                                    <AvField className={'form-control'} label={'Hudud:'} type="select"
                                             name="regionId"
                                             defaultValue={currentObject && currentObject.region ? currentObject.region.id : "0"}>
                                        <option key={0} value={"0"}>Hududni tanlang</option>
                                        {regions && regions.length > 0 ? regions.map((item, i) =>
                                            <option key={i} value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>
                                    Reklama turi
                                    <Select
                                        placeholder="Reklamani tanlang..."
                                        name="groupId"
                                        isSearchable={true}
                                        options={reklamas && reklamas.length > 0 && formatSelectList(reklamas)}
                                        onChange={setClientRekalam}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
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
                            app: {
                                size,
                                page,
                                totalElements,
                                appealList,
                                clientStatusList,
                                currentPage,
                                regions,
                                loading,
                                reklamas,
                                showModal,
                                deleteModal
                            },
                        }) => ({
        size,
        page,
        totalElements,
        appealList,
        clientStatusList,
        regions, currentPage,
        loading, reklamas, showModal, deleteModal
    })
)(Appeal);
