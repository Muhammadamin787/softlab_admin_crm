import {Component, useState} from "react";
import "./Card.css";

import {
    Button,
    Col,
    Container, Dropdown, DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import AdminLayout from "../../component/AdminLayout";
import {
    changeAppalTypeAction,
    getAppealListAllAction, getAppealListByEnumTypeAction, getAppealListByStatusTypeAction,
    getClientStatusListAction, getRegionsAction, getReklamaAction,
    getToplamListForSelectAction,
    saveAppealAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AvField, AvForm, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";
import Select from "react-select";
import {formatSelectList, sortByEnumType, sortList} from "../../utils/addFunctions";
import LoaderMini from "../../component/LoaderMini";

class Card extends Component {
    componentDidMount() {
        this.props.dispatch(getRegionsAction())
        this.props.dispatch(getReklamaAction())
        this.props.dispatch(getAppealListAllAction())
        this.props.dispatch(getClientStatusListAction())
        this.props.dispatch(getToplamListForSelectAction())
        console.clear()
    }

    state = {
        object: '',
        showModal: false,
        currentObject: "",
        reklamaId: "",
        regionId: "",
        statusTypeId: "",
        newTypeId: "",
        changeLocationType: "",
        currentPage: '',
        enumType: '',
        dropdownOpen: true,
        curDropdownID: ''
    }

    render() {
        const {
            appealList, clientStatusList, size, page, totalElements, dispatch, showModal, regions, deleteModal,
            reklamas, selectItems, showChangeModal, toplamList, loading
        } = this.props
        const {currentObject, reklamaId, regionId, statusTypeId, currentPage, dropdownOpen, curDropdownID} = this.state

        const openModal = (item) => {
            this.setState({currentPage: item})
            dispatch({
                type: "updateState",
                payload: {
                    showModal: !showModal
                }
            })
        }

        const setClientStatus = (e, v) => {
            this.setState({statusTypeId: e.value})
        }
        const setClientRekalama = (e, v) => {
            this.setState({reklamaId: e.value})
        }
        const setClientRegion = (e, v) => {
            this.setState({regionId: e.value})
        }

        const saveItem = (e, v) => {
            v.regionId = regionId
            v.reklamaId = reklamaId
            v.clientStatusId = statusTypeId
            v.statusEnum = currentPage
            dispatch(saveAppealAction(v));
        }

        const allowDrop = (e) => {
            e.preventDefault();
        }

        const drag = (e) => {
            this.setState({object: e.target.id})
            this.setState({enumType: e.target.offsetParent.id})
            e.dataTransfer.setData("text", e.target.id);
        }
        const drop = (e) => {
            e.preventDefault();
            let data = ''
            let statusId = ''
            let enumStatus = e.target.offsetParent.id
            if (e.target.classList.contains("section")) {
                data = e.dataTransfer.getData("text");
                e.target.appendChild(document.getElementById(data));
                statusId = e.target.id.substring(0, e.target.id.indexOf(enumStatus));
            } else {
                e.target.parentElement.appendChild(document.getElementById(this.state.object));
                data = this.state.object;
                statusId = e.target.parentElement.id.substring(0, e.target.parentElement.id.indexOf(enumStatus))
            }
            let v = {}
            v.id = data
            v.clientStatusId = statusId
            v.statusEnum = enumStatus;
            dispatch(changeAppalTypeAction(v))
            this.setState({currentObject: '', object: '', changeLocationType: ''})
        }

        const isOpen = (id) => {
            return curDropdownID === id
        }
        const dropdownToggle = (item) => {
            this.setState({curDropdownID: item})
        }

        return (
            <AdminLayout pathname={this.props.location.pathname}>
                <div className={"container p-1"}>
                    <h2>Murojaatlar</h2>
                    <Container className={"py-3 bg-white px-5"}>
                        <Row id={""}>
                            {appealList && !loading && appealList.length > 0 ? appealList.map(item =>
                                <Col id={item.title}>
                                    <h4>
                                        {item.title === "COLLECTION" ? "To'plamlar" : item.title === "WAITING" ? "Kutish" : "So'rovlar"}
                                    </h4>
                                    <button className={"btn btn-default btn-sm rounded-circle border-secondary"}
                                            onClick={() => openModal(item.title)}>+
                                    </button>
                                    <hr/>
                                    {item.sectionDtos && item.sectionDtos.length > 0 ? sortList(item.sectionDtos).map(section =>
                                        <div className={"section"} onDrop={(e) => drop(e, item.id)}
                                             onDragOver={allowDrop}
                                             draggable={false} id={section.id + item.title}>
                                            <h6>{section.name}</h6>
                                            <hr/>
                                            {section.appealDtos ? section.appealDtos.map(appeal =>
                                                <div className={"element"} draggable={true}
                                                    // onDrop={(e) => drop(e, item.id)}
                                                     onDragStart={drag}
                                                     id={appeal.id}>
                                                    <Row>
                                                        <Col md={"10"}>
                                                            <Link className="small"
                                                                  to={"/admin/appeal/" + (appeal.id)}>{appeal.fullName} </Link> /
                                                            <span className="small">{appeal.phoneNumber}</span>
                                                        </Col>
                                                        <Col md={"2"}>
                                                            <Dropdown
                                                                className="d-inline"
                                                                id={"show" + appeal.id} onMouseOver={() => {
                                                                dropdownToggle('show' + appeal.id)
                                                            }} onMouseLeave={() => {
                                                                dropdownToggle('')
                                                            }} isOpen={isOpen('show' + appeal.id)}>
                                                                <DropdownToggle className={"btn btn-light text-center"}
                                                                                size={"sm"}>:</DropdownToggle>
                                                                <DropdownMenu>
                                                                    <DropdownItem>Talaba qo'shish</DropdownItem>
                                                                    <DropdownItem>Tahrirlash</DropdownItem>
                                                                    <DropdownItem>O'chirish</DropdownItem>
                                                                </DropdownMenu>
                                                            </Dropdown>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ) : ''}
                                        </div>
                                    ) : ''}
                                </Col>
                            ) : ''}
                        </Row>
                    </Container>
                </div>


                <Modal id={""} isOpen={showModal} toggle={openModal} className={""} size={"md"}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={() => openModal("", false)} charCode="X">
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
                                        options={clientStatusList && clientStatusList.length > 0 && sortByEnumType(clientStatusList, currentPage)}
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
                                    Hudud
                                    <Select
                                        placeholder="Hududni tanlang..."
                                        name="regionId"
                                        isSearchable={true}
                                        options={regions && regions.length > 0 && formatSelectList(regions)}
                                        onChange={setClientRegion}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    <br/>
                                    Reklama
                                    <Select
                                        placeholder="Reklamani tanlang..."
                                        name="groupId"
                                        isSearchable={true}
                                        options={reklamas && reklamas.length > 0 && formatSelectList(reklamas)}
                                        onChange={setClientRekalama}
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
        )
    }

}

export default connect(({
                            app: {
                                appealList, clientStatusList,
                                toplamList,
                                selectItems,
                                showChangeModal,
                                size,
                                page,
                                totalElements,
                                currentPage,
                                regions,
                                loading,
                                reklamas,
                                showModal,
                                deleteModal
                            },
                        }) => ({
        appealList, clientStatusList,
        toplamList,
        selectItems,
        showChangeModal,
        size,
        page,
        totalElements,
        currentPage,
        regions,
        loading,
        reklamas,
        showModal,
        deleteModal
    })
)(Card);


