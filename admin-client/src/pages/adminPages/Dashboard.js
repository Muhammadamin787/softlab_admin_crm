import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AdminLayout from "../../component/AdminLayout";

class Dashboard extends Component {
    render() {
        return (
            <AdminLayout className="" pathname={this.props.location.pathname}>
                <div className={"flex-column container"}>
                    <h1>Salom admin dashboard</h1>
                </div>
            </AdminLayout>
        );
    }
}

Dashboard.propTypes = {};

export default Dashboard;
