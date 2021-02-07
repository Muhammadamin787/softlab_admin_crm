import React, {Component} from 'react';
import {ModalHeader, Modal, Button, Col, ModalBody, Row, Table} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {
    deleteTeacherAction,
    getCourseCategoriesAction,
    getRegionsAction,
    getSpecListAction,
    getTeacherAction,
    saveTeacherAction,
    uploadFileAction
} from "../../redux/actions/AppActions";
import {connect} from "react-redux";
import './adminPages.scss';
import {CloseIcon, DeleteIcon, EditIcon, ShowIcon} from "../../component/Icons";
import Select from "react-select";
import AdminLayout from "../../component/AdminLayout";

class Teacher extends Component {
    componentDidMount() {
        this.props.dispatch(getSpecListAction())
        this.props.dispatch(getRegionsAction())
        this.props.dispatch(getCourseCategoriesAction())
        this.props.dispatch(getTeacherAction())
        console.clear()
    }

    state = {
        showModal: false,
        currentObject: "",
        secondPage: true,
        specs: '',
    }


    render() {
        const {currentObject} = this.state;
        const {
            dispatch,
            attachmentId,
            secondPage,
            showModal,
            deleteModal,
            loading,
            courseCategories,
            teachers,
            selectItems,
            spec,
            selectItemsFromSpec,
            regions
        } = this.props;
        const openModal = (item) => {
            this.setState({currentObject: item})
            dispatch({
                type: "updateState",
                payload: {
                    secondPage: !secondPage
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
                console.log(v);
            }
            let teacherDto;
            teacherDto = {userDto: ""}
            teacherDto.userDto = {
                fullName: v.fullName,
                gender: v.gender,
                phoneNumber: v.phoneNumber,
                password: v.password,
                photoId: attachmentId,
                contactDto: {
                    regionId: v.regionId,
                    address: v.address,
                    isTransport: v.isTransport,
                    passportDto: {
                        passportSerial: v.passportSerial,
                        passportNumber: v.passportNumber,
                        birthDate: v.birthDate,
                        photoId: attachmentId,

                    }
                }
            }
            teacherDto.specializationId = this.state.specs

            dispatch(saveTeacherAction(teacherDto))
        }
        const uploadImg = (e) => {
            this.props.dispatch(uploadFileAction(e.target.files[0]))
        }

        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h1>O'qituvchilar</h1>
                    {secondPage ?
                        <div className={""}>
                            <div className={"my-3"}>
                                <span onClick={openModal} className={"p-2 rounded bg-white"}><CloseIcon/></span>
                            </div>
                            <AvForm onValidSubmit={saveItem} className={"p-5 bg-white"}>
                                <section>
                                    <h3 className={"my-2"}>Asosiy ma'lumotlar</h3>
                                    <div className={"w-100 border p-2 rounded"}>
                                        <Row>
                                            <Col>
                                                <AvField defaultValue={currentObject ? currentObject.fullName : ""}
                                                         type={"text"}
                                                         label={"FISH"} name={"fullName"} className={"form-control"}
                                                         placeholder={"name"} required/>
                                                <AvField className={'form-control'} label={"Telefon raqam"}
                                                         type="number"
                                                         name="phoneNumber"
                                                         defaultValue={currentObject && currentObject.phoneNumber
                                                             ? currentObject.phoneNumber : ""}/>
                                            </Col>
                                            <Col className="mt-3">
                                                <span>Mutahasisligi</span>
                                                <Select
                                                    defaultValue={currentObject && currentObject.spec ? currentObject.spec.id : "0"}
                                                    isMulti
                                                    placeholder=" Mutaxasisligini tanlang"
                                                    name="specializationId"
                                                    isSearchable={true}
                                                    options={selectItemsFromSpec}
                                                    onChange={multiChange}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    label="Specialization"
                                                />
                                                <AvField
                                                    defaultValue={currentObject && currentObject.gender ? currentObject.gender : "0"}
                                                    type={"select"}
                                                    label={"Jinsni tanlang"} name={"gender"} className={"form-control"}>
                                                    <option value="0">Jins tanlang</option>
                                                    <option value="MALE">Erkak</option>
                                                    <option value="FEMALE">Ayol</option>
                                                </AvField>
                                            </Col>
                                        </Row>
                                    </div>
                                </section>
                                <section>
                                    <h3 className={"my-2"}>Bog'lanish ma'lumotlari</h3>
                                    <div className={"w-100 border p-2 rounded"}>
                                        <Row>
                                            <Col>
                                                <AvField className={'form-control'} label={'Hudud:'} type="select"
                                                         name="regionId"
                                                         defaultValue={currentObject && currentObject.regionId ? currentObject.regionId : "0"}>
                                                    <option disabled key={0} value={"0"}>hududni tanlang</option>
                                                    {regions ? regions.map((item, i) =>
                                                        <option key={i} value={item.id}>{item.name}</option>
                                                    ) : ""}
                                                </AvField>

                                                <AvField type="checkbox"
                                                         defaultValue={currentObject ? currentObject.active : false}
                                                         label={"Transport kelasizmi?"} name={"isTransport"}/>
                                            </Col>
                                            <Col>
                                                <AvField className={'form-control'} label={"Uy manzil"}
                                                         type="textarea"
                                                         name="address"
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </section>
                                <section>
                                    <h3 className={"my-2"}>Passport ma'lumotlari</h3>
                                    <div className={"w-100 border p-2 rounded"}>
                                        <Row>
                                            <Col>
                                                <AvField
                                                    defaultValue={currentObject ? currentObject.birthDate : "0"}
                                                    type={"date"}
                                                    label={"Tug'ilgan vaqti"} name={"birthDate"}
                                                    className={"form-control"}/>

                                                Passport seria
                                                <Row>
                                                    <Col md={3}>
                                                        <AvField
                                                            defaultValue={currentObject ? currentObject.duration : ""}
                                                            type={"text"}
                                                            label={""} name={"passportSerial"}
                                                            className={"form-control"}
                                                            placeholer={"e.g, AB"} required/>
                                                    </Col>
                                                    <Col md={9}>
                                                        <AvField
                                                            defaultValue={currentObject ? currentObject.duration : ""}
                                                            type={"number"}
                                                            label={""} name={"passportNumber"}
                                                            className={"form-control"}
                                                            placeholer={""} required/>
                                                    </Col>
                                                </Row>
                                                <AvField type="textarea"
                                                         defaultValue={currentObject ? currentObject.description : false}
                                                         label={"Rasmiy manzil"} name={"officialAddress"}
                                                         placeholder={"izoh"}/>
                                            </Col>
                                            <Col>
                                                {/*<AvField name={"attachmentId"} type={"file"}/>*/}
                                                {/*<div className={"photoUpload"}>*/}

                                                {/*</div>*/}
                                                <AvField type={"file"} name={"attachmentId"} onChange={uploadImg}/>
                                                <div className={"photoUpload"}>
                                                    {attachmentId ?
                                                        <img className={"img-thumbnail"}
                                                             src={`http://localhost/api/attachment/` + attachmentId}/>
                                                        :
                                                        ""}
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </section>
                                <Button className={"my-3"} color="primary">Saqlash</Button>
                            </AvForm>
                        </div>
                        :
                        <>
                            <Button color={"success"} onClick={openModal} className={"mb-2"}>Qo'shish</Button>

                            <Table>
                                <thead className={"bg-dark text-white"}>
                                <tr>
                                    <th>No</th>
                                    <th>FISH</th>
                                    <th>Telefon raqami</th>
                                    <th>Mutaxassiligi</th>
                                    <th>mutahasislik</th>
                                    <th>Batafsil</th>
                                    <th>Tahrirlash</th>
                                    <th colSpan="3">Amal</th>
                                </tr>
                                </thead>
                                <tbody>
                                {teachers ? teachers.map((item, i) =>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.userDto.fullName}</td>
                                        <td>{item.userDto.phoneNumber}</td>
                                        {console.log(item)}
                                        <td>{item.specialization ? item.specialization.map(item2 => item2.name + ', ') : ''}</td>
                                        <td>
                                            <Button
                                                // onClick={() => readMoreModal(item)}
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
                                ) : ''}
                                </tbody>
                            </Table>
                        </>
                    }
                </div>
            </AdminLayout>
        );
    }
}

Teacher.propTypes = {};

export default connect((
    {
        app: {
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
            teacherDto
        },
    }) => ({
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
        teacherDto
    })
)(Teacher);
