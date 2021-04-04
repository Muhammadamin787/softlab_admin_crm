import React, {Component} from 'react';
import {
    ModalHeader,
    Modal,
    Button,
    ModalBody,
    Table,
    ModalFooter,
    Nav,
    NavItem,
    NavLink,
    TabContent, TabPane
} from "reactstrap";
import {AvForm, AvField, AvRadioGroup, AvRadio} from "availity-reactstrap-validation";
import {
    deleteTeacherAction, downloadTeacherFileAction,
    getRegionsAction, getStudentsAction, getStudentsBySearchAction,
    getTeachersAction, getTeachersBySearchAction,
    saveTeacherAction, toChangeTeacherStatusAction,
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {DeleteIcon, GlobusIcon} from "../../component/Icons";
import AdminLayout from "../../component/AdminLayout";
import moment from "moment";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import {formatPhoneNumber} from "../../utils/addFunctions";

class Teacher extends Component {
    componentDidMount() {
        this.props.dispatch(getRegionsAction())
        this.props.dispatch(getTeachersAction({page: 0, size: this.props.size, type: "ACTIVE"}))
    }

    state = {
        showModal: false,
        currentObject: "",
        secondPage: true,
        specs: '',
        type: '',
        activeTab: "ACTIVE",
    }

    handlePageChange(pageNumber) {
        this.props.dispatch(getTeachersAction({page: (pageNumber - 1), size: this.props.size, type: this.state.type}))
    }

    render() {
        const {currentObject, activeTab} = this.state;
        const {
            page,
            size,
            totalElements,
            dispatch,
            attachmentId,
            showModal,
            deleteModal,
            teachers,
            regions,
            archiveModal,
            activeModal,
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
            dispatch(deleteTeacherAction(item))
            this.setState({showDeleteModal: !this.state.showDeleteModal})
        }
        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
            }
            let teacherDto;
            teacherDto = {
                teacherName: v.teacherName,
                phoneNumber: v.phoneNumber,
                gender: v.gender,
                regionId: v.regionId,
                description: v.description,
                birthDate: moment(v.birthDate).format('DD-MM-YYYY').toString(),
            }
            // teacherDto.id = currentObject.id
            dispatch(saveTeacherAction(teacherDto))
        }
        const downloadTecherFile = (e, v) => {
            dispatch(downloadTeacherFileAction(v))
        }

        const toggle = (tab) => {
            this.setState({activeTab: tab})
            this.setState({type: tab})
            dispatch(getTeachersAction({page: 0, size: this.props.size, type: tab}))
        }
        const openToArchive = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    archiveModal: !archiveModal
                }
            })
        }
        const openToActive = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    activeModal: !activeModal
                }
            })
        }
        const ItemChangeStatus = (item) => {
            dispatch(toChangeTeacherStatusAction({
                teacherId: item.id,
                status: activeTab === "ACTIVE" ? "ARCHIVE" : "ACTIVE"
            }))
        }

        ////// Teacher Search

        const searchTeacher = () => {
            let value = document.getElementById("searchTeacher").value;
            if (value.length === 0) {
                this.props.dispatch(getTeachersAction({page: 0, size: this.props.size, type: "ACTIVE"}))
            }
            dispatch(getTeachersBySearchAction({name: value}));
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h1>O'qituvchilar</h1>
                    <div align={"right"}>
                        <Button size={"lg"} color={"success"} onClick={openModal} className={"mb-2 add-button px-4"}>Yangisini
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
                                Faol O'qituvchilar
                            </NavLink>
                        </NavItem>
                        <NavItem
                            className={activeTab === 'ARCHIVE' ? "tab-item-style-active" : "tab-item-style-default"}>
                            <NavLink
                                onClick={() => {
                                    toggle('ARCHIVE');
                                }}
                            >
                                Arxiv O'qituvchilar
                            </NavLink>
                        </NavItem>
                        <NavItem align={"right"}>
                            <input type={"search"} name={"teacherSearch"} id={"searchTeacher"}
                                   className={"form-control"} placeholder={"Qidirish..."}
                                   onChange={searchTeacher}/>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="ACTIVE">
                            <div className={"w-100"}>
                                <div className="w-75">
                                    <div align={"right"} className="mb-1">
                                        <Button color={"btn btn-outline-info rounded"} size={"sm"}
                                                className={"btn mx-2 border-none rounded"}
                                                onClick={downloadTecherFile}>
                                            <span className={"icon icon-download"}/>
                                        </Button>
                                    </div>
                                    <Table className={"table-style w-100"}>
                                        <thead className={""}>
                                        <tr className={""}>
                                            <th>No</th>
                                            <th>Ism</th>
                                            <th>Telefon</th>
                                            <th colSpan="2">Amal</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {teachers ? teachers.map((item, i) =>
                                            <tr key={i} className={"table-tr"}>
                                                <td>{page > 0 ? (size * page) + i + 1 : i + 1}</td>
                                                <td>
                                                    <Link className={"text-dark"} to={"/admin/teacher/" + (item.id)}>
                                                        {item.teacherName}
                                                    </Link>
                                                </td>
                                                <td>{formatPhoneNumber(item.phoneNumber)}</td>
                                                <td>
                                                    <Button className={"table-info"}
                                                            onClick={() => openToArchive(item)}>
                                                        <GlobusIcon/>
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button className="table-icon"
                                                            onClick={() => openDeleteModal(item)}>
                                                        <DeleteIcon/>
                                                    </Button>
                                                </td>
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
                                </div>
                            </div>
                        </TabPane>
                        <TabPane tabId="ARCHIVE">
                            <div className={"w-100"}>
                                <div className="w-75">
                                    <div align={"right"} className="mb-1">
                                        <Button color={"btn btn-outline-info rounded"} size={"sm"}
                                                className={"btn mx-2 border-none rounded"}
                                                onClick={downloadTecherFile}>
                                            <span className={"icon icon-download"}/>
                                        </Button>
                                    </div>
                                    <Table className={"table-style w-100"}>
                                        <thead className={""}>
                                        <tr className={""}>
                                            <th>No</th>
                                            <th>Ism</th>
                                            <th>Telefon</th>
                                            <th colSpan="2">Amal</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {teachers ? teachers.map((item, i) =>
                                            <tr key={i} className={"table-tr"}>
                                                <td>{page > 0 ? (size * page) + i + 1 : i + 1}</td>
                                                <td>
                                                    <Link className={"text-dark"} to={"/admin/teacher/" + (item.id)}>
                                                        {item.teacherName}
                                                    </Link>
                                                </td>
                                                <td>{formatPhoneNumber(item.phoneNumber)}</td>
                                                <td>
                                                    <Button className={"table-info"}
                                                            onClick={() => openToActive(item)}>
                                                        <GlobusIcon/>
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button className="table-icon"
                                                            onClick={() => openDeleteModal(item)}>
                                                        <DeleteIcon/>
                                                    </Button>
                                                </td>
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
                                </div>
                            </div>
                        </TabPane>
                    </TabContent>

                    <Modal isOpen={archiveModal} toggle={() => openToArchive("")} className={""}>
                        <ModalHeader isOpen={archiveModal} toggle={() => openToArchive("")}
                                     charCode="X">O'chirish</ModalHeader>
                        <ModalBody>
                            Bu O`qituvchini Arxiv ro'yxatga Qo'shmoqchimisiz 🤨❓
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => openToArchive("")}>Yo'q</Button>
                            <Button color="light" onClick={() => ItemChangeStatus(currentObject)}>Ha</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={activeModal} toggle={() => openToActive("")} className={""}>
                        <ModalHeader isOpen={activeModal} toggle={() => openToActive("")}
                                     charCode="X">O'chirish</ModalHeader>
                        <ModalBody>
                            Bu Talabani Active ro'yxatga Qo'shmoqchimisiz 🤨❓
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => openToActive("")}>Yo'q</Button>
                            <Button color="light" onClick={() => ItemChangeStatus(currentObject)}>Ha</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                        <AvForm className={""} onValidSubmit={saveItem}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject && currentObject.id ? "Tahrirlash" : "Yangi o'qituvchi qo'shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100 modal-form"}>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.teacherName : ""}
                                        type={"text"}
                                        label={"FISH"} name={"teacherName"} className={"form-control"}
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
                                        defaultValue={currentObject ? moment(currentObject.birthDate).format('DD-MM-YYYY')
                                            : ""}
                                        label={"Tug'ilgan sana"} name={"birthDate"} className={"form-control"}
                                        />
                                    <AvField className={'form-control'} label={'Hudud:'} type="select"
                                             name="regionId"
                                             defaultValue={currentObject ? currentObject.regionName : "0"}>
                                        <option key={0} value={"0"}>Ota hududni tanlang</option>
                                        {regions ? regions.map((item, i) =>
                                            <option key={i} value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>
                                    <AvRadioGroup name="gender"
                                                  defaultValue={currentObject ? currentObject.gender : ""}
                                                  label="Jins" required
                                                  errorMessage="Birini tanlang!">
                                        <AvRadio label="Erkak" value="MALE"/>
                                        <AvRadio label="Ayol" value="FEMALE"/>
                                    </AvRadioGroup>
                                    <AvField
                                        defaultValue={currentObject ? currentObject.description : ""}
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

Teacher.propTypes = {};

export default connect((
    {
        app: {
            page,
            size,
            totalElements,
            totalPages,
            loading,
            courseCategories,
            showModal,
            specializationDto,
            secondPage,
            deleteModal,
            selectItems,
            spec,
            selectItemsFromSpec,
            regions,
            attachmentId,
            teachers,
            readModal,
            teacherDto,
            archiveModal,
            activeModal,
        },
    }) => ({
        page,
        size,
        totalElements,
        totalPages,
        secondPage,
        specializationDto,
        loading,
        courseCategories,
        showModal,
        deleteModal,
        selectItems,
        spec,
        selectItemsFromSpec,
        regions,
        attachmentId,
        readModal,
        teachers,
        teacherDto,
        archiveModal,
        activeModal,
    })
)(Teacher);
