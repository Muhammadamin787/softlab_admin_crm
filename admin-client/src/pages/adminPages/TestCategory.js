import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {deleteTestCategoryAction, getTestCategoryAction, saveTestCategoryAction} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {ModalHeader, Button, Modal, Table, ModalBody, ModalFooter} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation"

class TestCategory extends Component {
    componentDidMount() {
        this.props.dispatch(getTestCategoryAction())
    }

    state = {
        showModal: false,
        currentObject: ""
    }

    render() {
        const {currentObject} = this.state
        const {dispatch, showModal, deleteModal, testCategory} = this.props
        const openModal = (number) => {
            this.setState({currentObject: number})
            dispatch({
                type: "updateState",
                payload: {
                    showModal: !showModal
                }
            })
        }
        const openDeleteModal = (number) => {
            this.setState({currentObject: number})
            dispatch({
                type: "updateState",
                payload: {
                    deleteModal: !deleteModal
                }
            })
        }
        const saveNumber = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
            }
            dispatch(saveTestCategoryAction(v))
        }
        const deleteNumber = (number) => {
            dispatch(deleteTestCategoryAction(number.id))
        }
        return (
            <div className={"container"}>
                <Table>
                    <td>Test Turlari</td>
                    <th><Button color={"success"} onClick={openModal} className={"mb-2"}> Qo`shish</Button></th>
                </Table>
                <Table>
                    <thead className={"bg-dark text-white"}>
                    <tr>
                        <th>№</th>
                        <th>Test Nomi</th>
                        <th>Izoh</th>
                        <th>Holati</th>
                        <th>Amal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {testCategory ? testCategory.map((number, a) =>
                        <tr key={a}>
                            <td>{a + 1}</td>
                            <td>{number.name}</td>
                            <td>
                                <p>{number.description}</p>
                            </td>
                            <td>
                                <input type="checkbox" checked={number.active}/>
                            </td>
                            <td>
                                <Button color={"warning"} onClick={() => openModal(number)}
                                        className={"mx-1"}>Tahrirlash</Button>
                                <Button color={"danger"} onClick={() => openDeleteModal(number)}>
                                    O`chirish
                                </Button>
                            </td>
                        </tr>
                    ) : ''}
                    </tbody>
                </Table>

                <Modal isOpen={showModal} toggle={openModal} className={""}>
                    <AvForm className={""} onValidSubmit={saveNumber}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            {currentObject && currentObject.id ? "Tahrirlash" : "Qo`shish"}
                        </ModalHeader>
                        <ModalBody>
                            <div className={"w-100"}>
                                <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                         label={"Name"} name={"name"} className={"form-control"}
                                         placeholder={"name"} required/>
                                <AvField type="text" defaultValue={currentObject ? currentObject.description : false}
                                         label={"Description"} name={"description"} placeholder={"izoh"}/>
                                <AvField type="checkbox" defaultValue={currentObject ? currentObject.active : false}
                                         label={"Active"} name={"active"}/>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={openModal}>Bekor qilish</Button>
                            <Button color="primary">Qo`shish</Button>
                        </ModalFooter>
                    </AvForm>
                </Modal>
                <Modal isOpen={deleteModal} toggle={() => openDeleteModal("")} className={""}>
                    <ModalHeader isOpen={deleteModal} toggle={() => openDeleteModal("")}
                                 charCode="X">Delete</ModalHeader>
                    <ModalBody>
                        Buni o`shirishga ishonchiz komilmi
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => openDeleteModal("")}>Yo`q</Button>
                        <Button color="danger" onClick={() => deleteNumber(currentObject)}>Ha,Anniq o`chirmoqchiman</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

TestCategory.propTypes = {};

export default connect(({
                            app: {loading, testCategory, showModal, deleteModal},
                        }) => ({
        loading, testCategory, showModal, deleteModal
    })
)(TestCategory);