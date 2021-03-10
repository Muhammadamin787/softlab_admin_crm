import {Component} from "react";
import "./Card.css";

import {Button, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
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
import {formatSelectList, sortList} from "../../utils/addFunctions";
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
    }

    render() {
        const {
            appealList, clientStatusList, size, page, totalElements, dispatch, showModal, regions, deleteModal,
            reklamas, selectItems, showChangeModal, toplamList, loading
        } = this.props
        const {currentObject, reklamaId, regionId, statusTypeId, currentPage} = this.state

        const openModal = (item, collection) => {
            if (collection) {
                this.setState({currentPage: item})
            } else {
                this.setState({currentPage: ""})
                this.setState({currentObject: item})
            }
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
            v.enumType = currentPage
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
            console.log(v);
            dispatch(changeAppalTypeAction(v))
            this.setState({currentObject: '', object: '', changeLocationType: ''})
        }

        return (
            <AdminLayout pathname={this.props.location.pathname}>
                <div className={"container bg-white p-5"}>
                    <h3>Murojaatlar</h3>
                    <hr/>
                    <Container className={"pt-5"}>
                        {/*{loading ?*/}
                        {/*    <h1>salom</h1>*/}
                        {/*    :*/}
                        <Row id={""}>
                            {appealList && !loading ? appealList.map(item =>
                                <Col id={item.title}>
                                    <h4>
                                        {item.title}
                                        {item.id === "COLLECTION" ?
                                            "" :
                                            <Button color={"primary"} className={"ml-5"}
                                                    onClick={() => openModal(item.id, true)}>Qo'shish</Button>
                                        }
                                    </h4>
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
                                                    <Link
                                                        to={"/admin/appeal/" + (appeal.id)}>{appeal.fullName} </Link> / {appeal.phoneNumber}
                                                </div>
                                            ) : ''}
                                        </div>
                                    ) : ''}
                                </Col>
                            ) : ''}
                        </Row>
                        {/*}*/}
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


