import React, {Component} from "react";
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
    deleteOneAppealAction,
    getAppealListAllAction,
    getClientStatusListAction, getCourseListForSelectAction,
    getOneAppealForEdit,
    getOneToplamAction,
    getRegionsAction,
    getReklamaAction, getRoomListAction,
    getTeachersForSelectAction,
    getToplamListForSelectAction, makeGroupByToplamAction,
    makeStudentByAppealAction,
    saveAppealAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AvCheckbox, AvCheckboxGroup, AvField, AvForm, AvRadio, AvRadioGroup} from "availity-reactstrap-validation";
import Select from "react-select";
import {formatPhoneNumber, formatSelectList, sortByEnumType, sortList} from "../../utils/addFunctions";
import moment from "moment";
import {toast} from "react-toastify";

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
        curDropdownID: '',
        toplamDropdown: '',
        editModal: false
    }
    isOpen = (id) => {
        return this.state.curDropdownID === id
    }
    isGroupModal = (id) => {
        return this.state.toplamDropdown === id
    }
    toplamDropdownToggle = (item) => {
        this.setState({toplamDropdown: item})
    }
    dropdownToggle = (item) => {
        this.setState({curDropdownID: item})
    }

    render() {
        const {
            history,
            appealList, clientStatusList, dispatch, showModal, regions, deleteModal,
            reklamas, selectItems, toplamList, loading, currentItem, secondPage, teachers, getItems, checkboxes, rooms
        } = this.props
        const {currentObject, reklamaId, regionId, statusTypeId, currentPage, dropdownOpen, curDropdownID} = this.state

        const openModal = (item) => {
            this.setState({currentPage: item, editModal: false})
            dispatch({
                type: "updateState",
                payload: {
                    currentItem: '',
                    showModal: !showModal
                }
            })
        }
        const deleteItem = (item) => {
            dispatch(deleteOneAppealAction({id: item}))
        }
        const openDeleteModal = (item) => {
            console.log(item);
            this.setState({currentObject: item.id})
            dispatch({
                type: "updateState",
                payload: {
                    deleteModal: !deleteModal
                }
            })
        }

        const openEditModal = (item, statusEnum) => {
            if (item.length > 0) {
                dispatch(getOneAppealForEdit({id: item}))
                this.setState({currentPage: statusEnum, editModal: true})
            } else {
                dispatch({
                    type: "updateState",
                    payload: {
                        showModal: false
                    }
                })
            }
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
            if (this.state.editModal) {
                v.id = (currentItem && currentItem.id)
                if (!reklamaId)
                    v.reklamaId = currentItem.reklamaId
                if (!regionId)
                    v.regionId = currentItem.regionId
            }
            v.birthDate = v.birthDate ? moment(v.birthDate).format('DD-MM-YYYY').toString() : ""
            v.statusEnum = currentPage
            dispatch(saveAppealAction(v));
        }
        const makeStudent = (id) => {
            dispatch(makeStudentByAppealAction({id: id, history: history}));
        }
        const makeGroupModal = (id) => {
            if (id && id > 0) {
                dispatch(getTeachersForSelectAction())
                dispatch(getCourseListForSelectAction())
                dispatch(getRoomListAction())
                dispatch(getOneToplamAction({id: id}))
            } else {
                dispatch({
                    type: "updateState",
                    payload: {
                        secondPage: false
                    }
                })
            }
        }
        const saveMakeGroup = (e, v) => {
            console.log(v);
            if (currentItem && v.roomId !== 0) {
                v.id = currentItem.id
                v.teacherId = this.state.teacherId
                v.courseId = this.state.courseId
                if (!this.state.teacherId) {
                    v.teacherId = currentItem.teacherId
                }
                if (!this.state.courseId)
                    v.courseId = currentItem.courseId
                if (v.courseId && v.teacherId)
                    dispatch(makeGroupByToplamAction({data: v, history: history}))
            } else {
                toast.warning("Ma'lumotlarni xato kiritdingiz!")
            }
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
            if (e.target.classList.contains('section') || e.target.classList.contains('element')) {
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
            } else {
                dispatch({
                    type: 'updateState',
                    payload: {
                        loading: true
                    }
                })
                dispatch({
                    type: 'updateState',
                    payload: {
                        loading: false
                    }
                })
            }
            this.setState({currentObject: '', object: '', changeLocationType: ''})
        }

        const setToplamCourse = (e) => {
            this.setState({courseId: e.value})
        }
        const changeCheckbox = (e, v) => {
            let newCheckboxes = []
            console.log(v);
            console.log(e);
            // for (let i = 0; i < checkboxes.length; i++) {
            //     if (checkboxes[i]===)
            // }
            // dispatch({})
        }
        const setToplamTeacher = (e) => {
            this.setState({teacherId: e.value})
        }

        return (
            <AdminLayout pathname={this.props.location.pathname}>
                <div className={"container p-1"}>
                    <h2>Murojaatlar</h2>
                    <Container className={"py-3 bg-white px-5"}>
                        <Row id={""}>
                            {appealList && !loading && appealList.length > 0 ? appealList.map((item, i) =>
                                <Col id={item.title}>
                                    <h5 className={"appeal-section mt-2"} onClick={() => openModal(item.title)}>
                                        <span className={"p-2 d-inline-block"}>
                                        {item.title === "COLLECTION" ? "To'plamlar" : item.title === "WAITING" ? "Kutish" : "So'rovlar"}
                                        </span>
                                        <button
                                            className={"float-right px-5 d-inline-block btn btn-default btn-sm"}
                                            onClick={() => openModal(item.title)}>+
                                        </button>
                                    </h5>
                                    <hr/>
                                    {item.sectionDtos && item.sectionDtos.length > 0 ? sortList(item.sectionDtos).map((section, s) =>
                                        <div key={(s + 1) * (i + 1)} className={"section"}
                                             onDrop={(e) => drop(e, item.id)}
                                             onDragOver={allowDrop}
                                             draggable={false} id={section.id + item.title}>
                                            <Row>
                                                <Col md={item.title === "COLLECTION" ? "10" : "12"}>
                                                    <small>{section.name}</small>
                                                </Col>
                                                {item.title === "COLLECTION" ?
                                                    <Col md={"2"}>
                                                        <Dropdown
                                                            className="d-inline"
                                                            id={"show" + section.id + item.title} onMouseOver={() => {
                                                            this.dropdownToggle("show" + section.id + item.title)
                                                        }} onMouseLeave={() => {
                                                            this.dropdownToggle('')
                                                        }} isOpen={this.isOpen("show" + section.id + item.title)}
                                                            toggle={() => {
                                                                this.dropdownToggle("show" + section.id + item.title)
                                                            }}>
                                                            <DropdownToggle className={"btn btn-light text-center"}
                                                                            size={"sm"}>:</DropdownToggle>
                                                            <DropdownMenu>
                                                                <DropdownItem
                                                                    onClick={() => makeGroupModal(section.id)}>Guruh
                                                                    ochish</DropdownItem>
                                                            </DropdownMenu>
                                                        </Dropdown>
                                                    </Col>
                                                    : ""}
                                            </Row>
                                            <hr/>
                                            {section.appealDtos ? section.appealDtos.map((appeal, j) =>
                                                <div key={(j + 1) * (s + 1) * (i + 1)} className={"element"}
                                                     draggable={true}
                                                     onDragStart={drag}
                                                     id={appeal.id}>
                                                    <Row>
                                                        <Col md={"10"}>
                                                            <Link className="small" draggable="false"
                                                                  to={"/admin/appeal/" + (appeal.id)}>{appeal.fullName} </Link> /
                                                            <span
                                                                draggable="false"
                                                                className="small"> {formatPhoneNumber(appeal.phoneNumber)}</span>
                                                        </Col>
                                                        <Col md={"2"}>
                                                            <Dropdown
                                                                draggable="false"
                                                                className="d-inline"
                                                                id={"show" + appeal.id} onMouseOver={() => {
                                                                this.dropdownToggle('show' + appeal.id)
                                                            }} onMouseLeave={() => {
                                                                this.dropdownToggle('')
                                                            }} isOpen={this.isOpen('show' + appeal.id)}
                                                                toggle={() => {
                                                                    this.dropdownToggle('show' + appeal.id)
                                                                }}>
                                                                <DropdownToggle className={"btn btn-light text-center"}
                                                                                size={"sm"}>:</DropdownToggle>
                                                                <DropdownMenu>
                                                                    <DropdownItem
                                                                        onClick={() => makeStudent(appeal.id)}>Talaba
                                                                        qo'shish</DropdownItem>
                                                                    <DropdownItem
                                                                        onClick={() => openEditModal(appeal.id, item.title)}>Tahrirlash</DropdownItem>
                                                                    <hr/>
                                                                    <DropdownItem
                                                                        onClick={() => openDeleteModal(appeal)}>O'chirish</DropdownItem>
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

                <Modal id={"allModalStyle"} isOpen={secondPage} toggle={makeGroupModal} className={""}>
                    <AvForm className={""} onValidSubmit={saveMakeGroup}>
                        <ModalHeader isOpen={secondPage} toggle={openModal} charCode="X">
                            Yangi guruh qo`shish
                        </ModalHeader>
                        <ModalBody>
                            <div className={"w-100 modal-form"}>
                                <AvField defaultValue={currentItem ? currentItem.name : ""} type={"text"}
                                         label={"Nomi"} name={"name"} className={"form-control"}
                                         placeholder={"nomi"} required/>
                                <Select
                                    defaultValue={currentItem && currentItem.courseId ? {
                                        value: currentItem.courseId,
                                        label: (currentItem.courseName)
                                    } : ""}
                                    placeholder="Kursni tanlang..."
                                    name="courseId"
                                    isClearable={true}
                                    isSearchable={true}
                                    options={getItems && getItems.length > 0 && formatSelectList(getItems)}
                                    onChange={setToplamCourse}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                                <AvCheckboxGroup inline name="weekdays" label="Dars kunlari" required>
                                    {/*{console.log(checkboxes)}*/}
                                    <AvCheckbox label="Dush" value="MONDAY"
                                        // checked={checkboxes.some(checkbox => checkbox === "Dush")}
                                        // onChange={(e, v) => changeCheckbox(e, v)}
                                    />
                                    <AvCheckbox label="Sesh" value="TUESDAY"/>
                                    <AvCheckbox label="Chor" value="WEDNESDAY"/>
                                    <AvCheckbox label="Pay" value="THURSDAY"/>
                                    <AvCheckbox label="Ju" value="FRIDAY"/>
                                    <AvCheckbox label="Shan" value="SATURDAY"/>
                                    <AvCheckbox label="Yak" value="SUNDAY"/>
                                </AvCheckboxGroup>
                                <Select defaultValue={currentItem && currentItem.teacherId ? {
                                    value: currentItem.teacherId,
                                    label: (currentItem.teacherName)
                                } : ""}
                                        placeholder="O'qituvchini tanlang..."
                                        name="teacherId"
                                        isClearable={true}
                                        isSearchable={true}
                                        options={teachers && teachers.length > 0 ? formatSelectList(teachers) : []}
                                        onChange={setToplamTeacher}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                />
                                <AvField className={'form-control'} label={"Xona:"} type="select"
                                         name="roomId" required
                                         defaultValue={currentObject && currentObject.roomId ? currentObject.roomId : "0"}>
                                    <option key={0} value={"0"}> tanlang</option>
                                    {rooms && rooms.length > 0 ? rooms.map((item, i) =>
                                        <option key={i} value={item.id}>{item.name}</option>
                                    ) : ""}
                                </AvField>
                                <Row>
                                    <Col md={6}>
                                        <AvField type="time"
                                                 defaultValue={currentItem ? currentItem.time : false}
                                                 label={"Boshlanish vaqti"} name={"startTime"}/>
                                    </Col>
                                    <Col md={6}>
                                        <AvField type="time" required
                                                 defaultValue={currentItem ? currentItem.finishTime : false}
                                                 label={"Tugash vaqti"} name={"finishTime"}/>
                                    </Col>
                                </Row>
                                <AvField type="date" required
                                         defaultValue={currentItem ? currentItem.startDate : false}
                                         label={"Kursning boshlanish sanasi"} name={"startDate"}/>
                                <AvField type="date"
                                         defaultValue={currentItem ? currentItem.finishDate : false}
                                         label={"Kursning tugash sanasi"} name={"finishDate"}/>
                                <AvField type="checkbox" required
                                         defaultValue={currentItem ? currentItem.active : false}
                                         label={"Active"} name={"active"}/>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button color="secondary" onClick={makeGroupModal}>Bekor qilish</Button>
                            <Button color="primary">Saqlash</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>

                <Modal id={""} isOpen={showModal} toggle={openModal} className={""} size={"md"}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={() => openModal("", false)} charCode="X">
                            {this.state.editModal ? "Tahrirlash" : "Yangi qo'shish"}
                        </ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col>
                                    <AvField
                                        defaultValue={currentItem ? currentItem.fullName : ""}
                                        type={"text"}
                                        errorMessage={"Ismni yozish majburiy"}
                                        label={"FISH"} name={"fullName"} className={"form-control"}
                                        placeholer={"nomi"} required/>
                                    <AvField
                                        defaultValue={currentItem ? currentItem.phoneNumber : ""}
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
                                    {currentItem && currentItem.id ? '' :
                                        <Select
                                            defaultValue={currentItem && {
                                                value: currentItem.clientStatusId,
                                                label: (currentItem.statusName)
                                            }}
                                            placeholder="Bo'limni tanlang..."
                                            name="groupId"
                                            isSearchable={true}
                                            options={clientStatusList && clientStatusList.length > 0 && sortByEnumType(clientStatusList, currentPage)}
                                            onChange={setClientStatus}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                        />
                                    }
                                    Jinsi
                                    <AvRadioGroup name="gender"
                                                  defaultValue={currentItem && currentItem.id ? currentItem.gender : ""}
                                                  required
                                                  className={""}
                                                  errorMessage="Birini tanlang!">
                                        <AvRadio label="Erkak" value="MALE"/>
                                        <AvRadio label="Ayol" value="FEMALE"/>
                                    </AvRadioGroup>
                                </Col>
                                <Col>
                                    <AvField
                                        type={"date"}
                                        defaultValue={currentItem && currentItem.id && currentItem.birthDate ? moment(currentItem.birthDate).format('DD-MM-YYYY')
                                            : ""}
                                        label={"Tug'ilgan sana"} name={"birthDate"} className={"form-control"}/>
                                    Hudud
                                    <Select
                                        defaultValue={currentItem && currentItem.regionId && {
                                            value: currentItem.regionId,
                                            label: (currentItem.regionName)
                                        }}
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
                                        defaultValue={currentItem && currentItem.reklamaId && {
                                            value: currentItem.reklamaId,
                                            label: (currentItem.reklamaName)
                                        }}
                                        placeholder="Reklamani tanlang..."
                                        name="groupId"
                                        isSearchable={true}
                                        options={reklamas && reklamas.length > 0 && formatSelectList(reklamas)}
                                        onChange={setClientRekalama}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    <AvField
                                        type={"textarea"}
                                        value={currentItem ? currentItem.description : ""}
                                        label={"Izoh"} name={"description"} className={"form-control"}/>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={openEditModal}>Bekor qilish</Button>
                            <Button color="primary">Saqlash</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>
                <Modal isOpen={deleteModal} toggle={() => openDeleteModal("")} className={""}>
                    <ModalHeader isOpen={deleteModal} toggle={() => openDeleteModal("")}
                                 charCode="x">O'chirish</ModalHeader>
                    <ModalBody>
                        Rostdan ham ushbu elementni o'chirishni istaysizmi?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => openDeleteModal("")}>Yo'q</Button>
                        <Button color="light" onClick={() => deleteItem(currentObject)}>Ha</Button>
                    </ModalFooter>
                </Modal>
            </AdminLayout>
        )
    }

}

export default connect(({
                            app: {
                                currentItem,
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
                                deleteModal, secondPage, checkboxes, rooms, teachers, getItems
                            },
                        }) => ({
        currentItem,
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
        deleteModal, secondPage, checkboxes, rooms, teachers, getItems
    })
)(Card);


