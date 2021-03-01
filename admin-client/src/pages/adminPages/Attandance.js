import React, {Component} from 'react';
import AdminLayout from "../../component/AdminLayout";

class Attandance extends Component {
    render() {
        return (
            <div>
                <AdminLayout pathname={this.props.location.pathname}>
                    OK
                </AdminLayout>
            </div>
        );
    }
}

Attandance.propTypes = {};

export default Attandance;