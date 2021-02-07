import React, {Component} from 'react';
import {ModalHeader, Modal, Button, Col, ModalBody, Row, Table} from "reactstrap";
import {AvForm, AvField} from "availity-reactstrap-validation";
import {
    deleteTeacherAction,
    getCourseCategoriesAction,
    getRegionsAction,
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
        this.props.dispatch(getRegionsAction())
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
