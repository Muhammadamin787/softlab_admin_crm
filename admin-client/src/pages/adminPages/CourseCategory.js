import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {
    deleteCourseCategoryAction,
    getCourseCategoriesAction,
    saveCourseCategoryAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import AdminLayout from "../../component/AdminLayout";

class CourseCategory extends Component {
    componentDidMount() {
        this.props.dispatch(getCourseCategoriesAction())
    }

    state = {
        showModal: false,
        currentObject: ""
    }

    render() {
        const {currentObject} = this.state;
        const {dispatch, showModal, deleteModal, loading, courseCategories} = this.props;
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
            dispatch(deleteCourseCategoryAction(item))
        }
        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
                console.clear();
                console.log(v);
            }
            dispatch(saveCourseCategoryAction(v))
        }
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h1>Kurs kategoriyalar</h1>
                    <Button color={"success"} onClick={openModal} className={"mb-2"}>Qo'shish</Button>
                    <Table>
                        <thead className={"bg-dark text-white"}>
                        <tr>
                            <th>No</th>
                            <th>Nomi</th>
                            <th>Ota Course Category</th>
                            <th>Izoh</th>
                            <th>Holati</th>
                            <th>Amal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            courseCategories ? courseCategories.map((item, i) =>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.courseCategory ? item.courseCategory.name : "---"}</td>
                                    <td>{item.description}</td>
                                    <td>
                                        <input type="checkbox" checked={item.active}/>
                                    </td>
                                    <td>
                                        <Button color={"warning"} onClick={() => openModal(item)}
                                                className={"mx-1"}>Tahrirlash</Button>
                                        <Button color={"danger"}
                                                onClick={() => openDeleteModal(item)}>O'chirish</Button>
                                    </td>
                                </tr>
                            ) : ""}
                        </tbody>
                    </Table>

                    <Modal isOpen={showModal} toggle={() => openModal("")} className={""}>
                        <AvForm className={""} onValidSubmit={saveItem}>
                            <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                                {currentObject ? "Tahrirlash" : "Qo'shish"}
                            </ModalHeader>
                            <ModalBody>
                                <div className={"w-100"}>
                                    <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                             label={"Nomi"} name={"name"} className={"form-control"}
                                             placeholer={"nomi"} required/>
                                    <AvField className={'form-control'} label={'Ota Course Category:'} type="select"
                                             name="courseCategoryId"
                                             defaultValue={currentObject && currentObject.courseCategoryId ? currentObject.courseCategoryId : "0"}>
                                        <option key={0} value={"0"}>Ota Course Category</option>
                                        {courseCategories ? courseCategories.map((item, i) =>
                                            <option key={i} value={item.id}>{item.name}</option>
                                        ) : ""}
                                    </AvField>
                                    <AvField type="text"
                                             defaultValue={currentObject ? currentObject.description : false}
                                             label={"Description"} name={"description"} placeholder={"izoh"}/>
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
                            <Button color="secondary" onClick={() => openDeleteModal("")}>Bekor qilish</Button>
                            <Button color="danger" onClick={() => deleteItem(currentObject)}>O'chirish</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </AdminLayout>
        );
    }
}

CourseCategory.propTypes = {};

export default connect(({
                            app: {loading, courseCategories, showModal, deleteModal},
                        }) => ({
        loading, courseCategories, showModal, deleteModal
    })
)(CourseCategory);
