 import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {deleteTestCategoryAction, getTestCategoryAction, saveTestCategoryAction} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import {ModalHeader, Button, Modal, Table, ModalBody, ModalFooter, Row, Col} from "reactstrap";
import {AvField, AvForm} from "availity-reactstrap-validation"
import {CloseIcon, DeleteIcon, EditIcon, ShowIcon} from "../../component/Icons";
import Select from "react-select";
import {v4 as uuidv4} from 'uuid';

class Test extends Component {
    componentDidMount() {
        this.props.dispatch(getTestCategoryAction())
    }

    state = {
        showModal: false,
        currentObject: "",
        secondPage: true,
        countVariant: 1,
        inputs: [{id: require('uuid'), values: ''}]

    }

    render() {
        const {currentObject, secondPage} = this.state
        const {v4: uuidv4} = require('uuid');
        const {dispatch, showModal, deleteModal, arr, testCategory} = this.props
        const openModal = (number) => {
            this.setState({currentObject: number, secondPage: !secondPage})
            // dispatch({
            //     type: "updateState",
            //     payload: {
            //         showModal: !showModal
            //     }
            // })
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

        const removeRow = (item) => {
            if (arr && arr.length > 1) {
                let list = [...arr]
                console.log(list);
                console.log(item);
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id === item) {
                        list.splice(i, 1)
                    }
                }
                dispatch({
                    type: 'updateState',
                    payload: {
                        arr: list
                    }
                })
            }
        };

        const changeVariant = (item) => {
            let list = [...arr]
            let value = document.getElementById(item.id).value
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === item.id) {
                    let obj = {id: item.id, values: value};
                    list.splice(i, 1)
                    list.push(obj)
                }

            }
            dispatch({
                type: 'updateState',
                payload: {
                    arr: list
                }
            })
        }
        const addRow = (i) => {
            let obj = {id: uuidv4(), values: []};
            let list = [...arr]
            list.push(obj);
            dispatch({
                type: 'updateState',
                payload: {
                    arr: list
                }
            })
        };
        return (
            <div className={"container"}>
                <h1>Test</h1>
                {secondPage ?
                    <div className={""}>
                        <div className={"my-3"}>
                            <span onClick={openModal} className={"p-2 rounded bg-white"}><CloseIcon/></span>
                        </div>
                        <AvForm className={"p-5"}>
                            <div className={"w-100"}>
                                <Row>
                                    <Col>
                                        <AvField defaultValue={currentObject ? currentObject.name : ""} type={"text"}
                                                 label={"Nomi"} name={"name"} className={"form-control"}
                                                 placeholder={"name"} required/>
                                        <AvField className={'form-control'} label={"Yo'nalish bo'limi"} type="select"
                                                 name="testCategory"
                                                 defaultValue={currentObject && currentObject.courseCategory
                                                 && currentObject.courseCategory.id ? currentObject.courseCategory.id : "0"}>
                                            <option key={0} value={"0"}>Bo'limni tanlang</option>
                                            {/*{courseCategories ? courseCategories.map((item, i) =>*/}
                                            {/*    <option key={i} value={item.id}>{item.name}</option>*/}
                                            {/*) : ""}*/}

                                        </AvField>
                                        Davomiyligi
                                        <Row>
                                            <Col md={3}>
                                                <AvField defaultValue={currentObject ? currentObject.duration : ""}
                                                         type={"number"}
                                                         label={""} name={"duration"} className={"form-control"}
                                                         placeholer={"e.g, 4"} required/>
                                            </Col>
                                            <Col md={9}>
                                                <AvField className={'form-control'} label={""} type="select"
                                                         name="durationTypeId"
                                                         defaultValue={currentObject &&
                                                         currentObject.duration
                                                         && currentObject.durationType.id ? currentObject.durationType.id : "0"}>

                                                    <option key={0} value={"0"}>vaqtni tanlang</option>

                                                    {/*{durationTypes ? durationTypes.map((item, i) =>*/}
                                                    {/*    <option key={i} value={item.id}>{item.name}</option>*/}
                                                    {/*) : ""}*/}

                                                </AvField>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        Yo'nalishlar
                                        <Select
                                            defaultValue="Select MainService"
                                            isMulti
                                            name="mainServices"
                                            // options={mainServicesMultiSelect.filter(it => !it.online)}
                                            // onChange={getZipCode}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                        />
                                        <AvField type="textarea"
                                                 defaultValue={currentObject ? currentObject.description : false}
                                                 label={"Izoh"} name={"description"} placeholder={"izoh"}/>
                                        <AvField type="number"
                                                 defaultValue={currentObject ? currentObject.active : false}
                                                 label={"Test soni"} name={"random"}/>
                                        <AvField type="checkbox"
                                                 defaultValue={currentObject ? currentObject.active : false}
                                                 label={"Active"} name={"active"}/>
                                    </Col>
                                </Row>
                                <Row className={"w-100 p-3"}>
                                    <Col md={"12"} className={"border rounded bg-white"}>
                                        {/*variant savoli*/}
                                        <AvField type="text"
                                            // defaultValue={currentObject ? currentObject.active : false}
                                                 label={"1-savol"}
                                                 name={"savol"}/>

                                        {/*Variantlar*/}
                                        {arr.map((item, i) =>
                                            <>
                                                <Row key={i}>
                                                    <Col md={"1"}>
                                                        {i + 1})
                                                    </Col>
                                                    <Col md={"9"}>
                                                        <AvField type="text" id={item.id}
                                                                 onChange={() => changeVariant(item)}
                                                                 name={"savol"}/>
                                                    </Col>
                                                    <Col md={"2"}>
                                                        <Button color={"success"} onClick={() => addRow(i)}
                                                                className={"mx-1"}>+</Button>
                                                        <Button color={"danger"} onClick={() => removeRow(item.id)}
                                                                className={""}>-</Button>
                                                    </Col>
                                                </Row>
                                            </>
                                        )}

                                    </Col>
                                </Row>
                            </div>
                            <Button color="primary">Saqlash</Button>
                        </AvForm>
                    </div>
                    :
                    <div className={""}>
                        <Button color={"success"} onClick={openModal} className={"mb-2"}>Qo'shish</Button>
                        <Table className={""}>
                            <thead className={"bg-dark text-white"}>
                            <tr>
                                <th>№</th>
                                <th>Nomi</th>
                                <th>Test bo'limi</th>
                                <th>Yo'nalishlar</th>
                                <th>Davomiyligi</th>
                                <th>Variantlar</th>
                                <th>Holati</th>
                                <th colSpan="3">Amal</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Sinov test</td>
                                <td>Dasturlash</td>
                                <td>Boshlang'ich dasturlash, Frontend dasturlash, Backend dasturlash, Mobile
                                    dasturlash
                                </td>
                                <td>30 minut</td>
                                <td>40/78</td>
                                <td>
                                    <input type="checkbox"/>
                                </td>
                                <td>
                                    <Button
                                        //onClick={() => readMoreModal(item)}
                                        color={"info"}><ShowIcon/></Button>
                                </td>
                                <td>
                                    <Button
                                        // onClick={() => openModal(item)}
                                        color={"warning"}><EditIcon/></Button>
                                </td>
                                <td>
                                    <Button
                                        // onClick={() => openDeleteModal(item)}
                                        color={"danger"}><DeleteIcon/> </Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                }


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
                        <Button color="danger" onClick={() => deleteNumber(currentObject)}>Ha,Anniq
                            o`chirmoqchiman</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

Test.propTypes = {}

;

export default connect((
    {
        app: {
            loading,
            testCategory,
            showModal,
            deleteModal,
            arr,
        }
        ,
    }
    ) => (
        {
            loading, testCategory, showModal, deleteModal, arr
        }
    )
)(Test);