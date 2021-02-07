import React, {Component} from 'react';
import {
    getRoomListAction,
    saveRoomAction,
    deleteRoomAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation";
import AdminLayout from "../../component/AdminLayout";

class Room extends Component {

    componentDidMount() {
        this.props.dispatch(getRoomListAction())
    }

    state = {
        showModal: false,
        showDeleteModal: false,
        currentObject: ''
    }

    render() {

        const {currentObject} = this.state;
        const {dispatch, showModal, deleteModal, rooms} = this.props;

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
            dispatch(deleteRoomAction(currentObject))
            this.setState({showDeleteModal: !this.state.showDeleteModal})
        }
        const saveItem = (e, v) => {
            if (currentObject && currentObject.id) {
                v.id = currentObject.id
            }
            dispatch(saveRoomAction(v))
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h1>Room</h1>
                    <Button color={"success"} onClick={openModal} className={"mb-2"}>Qo'shish</Button>
                    <Table className={"table-style"}>
                        <thead className={""}>
                        <tr className={"text-center"}>
                            <th>№</th>
                            <th>Name</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rooms ? rooms.map((item, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.name}</td>
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
            </AdminLayout>
        );
    }
}

Room.propTypes = {}
export default connect(({
                            app: {loading, rooms, showModal, deleteModal, selectItems},
                        }) => ({
        loading, rooms, showModal, deleteModal, selectItems
    })
)(Room);