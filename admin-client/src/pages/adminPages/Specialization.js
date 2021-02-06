import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    deleteDurationTypeAction,
    getSpecListAction,
    saveDurationTypeAction,
    saveSpecAction,
    deleteSpecAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Col, Row, Table, Container, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";

class Specialization extends Component {

    componentDidMount() {
        this.props.dispatch(getSpecListAction())
    }

    state = {
        showModal: false,
        showDeleteModal : false,
        currentObject: ''
    }

    render() {

        const {currentObject} = this.state;
        const {dispatch, showModal, deleteModal, loading, spec} = this.props;

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
            this.setState({currentObject: item, showDeleteModal: !this.state.showDeleteModal})
        }
        const deleteItem = () => {
            dispatch(deleteSpecAction(currentObject))
            this.setState({showDeleteModal: !this.state.showDeleteModal})
        }
        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
            }
            dispatch(saveSpecAction(v))
        }

        return (
            <div className={"container"}>
                <h1>Specialization</h1>
                <Button color={"success"} onClick={openModal} className={"mb-2"}>Qo'shish</Button>
                <Table>
                    <thead className={"bg-dark text-white"}>
                    <tr>
                        <th>№</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Active</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {spec ? spec.map((item, i) =>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td><input type="checkbox" id={item.name} checked={item.active}/></td>
                            <td>
                                <Button color={"warning"} onClick={() => openModal(item)}
                                        className={"mx-1"}>Tahrirlash</Button>
                                <Button color={"danger"} onClick={() => openDeleteModal(item.id)}>O'chirish</Button>
                            </td>
                        </tr>
                    ) : ''}
                    </tbody>
                </Table>

                <Modal isOpen={showModal} toggle={openModal} className={""}>
                    <AvForm className={""} onValidSubmit={saveItem}>
                        <ModalHeader isOpen={showModal} toggle={openModal} charCode="X">
                            {currentObject ? "Tahrirlash" : "Qo'shish"}
                        </ModalHeader>
                        <ModalBody>
                            <div className={"w-100"}>
                                <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                         label={"Nomi"} name={"name"} className={"form-control"}
                                         placeholer={"nomi"} required/>

                                <AvField defaultValue={currentObject ? currentObject.desription : ""} type={"text"}
                                         label={"Izoh"} name={"description"} className={"form-control"}
                                         placeholer={"nomi"} required/>

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

                <Modal isOpen={this.state.showDeleteModal} toggle={() => openDeleteModal("")} className={""}>
                    <ModalHeader isOpen={deleteModal} toggle={() => openDeleteModal("")}
                                 charCode="X">O'chirish</ModalHeader>
                    <ModalBody>
                        Rostdan ham ushbu elementni o'chirishni istaysizmi?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => openDeleteModal("")}>Bekor qilish</Button>
                        <Button color="danger" onClick={deleteItem}>O'chirish</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect(
    ({
         app: {showModal, spec, deleteModal},
         auth: {isAdmin, isSuperAdmin, currentUser}
     }) => ({
        showModal,
        isAdmin,
        isSuperAdmin,
        currentUser,
        spec
    })
)(Specialization);