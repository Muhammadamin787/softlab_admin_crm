import React, {Component} from 'react';
import {
    Button,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    Table, TabPane
} from "reactstrap";
import {AvForm, AvField, AvCheckboxGroup, AvCheckbox} from "availity-reactstrap-validation";
import {
    changeGroupStatusActions, deleteGroupAction, getCoursesAction, getGroupsAction,
    getRoomListAction, getTeachersForSelectAction, saveGroupAction,
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import AdminLayout from "../../component/AdminLayout";
import {
    DeleteIcon,
    GlobusIcon,
} from "../../component/Icons";
import moment from "moment";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";

class Group extends Component {

    componentDidMount() {
        this.props.dispatch(getGroupsAction({page: 0, size: this.props.size, type: "ACTIVE"}))
        this.props.dispatch(getRoomListAction())
        this.props.dispatch(getCoursesAction())
        this.props.dispatch(getTeachersForSelectAction())
    }

    state = {
        showModal: false,
        currentObject: "",
        selectRegion: [],
        selectParentRegion: "",
        showOptionDiv: false,
        parentRegionDisable: false,
        type: '',
        activeTab: "ACTIVE",
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getGroupsAction({page: (pageNumber - 1), size: this.props.size, type: this.state.type}))
    }

    render() {
        const {currentObject, activeTab,} = this.state;
        const {
            page,
            size,
            totalElements,
            dispatch,
            showModal,
            deleteModal,
            groups,
            teachers,
            getItems,
            archiveGroupModal,
            activeGroupModal,
            rooms,
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
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    deleteModal: !deleteModal
                }
            })
        }

        const deleteItem = (item) => {
            dispatch(deleteGroupAction({...item}))
        }

        const saveItem = (e, v) => {

            v.finishDate = moment(v.finishDate).format('DD/MM/YYYY hh:mm:ss').toString()
            v.startDate = moment(v.startDate).format('DD/MM/YYYY hh:mm:ss').toString()
            dispatch(saveGroupAction(v))
        }

        ///////////////////////////////////////// Change status

        const a = (tab) => {
            this.setState({activeTab: tab})
        }
        const toggle = (tab) => {
            this.setState({activeTab: tab})
            this.setState({type: tab})
            dispatch(getGroupsAction({page: 0, size: this.props.size, type: tab}))
        }

        const openToArchive = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    archiveGroupModal: !archiveGroupModal
                }
            })
        }
        const openToActive = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    activeGroupModal: !activeGroupModal
                }
            })
        }
        const changeStatus = (item) => {
            dispatch(changeGroupStatusActions({
                groupId: item.id,
                status: activeTab === "ACTIVE" ? "ARCHIVE" : "ACTIVE"
            }))
        }

        return (
            <AdminLayout pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h1>Guruhlar</h1>
                    <div align={"right"}>
                        <Button color={"success"} onClick={openModal} className={"mb-2 add-button px-4"}>Yangisini
                            qo'shish
                        </Button>
                    </div>
                    <Nav tabs>
                        <NavItem
                            className={activeTab === 'ACTIVE' ? "tab-item-style-active" : "tab-item-style-default"}>
                            <NavLink
                                onClick={() => {
                                    toggle('ACTIVE');
                                }}
                            >
                                Faol Guruhlar
                            </NavLink>
                        </NavItem>
                        <NavItem
                            className={activeTab === 'ARCHIVE' ? "tab-item-style-active" : "tab-item-style-default"}>
                            <NavLink
                                onClick={() => {
                                    toggle('ARCHIVE');
                                }}
                            >
                                Arxiv Guruhlar
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="ACTIVE">
                            <Table className={"table-style"}>
                                <thead className={""}>
                                <tr className={""}>
                                    <td>T/r</td>
                                    <td>Nomi</td>
                                    <td>Kurs nomi</td>
                                    <td>O'qituvchi</td>
                                    <td>Kunlari</td>
                                    <td>Dars sanalari</td>
                                    <td>Amal</td>
                                </tr>
                                </thead>
                                <tbody>
                                {groups && groups.length > 0 ? groups.map((item, i) =>
                                    item.active ?
                                        <tr key={i} className={"table-tr"}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <Link className={"text-dark"} to={"/admin/group/" + (item.id)}>
                                                    {item.name}
                                                </Link>
                                            </td>
                                            <td>{item.courseName}</td>
                                            <td>{item.teacherName}</td>
                                            <td>
                                                {item.weekdays && item.weekdays.length > 0 ? item.weekdays.map((week) =>
                                                    <span>{week}, </span>) : ""}
                                                <br/>{item.startTime + " - " + item.finishTime}</td>
                                            <td>{
                                                moment(item.startDate).format("DD-MM-yyyy") + " -- " +
                                                moment(item.finishDate).format("DD-MM-yyyy")
                                            }</td>
                                            <td>
                                                <Button className={"table-info"}
                                                        onClick={() => openToArchive(item)}>
                                                    <GlobusIcon/>
                                                </Button>
                                            </td>
                                            <td>
                                                <Button className="table-icon" onClick={() => openDeleteModal(item)}>
                                                    <DeleteIcon/>
                                                </Button>
                                            </td>
                                        </tr>
                                        :
                                        ''
                                ) : "Guruhlar mavjud emas"}
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
                        </TabPane>
                        <TabPane tabId="ARCHIVE">
                            <Table className={"table-style"}>
                                <thead className={""}>
                                <tr className={""}>
                                    <td>T/r</td>
                                    <td>Nomi</td>
                                    <td>Kurs nomi</td>
                                    <td>O'qituvchi</td>
                                    <td>Kunlari</td>
                                    <td>Dars sanalari</td>
                                    <td>Amal</td>
                                </tr>
                                </thead>
                                <tbody>
                                {groups && groups.length > 0 ? groups.map((item, i) =>
                                    item.active ? ""
                                        :
                                        <tr key={i} className={"table-row-data"}>
                                            <td>{i + 1}</td>
                                            <td>
                                                <Link className={"text-dark"} to={"/admin/group/" + (item.id)}>
                                                    {item.name}
                                                </Link>
                                            </td>
                                            <td>{item.courseName}</td>
                                            <td>{item.teacherName}</td>
                                            <td>
                                                {item.weekdays && item.weekdays.length > 0 ? item.weekdays.map((week) =>
                                                    <span>{week}, </span>) : ""}
                                                <br/>{item.startTime + " - " + item.finishTime}</td>
                                            <td>{
                                                moment(item.startDate).format("DD-MM-yyyy") + " -- " +
                                                moment(item.finishDate).format("DD-MM-yyyy")
                                            }</td>
                                            <td>
                                                <Button className={"table-info"}
                                                        onClick={() => openToActive(item)}>
                                                    <GlobusIcon/>
                                                </Button>
                                            </td>
                                            <td>
                                                <Button className="table-icon" onClick={() => openDeleteModal(item)}>
                                                    <DeleteIcon/>
                                                </Button>
                                            </td>
                                        </tr>
                                ) : "Guruhlar mavjud emas"}
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
                        </TabPane>
                    </TabContent>

                    <Modal isOpen={archiveGroupModal} toggle={() => openToArchive("")} className={""}>
                        <ModalHeader isOpen={archiveGroupModal} toggle={() => openToArchive("")}
                                     charCode="X">O'chirish</ModalHeader>
                        <ModalBody>
                            Bu Guruhni Arxiv ro'yxatga Qo'shmoqchimisiz 🤨❓
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => openToArchive("")}>Yo'q</Button>
                            <Button color="light" onClick={() => changeStatus(currentObject)}>Ha</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={activeGroupModal} toggle={() => openToActive("")} className={""}>
                        <ModalHeader isOpen={activeGroupModal} toggle={() => openToActive("")}
                                     charCode="X">O'chirish</ModalHeader>
                        <ModalBody>
                            Bu Guruhni Active ro'yxatga Qo'shmoqchimisiz 🤨❓
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => openToActive("")}>Yo'q</Button>
                            <Button color="light" onClick={() => changeStatus(currentObject)}>Ha</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                        {console.log(currentObject)}
                        <AvForm className={""} onValidSubmit={saveItem}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject && currentObject.id ? "Tahrirlash" : "Qo'shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                             label={"Nomi"} name={"name"} className={"form-control"}
                                             placeholer={"nomi"} required/>
                                    <AvField className={'form-control'} label={'Kurs:'} type="select"
                                             name="courseId"
                                             defaultValue={currentObject && currentObject.courseId ? currentObject.courseId : "0"}>
                                        <option key={0} value={"0"}>Kursni tanlang</option>
                                        {getItems ? getItems.map((item, i) =>
                                            <option key={i} value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>
                                    <AvField className={'form-control'} label={"O'qituvchi:"} type="select"
                                             name="teacherId"
                                             defaultValue={currentObject && currentObject.teacherId ? currentObject.teacherId : "0"}>
                                        <option key={0} value={"0"}>O'qituvchini tanlang</option>
                                        {teachers && teachers.length > 0 ? teachers.map((item, i) =>
                                            <option key={i} value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>

                                    <AvCheckboxGroup inline name="weekdays" label="Dars kunlari" required>
                                        <AvCheckbox label="Dush" value="MONDAY"/>
                                        <AvCheckbox label="Sesh" value="TUESDAY"/>
                                        <AvCheckbox label="Chor" value="WEDNESDAY"/>
                                        <AvCheckbox label="Pay" value="THURSDAY"/>
                                        <AvCheckbox label="Ju" value="FRIDAY"/>
                                        <AvCheckbox label="Shan" value="SATURDAY"/>
                                        <AvCheckbox label="Yak" value="SUNDAY"/>
                                    </AvCheckboxGroup>

                                    <AvField className={'form-control'} label={"Xona:"} type="select"
                                             name="roomId"
                                             defaultValue={currentObject && currentObject.roomId ? currentObject.roomId : "0"}>
                                        <option key={0} value={"0"}> tanlang</option>
                                        {rooms && rooms.length > 0 ? rooms.map((item, i) =>
                                            <option key={i} value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>
                                    <Row>
                                        <Col md={6}>
                                            <AvField type="time"
                                                     defaultValue={currentObject ? currentObject.startTime : false}
                                                     label={"Boshlanish vaqti"} name={"startTime"}/>
                                        </Col>
                                        <Col md={6}>
                                            <AvField type="time"
                                                     defaultValue={currentObject ? currentObject.finishTime : false}
                                                     label={"Tugash vaqti"} name={"finishTime"}/>
                                        </Col>
                                    </Row>
                                    <AvField type="date"
                                             defaultValue={currentObject ? currentObject.startDate : false}
                                             label={"Kursning boshlanish sanasi"} name={"startDate"}/>
                                    <AvField type="date"
                                             defaultValue={currentObject ? currentObject.finishDate : false}
                                             label={"Kursning tugash sanasi"} name={"finishDate"}/>
                                    <AvField type="checkbox" defaultValue={currentObject ? currentObject.active : false}
                                             label={"Active"} name={"active"}/>
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

Group.propTypes = {};

export default connect(({
                            app: {
                                page,
                                size,
                                totalElements,
                                teachers,
                                getItems,
                                rooms,
                                groups,
                                loading,
                                regions,
                                showModal,
                                deleteModal,
                                selectItems,
                                archiveGroupModal,
                                activeGroupModal,
                            },
                        }) => ({
        page,
        size,
        totalElements,
        getItems, teachers,
        groups, rooms,
        loading, regions, showModal, deleteModal, selectItems, archiveGroupModal,
        activeGroupModal,
    })
)(Group);
//
