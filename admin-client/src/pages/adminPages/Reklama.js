import React, {Component} from 'react';
import {deleteReklamaAction, getReklamaAction, saveReklamaAction} from "../../redux/actions/AppActions";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {connect} from "react-redux";
import {AvForm, AvField} from "availity-reactstrap-validation"
import {toast} from "react-toastify";

class Reklama extends Component {
    componentDidMount() {
        this.props.dispatch(getReklamaAction())
    }

    state = {
        showModal: false,
        currentObject: "",
        selectReklama: [],
        selectParentReklama: "",
        parentReklamaDisable: false
    }

    render() {
        const {dispatch, showModal, deleteModal, reklamas, selectItems} = this.props
        const {currentObject} = this.state

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
        const saveNumber = (e, v) => {
            if (v.reklamaId === "0") {
                v.reklamaId = ""
            }
            if (v.reklamaId)
                v.reklamaId = parseInt(v.reklamaId)
            if (currentObject) {
                v.id = currentObject.id
                //Numberni tahrirlayotganda o`zini tanlamaslik uchun
                if (v.id && v.reklamaId && v.id === v.reklamaId) {
                    toast.error("Xatolik")
                    console.log(e)
                    console.log(v)
                } else {

                    dispatch(saveReklamaAction(v))
                }
            }
        }
        const parentReklama = (e, v) => {
            if (e && e.value) {
                this.setState({selectParentReklama: e.value})
            }
        }
        const deleteNumber = (item) => {
            dispatch(deleteReklamaAction(item.id))
        }
        return (
            <div className={"container"}>
                <Table>
                    <td>Reklama</td>
                    <Button color={"success"} onClick={openModal} className={"mb-2"}>Reklama qo`shish</Button>
                </Table>
                <Table>
                    <thead className={"bg-dark  text-white"}>
                    <tr>
                        <th>№</th>
                        <th>Reklama Nomi</th>
                        <th>Ota reklama</th>
                        <th>Izoh</th>
                        <th>Holat</th>
                        <th>E/D</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reklamas && reklamas.map((item, i) =>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.reklama ? item.reklama.name : "------------"}</td>
                            <td><input type="checkbox" checked={item.active}/></td>
                            <td><Button color={"warning"} onClick={() => openModal(item)}
                                        className={"mx-1"}>Tahrirlash</Button>
                                <Button color={"danger"} onClick={() => openDeleteModal(item)}>O`chirish</Button>
                            </td>
                        </tr>
                    )}
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
                                         label={"Nomi"} name={"name"} className={"form-control"}
                                         placeholder={"nomi"} required/>
                                <AvField defaultValue={currentObject ? currentObject.active : false}
                                         label={"Active"} type="checkbox" name={"active"}/>
                                <AvField className={"form-control"} label={'Reklama: '} name="reklamaId" type="select"
                                         defaultValue={currentObject && currentObject.reklamaId ? currentObject.reklamaId : "0"}>
                                    <option key={0} value={"0"}>Ota Reklamani tanlang</option>
                                    {reklamas ? reklamas.map((item, i) =>
                                        <option key={i} value={item.id}>{item.name}</option>
                                    ) : ''}
                                </AvField>
                                <AvField className={"form-control"} label={'Izoh Uchun'} name="description"
                                         type="text" placeholder={'reklama haqida ikki og`iz'}/>

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
                                 charCode="X">O`chirish</ModalHeader>
                    <ModalBody>O`chirmoqchimisiz buni</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => openDeleteModal("")}>Bekor qilish</Button>
                        <Button color="danger" onClick={() => deleteNumber(currentObject)}>O`chirish</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


Reklama.propTypes = {};

export default connect(({
                            app: {loading, reklamas, showModal, deleteModal},
                        }) => ({
        loading, reklamas, showModal, deleteModal
    })
)(Reklama);
