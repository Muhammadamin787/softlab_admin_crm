import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, CustomInput, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {
     deleteTrialContactTypeAction,
    getTrialContactTypesAction,
    saveDurationTypeAction, saveTrialContactTypeAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';

class TrialContactType extends Component {
    componentDidMount() {
        this.props.dispatch(getTrialContactTypesAction())
    }

    state = {
        showModal: false,
        currentObject: ""
    }

    render() {
        const {currentObject} = this.state;
        const {dispatch, showModal, deleteModal, loading, trialContactType} = this.props;
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
            dispatch(deleteTrialContactTypeAction(item))
        }
        const saveItem = (e, v) => {
            if (currentObject) {
                v.id = currentObject.id
            }
            dispatch(saveTrialContactTypeAction(v))
        }
        return (
            <div className={"container "}>
                <h1>Tril Contact type</h1>
                <Button color={"success"} onClick={openModal} className={"mb-2"}>Qo'shish</Button>
                <Table>
                    <thead className={"bg-dark text-white"}>
                    <tr>
                        <th>№</th>
                        <th>Nomi</th>
                        <th>Izoh</th>
                        <th>Holati</th>
                        <th>Amal</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trialContactType ? trialContactType.map((item, i) =>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>
                                <input type="checkbox" checked={item.active}/>
                            </td>
                            <td>
                                <Button color={"warning"} onClick={() => openModal(item)}
                                        className={"mx-1"}>Tahrirlash</Button>
                                <Button color={"danger"} onClick={() => openDeleteModal(item)}>O'chirish</Button>
                            </td>
                        </tr>

                    ) : ''}
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
                                <AvField defaultValue={currentObject ? currentObject.description : ""} type={"text"}
                                         label={"Izoh"} name={"description"} className={"form-control"}
                                         placeholer={"izoh"}/>
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
        );
    }
}

TrialContactType.propTypes = {};

export default connect(({
                            app: {loading, trialContactType, showModal, deleteModal},
                        }) => ({
        loading, trialContactType, showModal, deleteModal
    })
)(TrialContactType);
