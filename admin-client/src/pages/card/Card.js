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
import {formatSelectList} from "../../utils/addFunctions";

class Card extends Component {
    componentDidMount() {
        this.props.dispatch(getRegionsAction())
        this.props.dispatch(getReklamaAction())
        this.props.dispatch(getAppealListAllAction({page: 0, size: 20}))
        this.props.dispatch(getClientStatusListAction())
        this.props.dispatch(getToplamListForSelectAction())
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
        currentPage : '',
    }

    render() {
        const {appealList,clientStatusList,size, page, totalElements, dispatch, showModal, regions, deleteModal,
            reklamas, selectItems, showChangeModal, toplamList} = this.props
        const {columns,currentObject, reklamaId, regionId, statusTypeId,currentPage} = this.state

        const openModal = (item,collection) => {
            if (collection){
                this.setState({currentPage : item})
            }else {
                this.setState({currentPage : ""})
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
            e.dataTransfer.setData("text", e.target.id);
        }

        const drop = (e, collection) => {
            e.preventDefault();
            if (e.target.classList.contains("section")) {
                let data = e.dataTransfer.getData("text");
                e.target.appendChild(document.getElementById(data));

                let v = {}
                v.id = this.state.object
                v.clientStatusId = e.target.id
                v.statusEnum = collection
                dispatch(changeAppalTypeAction(v))

            }
        }

        console.log(toplamList)

        return (
            <AdminLayout pathname={this.props.location.pathname}>
                <div className={"container bg-white p-5"}>
                    <h3>Murojaatlar</h3>
                    <hr/>
                    <Container className={"pt-5"}>
                        <Row>
                            {columns ? columns.map(item =>
                                    <Col id={item.id}>
                                        <h4>
                                            {item.title}
                                            {item.id === "COLLECTION" ?
                                                "" :
                                                <Button color={"primary"} className={"ml-5"}
                                                        onClick={() => openModal(item.id, true)}>Qo'shish</Button>
                                            }

                                        </h4>
                                        <hr />
                                        {item.id !== "COLLECTION" ?
                                                clientStatusList ? clientStatusList.map(item2 =>
                                                    item2.clientStatusEnum === item.id ?
                                                        <div className={"section"} onDrop={(e)=>drop(e,item.id)} onDragOver={allowDrop}
                                                             draggable={false} id={item2.id}>
                                                            <h6>{item2.name}</h6>
                                                            <hr/>
                                                            {appealList ? appealList.map(item3 =>
                                                                item3.clientStatus && item3.client && item2.id === item3.clientStatus.id ?
                                                                    <div className={"element"} draggable={true}
                                                                         onDrop={false} onDragStart={drag}
                                                                         id={item3.client ? item3.client.id : ''}>
                                                                        <Link
                                                                            to={"/admin/appeal/" + (item3.client ? item3.client.id : '')}>{item3.client.fullName} </Link> / {item3.client.phoneNumber}
                                                                    </div>
                                                                    : ''
                                                            ) : ''}
                                                        </div>
                                                        : ''
                                                ) : ''
                                            :
                                            toplamList ? toplamList.map(itemt =>
                                                <div className={"section"} onDrop={(e)=>drop(e, item.id)} onDragOver={allowDrop}
                                                     draggable={false} id={itemt.id}>
                                                    <h6><Link to={"/admin/appeal/toplam/"+itemt.id}>{itemt.name}</Link> - {itemt.courseName +" - " + itemt.time}</h6>
                                                    <hr />
                                                    Ustoz : {itemt.teacherName} <br />
                                                    Dars kunlari : {itemt.weekdays ? itemt.weekdays.map(item => item +", ") : ''} <br />
                                                    Murojaatlar : {itemt.soni} <br />
                                                </div>
                                            ): ''
                                        }
                                    </Col>
                            ) : ''}
                        </Row>
                    </Container>
                </div>


                <Modal id={""} isOpen={showModal} toggle={openModal} className={""} size={"md"}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={()=>openModal("",false)} charCode="X">
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


