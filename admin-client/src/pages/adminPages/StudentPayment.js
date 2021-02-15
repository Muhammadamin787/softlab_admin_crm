import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {
    getStudentPaymentAction
} from "../../redux/actions/AppActions";
import {getStudentPaymentApi} from "../../api/AppApi";
import {Link} from "react-router-dom";
import {Table} from "reactstrap";

class StudentPayment extends Component {
    componentDidMount() {
        console.clear()
        this.props.dispatch(getStudentPaymentAction(this.props.match.params.id))

        console.log(this.props.match.params.id)
    }
    render() {
        const {studentPayment} = this.props
        console.log(studentPayment)
        return (
            <div>
                <Link to={"/admin/students"}>Ortga</Link>
                <Table>
                    <thead>
                    <tr>
                        <td>#</td>
                        <td>Student</td>
                        <td>summa</td>
                        <td>pay type</td>
                        <td>comment</td>
                        <td>vaqti</td>
                    </tr>
                    </thead>
                    <tbody>
                    {studentPayment ? studentPayment.map((item,i)=>
                        <tr key={i+1}>
                            <td>{i+1}</td>
                            <td>{item && item.student && item.student.user ? item.student.user.fullName : ''}</td>
                            <td>{item.sum}</td>
                            <td>{item.payType ? item.payType.name : ''}</td>
                            <td>{item.comment}</td>
                            <td>{item.payDate}</td>
                        </tr>
                    ) : 'Malumot topilmadi'}
                    </tbody>
                </Table>
            </div>
        );
    }
}

StudentPayment.propTypes = {};


export default connect(({
                            app: {
                                studentPayment
                            },
                        }) => ({
    studentPayment
    })
)(StudentPayment);