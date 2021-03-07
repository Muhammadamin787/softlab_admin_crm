import {Component} from "react";
import "./Card.css";

import {Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import AdminLayout from "../../component/AdminLayout";
import {
    getAppealListAllAction, getAppealListByEnumTypeAction, getAppealListByStatusTypeAction,
    getClientStatusListAction,
    getToplamListForSelectAction,
    saveAppealAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AvField, AvForm, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";
import Select from "react-select";
import {formatSelectList} from "../../utils/addFunctions";

class Card extends Component {
    componentDidMount() {
        this.props.dispatch(getAppealListAllAction({page: 0, size: 20}))
        this.props.dispatch(getClientStatusListAction())
        console.clear()
    }

    state = {
        object: '',
        columns: [
            {
                title: "So'rovlar",
                id : "REQUEST"
            },
            {
                title: "Kutish",
                id : "WAITING"
            },
            {
                title: "To'plam",
                id : "COLLECTION"
            }
        ],
        showModal: false,
        currentObject: "",
        reklamaId: "",
        regionId: "",
        statusTypeId: "",
        newTypeId: "",
        changeLocationType: "",
    }

    render() {
        const {appealList,clientStatusList,size, page, totalElements, dispatch, showModal, regions, deleteModal,
            currentPage, reklamas, selectItems, showChangeModal, toplamList} = this.props
        const {columns,currentObject, reklamaId, regionId, statusTypeId} = this.state

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
            if (item === "COLLECTION") {
                dispatch(getToplamListForSelectAction())
            } else {
                dispatch(getAppealListByEnumTypeAction({enumType: item, page: 0, size: 20}))
                dispatch(getClientStatusListAction({type: item}))
            }
        }
        const changeStatusType = (e, v) => {
            if (v === "all")
                dispatch(getAppealListByEnumTypeAction({enumType: currentPage, page: 0, size: 20}))
            else
                dispatch(getAppealListByStatusTypeAction({enumType: currentPage, typeId: v, page: 0, size: 20}))
        }

        const setClientStatus = (e, v) => {
            this.setState({statusTypeId: e.value})
        }
        const setChangeClientStatus = (e, v) => {
            this.setState({newTypeId: e.value})
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
            v.enumType = currentPage
            dispatch(saveAppealAction(v));
        }

        const allowDrop = (e) => {
            e.preventDefault();
        }

        const drag = (e) => {
            this.setState({object: e.target.id})
            e.dataTransfer.setData("text", e.target.id);
        }

        const drop = (e) => {

            console.log(e.target.id)
            console.log(this.state.object)
            e.preventDefault();
            if (e.target.classList.contains("section")) {
                let data = e.dataTransfer.getData("text");
                e.target.appendChild(document.getElementById(data));
            }
        }

        const openChangeModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    showChangeModal: !showChangeModal
                }
            })
        }

        return (
            <AdminLayout pathname={this.props.location.pathname}>
                <div className={"container bg-white p-5"}>
                    <h3>Murojaatlar</h3>
                    <hr/>
                    <Container className={"pt-5"}>
                        <Row>
                            {columns ? columns.map(item =>
                                <Col id={item.id}>
                                    <h4>{item.title}</h4>
                                    <hr />
                                    {clientStatusList ? clientStatusList.map(item2 =>
                                        item2.clientStatusEnum === item.id ?
                                            <div className={"section"} onDrop={drop} onDragOver={allowDrop} draggable={false} id={item2.id}>
                                                <h6>{item2.name}</h6>
                                                <hr/>
                                                {appealList ? appealList.map(item3 =>
                                                    item3.clientStatus && item3.client && item2.id === item3.clientStatus.id ?
                                                        <div className={"element"} draggable={true} onDrop={false} onDragStart={drag} id={item3.id}>
                                                            <Link to={"/admin/appeal/"+item3.id}>{item3.client.fullName} </Link> / {item3.client.phoneNumber}
                                                        </div>
                                                        :''
                                                ) : ''}
                                            </div>
                                            : ''
                                    ) : ''}
                                </Col>
                            ) : ''}
                        </Row>
                    </Container>
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

                <Modal id={""} isOpen={showChangeModal} toggle={openChangeModal} className={""} size={"md"}>
                    <AvForm className={""}>
                        <ModalHeader isOpen={showChangeModal} toggle={openChangeModal} charCode="X">
                            Bo'limni o'zgartirish
                        </ModalHeader>
                        <ModalBody>
                            <Select
                                placeholder="Bo'limni tanlang..."
                                name="groupId"
                                isSearchable={true}
                                options={selectItems && selectItems.length > 0 && formatSelectList(selectItems)}
                                onChange={setChangeClientStatus}
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={openChangeModal}>Bekor qilish</Button>
                            <Button color="primary">O'tkazish</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>

            </AdminLayout>
        )
    }

}

export default connect(({
                            app: {
                                appealList,clientStatusList,
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
        appealList,clientStatusList,
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


