import React, {Component} from 'react';
import {Button, Col, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {
    deleteCourseAction, getCourseCategoriesAction,
    getCoursesAction,
    getDurationTypesAction, saveCourseAction,
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {DeleteIcon, EditIcon, ShowIcon} from "../../component/Icons";

class Course extends Component {
    componentDidMount() {
        this.props.dispatch(getCoursesAction())
        //to do course bo'limlarini hammasini olib kelish, pageablesiz
        this.props.dispatch(getCourseCategoriesAction())
        this.props.dispatch(getDurationTypesAction())

    }

    state = {
        showModal: false,
        currentObject: ""
    }

    render() {
        const {currentObject} = this.state;
        const {
            dispatch,
            showModal,
            deleteModal,
             getItems,
            parentItems,
            courseCategories,
            loading,
            readModal,
            durationTypes
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
        const readMoreModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    readModal: !readModal
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
            dispatch(deleteCourseAction(item))
        }
        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
            }
            dispatch(saveCourseAction(v))
        }
        return (
            <div className={"container"}>
                <h1>Yo'nalishlar</h1>
                <Button color={"success"} onClick={openModal} className={"mb-2"}>Qo'shish</Button>
                <Table>
                    <thead className={"bg-dark text-white"}>
                    <tr>
                        <th>No</th>
                        <th>Nomi</th>
                        <th>Yo'nalish bo'limi</th>
                        <th>Narx</th>
                        <th>Davomiyligi</th>
                        <th>Holati</th>
                        <th colSpan="3">Amal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {getItems && getItems.map((item, i) =>
                        <tr>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.courseCategory && item.courseCategory.name}</td>
                            <td>{item.price} so'm</td>
                            <td>{item.duration + " " + item.durationType.name} </td>
                            <td><input type="checkbox" checked={item.active}/></td>
                            <td><Button onClick={() => readMoreModal(item)}color={"info"}><ShowIcon/></Button></td>
                            <td><Button onClick={() => openModal(item)}color={"warning"}><EditIcon/></Button></td>
                            <td><Button onClick={() => openDeleteModal(item)}color={"danger"}><DeleteIcon/> </Button></td>
                        </tr>
                    )}
                    </tbody>
                </Table>

                <Modal isOpen={showModal} toggle={openModal} className={""}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            {currentObject && currentObject.id ? "Tahrirlash" : "Qo'shish"}
                        </ModalHeader>
                        <ModalBody>
                            <div className={"w-100"}>
                                <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                         label={"Nomi"} name={"name"} className={"form-control"}
                                         placeholer={"nomi"} required/>
                                <AvField className={'form-control'} label={"Yo'nalish bo'limi: "} type="select"
                                         name="courseCategoryId"
                                         defaultValue={currentObject && currentObject.courseCategory
                                         && currentObject.courseCategory.id ? currentObject.courseCategory.id : "0"}>

                                    <option key={0} value={"0"}>Bo'limni tanlang</option>

                                    {courseCategories ? courseCategories.map((item, i) =>
                                        <option key={i} value={item.id}>{item.name}</option>
                                    ) : ""}

                                </AvField>
                                Yo'nalishning davomiyligi
                                <Row>
                                    <Col md={4}>
                                        <AvField defaultValue={currentObject ? currentObject.duration : ""}
                                                 type={"number"}
                                                 label={""} name={"duration"} className={"form-control"}
                                                 placeholer={"e.g, 4"} required/>
                                    </Col>
                                    <Col md={8}>
                                        <AvField className={'form-control'} label={""} type="select"
                                                 name="durationTypeId"
                                                 defaultValue={currentObject &&
                                                 currentObject.duration
                                                 && currentObject.durationType.id ? currentObject.durationType.id : "0"}>

                                            <option key={0} value={"0"}>vaqtni tanlang</option>

                                            {durationTypes ? durationTypes.map((item, i) =>
                                                <option key={i} value={item.id}>{item.name}</option>
                                            ) : ""}

                                        </AvField>
                                    </Col>
                                </Row>

                                <AvField type="number"
                                         defaultValue={currentObject ? currentObject.price : false}
                                         label={"Narx"} name={"price"}/>

                                <AvField type="textarea"
                                         defaultValue={currentObject ? currentObject.description : false}
                                         label={"Izoh"} name={"description"}/>

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
                {/*course batafsil ko'rish uchun*/}
                <Modal isOpen={readModal} toggle={readMoreModal} className={""}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={readModal} toggle={readMoreModal} charCode={"X"}>Batafsil</ModalHeader>
                        <ModalBody>
                            <Row className={"my-3"}>
                                <Col md={4}>Nomi:</Col>
                                <Col md={8}>{currentObject.name}</Col>
                            </Row>
                            <Row className={"my-3"}>
                                <Col md={4}>Yo'nalish bo'limi:</Col>
                                <Col md={8}>{currentObject.courseCategory && currentObject.courseCategory.name}</Col>
                            </Row>
                            <Row className={"my-3"}>
                                <Col md={4}>Narxi:</Col>
                                <Col md={8}>{currentObject.price} so'm</Col>
                            </Row>
                            <Row className={"my-3"}>
                                <Col md={4}>Davomiyligi:</Col>
                                <Col
                                    md={8}>{currentObject.duration + " " + (currentObject.durationType && currentObject.durationType.name)}</Col>
                            </Row>
                            <Row className={"my-3"}>
                                <Col md={4}>Izoh:</Col>
                                <Col
                                    md={8}>{currentObject.description}</Col>
                            </Row>
                            <Row className={"my-3"}>
                                <Col md={4}>Holati:</Col>
                                <Col
                                    md={8}>{currentObject.active ? "Faol" : "NoFaol"}</Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={readMoreModal}>Yopish</Button>
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
                        <Button color="secondary" onClick={() => openDeleteModal("")}>Bekor qilish</Button>
                        <Button color="danger" onClick={() => deleteItem(currentObject)}>O'chirish</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

Course.propTypes = {};

export default connect(({
                            app: {
                                loading,
                                showModal,
                                deleteModal,
                                parentItems,
                                courseCategories,
                                durationTypes,
                                getItems,
                                readModal
                            },
                        }) => ({
        loading, durationTypes, showModal, deleteModal, parentItems, courseCategories, getItems, readModal
    })
)(Course);
