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
    TabContent,
    TabPane
} from "reactstrap";
import {AvForm, AvField, AvRadioGroup, AvRadio} from "availity-reactstrap-validation";
import {
    deleteStudentAction, downloadFileAction, downloadStudentFileAction, getDebtorsAction,
    getRegionsAction, getStudentsAction, getStudentsBySearchAction,
    saveStudentAction, toChangeStatusAction,
    uploadFileAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {DeleteIcon, GlobusIcon} from "../../component/Icons";
import AdminLayout from "../../component/AdminLayout";
import moment from 'moment';
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import {formatPhoneNumber} from "../../utils/addFunctions";
import Select from "react-select";


class Student extends Component {
    componentDidMount() {
        this.props.dispatch(getRegionsAction())
        this.props.dispatch(getStudentsAction({page: 0, size: this.props.size, type: "DEFAULT"}))
    }

    state = {
        showModal: false,
        currentObject: "",
        secondPage: true,
        specs: '',
        type: '',
        activeTab: "DEFAULT",
    }

    handlePageChange(pageNumber) {
        if (this.state.secondPage) {
            this.props.dispatch(getStudentsAction({
                page: (pageNumber - 1),
                size: this.props.size,
                type: this.state.activeTab
            }))
        } else {
            this.props.dispatch(getDebtorsAction(({page: (pageNumber - 1), size: this.props.size})))
        }
    }

    render() {
        const {currentObject, activeTab} = this.state;
        const {
            page,
            size,
            totalElements,
            students,
            dispatch,
            showModal,
            deleteModal,
            regions, selectDebtors,
            toArchiveModal,
            toActiveModal,
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
        const openFiltrDebtors = (item) => {
            this.setState({currentObject: item})
            if (this.state.secondPage) {
                dispatch(getDebtorsAction({page: 0, size: size}))
            } else {
                dispatch(getStudentsAction({page: 0, size: size, type: activeTab}))
            }
            this.setState({secondPage: !this.state.secondPage})
        }
        const openStudentInfo = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: 'updateState',
                payload: {}
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
            dispatch(deleteStudentAction(item))
        }
        const multiChange = (e, v) => {
            let specList = []
            for (let i = 0; i < e.length; i++) {
                specList.push(e[i].value)
            }
            this.setState({specs: specList})
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
                birthDate: moment(v.birthDate).format('YYYY-MM-DD').toString(),
            }
            dispatch(saveStudentAction(studentDto))
        }
        const uploadImg = (e) => {
            this.props.dispatch(uploadFileAction(e.target.files[0]))
        }
        const downloadExcel = (e, v) => {
            dispatch(downloadStudentFileAction(v))
        }

        ////////////////////
        const a = (tab) => {
            this.setState({activeTab: tab})
        }
        const toggle = (tab) => {
            this.setState({activeTab: tab})
            this.setState({type: tab})
            dispatch(getStudentsAction({page: 0, size: this.props.size, type: tab}))
        }
        const openToArchive = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    toArchiveModal: !toArchiveModal
                }
            })
        }
        const openToActive = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    toActiveModal: !toActiveModal
                }
            })
        }
        const ItemChangeStatus = (item) => {
            dispatch(toChangeStatusAction({
                studentId: item.id,
                status: activeTab === "DEFAULT" ? "ARCHIVE" : "DEFAULT"
            }))
        }
        //  Written By Muhammadamin
        const searchStudent = (e, v) => {
            let value = document.getElementById("searchStudent").value;
            if (value.length === 0) {
                this.props.dispatch(getStudentsAction({page: 0, size: this.props.size, type: "DEFAULT"}))
            }
            dispatch(getStudentsBySearchAction({name: value}));
        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                {this.state.secondPage ?
                    <div className={"flex-column container"}>
                        <h1>Talablar</h1>
                        <div align={"right"}><Button color={"success"} onClick={openModal}
                                                     className={"mb-2 add-button px-4"}>Yangisini qo'shish</Button>
                        </div>
                        <Nav tabs>
                            <NavItem
                                className={activeTab === 'DEFAULT' ? "tab-item-style-active" : "tab-item-style-default"}>
                                <NavLink
                                    onClick={() => {
                                        toggle('DEFAULT');
                                    }}
                                >
                                    Faol talabalar
                                </NavLink>
                            </NavItem>
                            <NavItem
                                className={activeTab === 'ARCHIVE' ? "tab-item-style-active" : "tab-item-style-default"}>
                                <NavLink
                                    onClick={() => {
                                        toggle('ARCHIVE');
                                    }}
                                >
                                    Arxiv talabalar
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <input type={"search"} name={"studentSearch"} id={"searchStudent"}
                                       className={"form-control"}
                                       onChange={searchStudent}/>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="DEFAULT">
                                <div className={"w-100"}>
                                    <div className="w-75">
                                        <div align={"right"} className={"mb-1"}>
                                            <Button color={"btn btn-outline-info"} size={"sm"}
                                                    className={"rounded"}
                                                    onClick={openFiltrDebtors}>Qarzdorlar</Button>
                                            <Button color={"btn btn-outline-info rounded"} size={"sm"}
                                                    className={"btn mx-2 border-none rounded"}
                                                    onClick={downloadExcel}>
                                                <span className={"icon icon-download"}></span></Button>
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
                                            {
                                                students ? students.map((item, i) =>
                                                    <tr key={i} className={"table-tr"}>
                                                        <td>{page > 0 ? page * size + i + 1 : i + 1}</td>
                                                        <td><Link className={"text-dark"}
                                                                  to={"/admin/student/" + (item.id)}>{item.fullName}</Link>
                                                        </td>
                                                        <td>
                                                            {item.phoneNumber && item.phoneNumber.length === 9 ? formatPhoneNumber(item.phoneNumber) : item.phoneNumber}
                                                        </td>
                                                        <td>
                                                            <Button className={"table-icon"}
                                                                    onClick={() => openToArchive(item)}>
                                                                <GlobusIcon/>
                                                            </Button>
                                                            <Button className="table-icon"
                                                                    onClick={() => openDeleteModal(item)}>
                                                                <DeleteIcon/>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ) : ''
                                            }
                                            </tbody>
                                        </Table>
                                        <div align={"center"}>
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
                                </div>
                            </TabPane>
                            <TabPane tabId="ARCHIVE">
                                <div className={"w-100"}>
                                    <div className="w-75">
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
                                            {
                                                students ? students.map((item, i) =>
                                                    <tr key={i} className={"table-tr"}>
                                                        <td>{page > 0 ? page * size + i + 1 : i + 1}</td>
                                                        <td><Link className={"text-dark"}
                                                                  to={"/admin/student/" + (item.id)}>{item.fullName}</Link>
                                                        </td>
                                                        <td>
                                                            {item.phoneNumber && item.phoneNumber.length === 9 ? formatPhoneNumber(item.phoneNumber) : item.phoneNumber}
                                                        </td>
                                                        <td>
                                                            <Button className={"table-info"}
                                                                    onClick={() => openToActive(item)}>
                                                                <GlobusIcon/>
                                                            </Button>
                                                            <Button className="table-icon"
                                                                    onClick={() => openDeleteModal(item)}>
                                                                <DeleteIcon/>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ) : ''
                                            }
                                            </tbody>
                                        </Table>
                                        <div align={"center"}>
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
                                </div>
                            </TabPane>
                        </TabContent>
                    </div>
                    :
                    <div className={"flex-column container"}>
                        <h1>Qazdorlar</h1>
                        <Button color={"primary mt-5"} onClick={openFiltrDebtors}>Talabalar</Button>
                        <Table className={"table-style w-75"}>
                            <thead className={""}>
                            <tr className={""}>
                                <th>No</th>
                                <th>IsmI</th>
                                <th>Telefon</th>
                                <th>Uy Telefon</th>
                                <th>Manzil</th>
                                <th>Qarzi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectDebtors ? selectDebtors.map((item, i) =>
                                <tr key={i} className={"table-tr"}>
                                    <td>{page > 0 ? page * size + i + 1 : i + 1}</td>
                                    <td><Link className={"text-dark"}
                                              to={"/admin/student/" + (item.id)}>{item.fullName}</Link></td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.parentPhone}</td>
                                    <td>{item.region ? item.region.name : ''}</td>
                                    <td>{item.balans}</td>
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

                }


                <Modal isOpen={toArchiveModal} toggle={() => openToArchive("")} className={""}>
                    <ModalHeader isOpen={toArchiveModal} toggle={() => openToArchive("")}
                                 charCode="X">O'chirish</ModalHeader>
                    <ModalBody>
                        Bu talabani arxiv ro'yxatga qo'shmoqchimisiz 🤨❓
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => openToArchive("")}>Yo'q</Button>
                        <Button color="light" onClick={() => ItemChangeStatus(currentObject)}>Ha</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={toActiveModal} toggle={() => openToActive("")} className={""}>
                    <ModalHeader isOpen={toActiveModal} toggle={() => openToActive("")}
                                 charCode="X">O'chirish</ModalHeader>
                    <ModalBody>
                        Bu talabani faol ro'yxatga qo'shmoqchimisiz 🤨❓
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => openToActive("")}>Yo'q</Button>
                        <Button color="light" onClick={() => ItemChangeStatus(currentObject)}>Ha</Button>
                    </ModalFooter>
                </Modal>

                <Modal id={"allModalStyle"} isOpen={showModal} toggle={openModal} className={""}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            {currentObject && currentObject.id ? "Talabani tahrirlash" : "Yangi talaba qo'shish"}
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
                                    errorMessage="telefon raqam uzunligi 9 ta bo'lishi shart"
                                    validate={{
                                        required: {value: true},
                                        pattern: {value: "^[0-9]+$"},
                                        minLength: {value: 9},
                                        maxLength: {value: 9}
                                    }}
                                    label={"Telefon raqam"} name={"phoneNumber"} className={"form-control"}
                                    placeholer={"991234567"} required/>
                                <AvField
                                    defaultValue={currentObject ? currentObject.parentPhone : ""}
                                    type={"text"}
                                    errorMessage="telefon raqam uzunligi 9 ta bo'lishi shart"
                                    validate={{
                                        pattern: {value: "^[0-9]+$"},
                                        minLength: {value: 9},
                                        maxLength: {value: 9}
                                    }}
                                    label={"Ota-onasining telefon raqami"} name={"parentPhone"}
                                    className={"form-control"}
                                    placeholer={"991234567"}/>
                                <AvField
                                    type={"date"}
                                    defaultValue={currentObject && currentObject.birthDate ? moment(currentObject.birthDate).format('YYYY-MM-DD')
                                        : ""}
                                    label={"Tug'ilgan sana"} name={"birthDate"} className={"form-control"}
                                    required/>
                                <AvField className={'form-control'} label={'Hudud:'} type="select"
                                         name="regionId"
                                         defaultValue={currentObject && currentObject.region ? currentObject.region.id : "0"}>
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
            </AdminLayout>
        );
    }

}

Student.propTypes = {}


export default connect((
    {
        app: {
            page,
            size,
            totalElements,
            students,
            loading,
            courseCategories,
            showModal,
            specializationDto,
            deleteModal,
            selectDebtors,
            selectItems,
            spec,
            selectItemsFromSpec,
            regions,
            attachmentId,
            teachers,
            readModal,
            teacherDto,
            toArchiveModal,
            toActiveModal,
        }
        ,
    }
    ) => (
        {
            page,
            size,
            selectDebtors,
            totalElements,
            students,
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
            toArchiveModal,
            toActiveModal,
        }
    )
)(Student);
