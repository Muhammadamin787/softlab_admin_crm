import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import * as authActions from "../../redux/actions/AuthActions";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Label} from "reactstrap";
import {connect} from "react-redux";
import {TOKEN} from "../../utils/constants";

class Login extends Component {
    state = {
        variable: false
    }

    handleSignIn = async (e, v) => {
        if(v.password === ""){
            v.password = "default"
        }
        this.props.dispatch(authActions.login({v, history: this.props.history}))
    };

    render() {
        const showHide = () => {
            this.setState({variable: !this.state.variable})

            let pwd = document.getElementById("pwd")

            this.state.variable ? pwd.type = "password" : pwd.type = "text"
        }

        return (
            <div className="container-fluid loginPage d-flex">
                <div className={"m-auto registration "}>
                    <h1>Kirish</h1>
                    <div className={"firstInputs mt-2"}>
                        <AvForm className={"mx-auto"} onValidSubmit={this.handleSignIn}>
                            <div className={"form-group"}>
                                <Label for="usr" className="ml-0">Telefon raqam</Label>
                                <AvField type="text" name="phoneNumber" className="form-control"
                                         placeholder="+998 90 1234567" id="usr" required/>
                            </div>
                            <div className={"form-group"}>
                                <Label for="pwd" className="mr-sm-2">Parol</Label>
                                <AvField type="password" className="form-control thirdInput" name="password"
                                         placeholder="Parol" id={"pwd"}/>
                            </div>
                            <button className={"btn py-2 btn-block btn-primary"}>Kirish</button>
                        </AvForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    ({
         app: {showModal},
         auth: {isAdmin, isSuperAdmin,isFinancier, currentUser}
     }) => ({
        showModal,
        isAdmin,
        isSuperAdmin,
        isFinancier,
        currentUser
    })
)(Login);
